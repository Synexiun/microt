import type { Appointment } from "@/types";
import type { Transporter } from "nodemailer";

// Mail goes out over Gmail SMTP from a dedicated send-only account
// (GMAIL_USER, authenticated with a Google App Password — not the account
// password). Gmail was chosen over an API provider because those can only send
// from a domain you control the DNS for, and the studio has no verified domain
// yet; authenticating as the mailbox sidesteps that entirely.
//
// Note that Gmail rewrites the From header to the authenticated account no
// matter what we pass, so the sender is always GMAIL_USER.
const SENDER_NAME = "Velvet Brow by Tannaz";

// The studio inbox. Mail to both spellings was sent while it was unclear which
// one was real; the studio has since confirmed this is the one it reads.
const STUDIO_RECIPIENTS = ["Velvetbrowbytannaz@gmail.com"];

// STUDIO_EMAIL adds a recipient rather than replacing the defaults, so a stale
// value in the environment can't cut the studio out of its own notifications.
function studioRecipients(): string[] {
  const override = process.env.STUDIO_EMAIL?.trim();
  return override
    ? Array.from(new Set([...STUDIO_RECIPIENTS, override]))
    : STUDIO_RECIPIENTS;
}

// Replies to a customer-facing mail must reach a mailbox someone actually
// reads. The sending account is send-only, so point replies at the studio.
const REPLY_TO = STUDIO_RECIPIENTS[0];

// Resolved once per warm lambda. Returns null when SMTP credentials are absent,
// which is what keeps email a no-op in local/preview environments.
let cachedTransport: Transporter | null = null;

async function getTransport(): Promise<Transporter | null> {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  if (cachedTransport) return cachedTransport;

  const nodemailer = await import("nodemailer");
  cachedTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return cachedTransport;
}

function senderAddress(): string {
  return `${SENDER_NAME} <${process.env.GMAIL_USER?.trim()}>`;
}

// Send a booking notification email to the studio owner.
// Fails silently if the Gmail SMTP credentials are not configured.
export async function sendBookingNotification(
  appointment: Appointment
): Promise<void> {
  const transport = await getTransport();
  if (!transport) return;

  try {
    const dateFormatted = new Date(appointment.date).toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    await transport.sendMail({
      from: senderAddress(),
      to: studioRecipients(),
      replyTo: appointment.clientEmail,
      subject: `New Booking: ${appointment.clientName} — ${appointment.serviceName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0A0A0A; padding: 24px; border-bottom: 2px solid #C9A96E;">
            <h1 style="color: #C9A96E; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">
              New Booking
            </h1>
          </div>
          <div style="padding: 32px; background: #fafafa;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Client</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${appointment.clientName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.serviceName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${dateFormatted}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Time</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.time}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.clientPhone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.clientEmail}</td></tr>
              ${appointment.notes ? `
              <tr><td style="padding: 10px 0; color: #666; vertical-align: top;">Notes</td>
                  <td style="padding: 10px 0;">${appointment.notes}</td></tr>` : ""}
            </table>
            <div style="margin-top: 28px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrow.com"}/admin/appointments"
                 style="display: inline-block; background: #C9A96E; color: #0A0A0A; padding: 12px 28px;
                        text-decoration: none; font-weight: bold; letter-spacing: 1px; font-size: 13px;
                        text-transform: uppercase;">
                View in Admin →
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 11px; color: #999; text-align: center;">
            Velvet Brow by Tannaz &middot; Costa Mesa &middot; Santa Monica &middot; Upland
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Non-fatal — log but don't block the booking
    console.error("Email notification failed:", err);
  }
}

// Send a booking confirmation email to the client.
// Fails silently if the Gmail SMTP credentials are not configured.
export async function sendClientConfirmation(
  appointment: Appointment
): Promise<void> {
  const transport = await getTransport();
  if (!transport) return;

  try {
    const dateFormatted = new Date(appointment.date).toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrow.com";

    await transport.sendMail({
      from: senderAddress(),
      to: appointment.clientEmail,
      replyTo: REPLY_TO,
      subject: `Booking Request Received — ${appointment.serviceName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0A0A0A; padding: 24px; border-bottom: 2px solid #C9A96E;">
            <h1 style="color: #C9A96E; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">
              Booking Request Received
            </h1>
          </div>
          <div style="padding: 32px; background: #fafafa;">
            <p style="margin: 0 0 24px; font-size: 15px; color: #333;">
              Thank you for booking with Velvet Brow by Tannaz. We'll be in touch shortly to confirm your appointment.
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${appointment.serviceName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${dateFormatted}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Time</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.time}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Location</td>
                  <td style="padding: 10px 0;">Costa Mesa &middot; Santa Monica &middot; Upland</td></tr>
            </table>
            <div style="margin-top: 28px; padding: 20px; background: #f5f0e8; border-left: 3px solid #C9A96E;">
              <p style="margin: 0; font-size: 14px; color: #555;">
                Please complete your consent form before your appointment:
              </p>
              <div style="margin-top: 12px; text-align: center;">
                <a href="${siteUrl}/consent"
                   style="display: inline-block; background: #C9A96E; color: #0A0A0A; padding: 12px 28px;
                          text-decoration: none; font-weight: bold; letter-spacing: 1px; font-size: 13px;
                          text-transform: uppercase;">
                  Complete Consent Form →
                </a>
              </div>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 11px; color: #999; text-align: center;">
            Velvet Brow by Tannaz &middot; Costa Mesa &middot; Santa Monica &middot; Upland
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Non-fatal — log but don't block the booking
    console.error("Client confirmation email failed:", err);
  }
}
