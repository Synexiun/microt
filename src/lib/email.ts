import type { Appointment } from "@/types";

// Send a booking notification email to the studio owner.
// Fails silently if RESEND_API_KEY is not configured.
export async function sendBookingNotification(
  appointment: Appointment
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const studioEmail = process.env.STUDIO_EMAIL;
  if (!apiKey || !studioEmail) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const dateFormatted = new Date(appointment.date).toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    await resend.emails.send({
      from: "Velvet Brow Studio <noreply@velvetbrowstudio.com>",
      to: studioEmail,
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
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrowstudio.com"}/admin/appointments"
                 style="display: inline-block; background: #C9A96E; color: #0A0A0A; padding: 12px 28px;
                        text-decoration: none; font-weight: bold; letter-spacing: 1px; font-size: 13px;
                        text-transform: uppercase;">
                View in Admin →
              </a>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; font-size: 11px; color: #999; text-align: center;">
            Velvet Brow Studio · Costa Mesa, CA
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
// Fails silently if RESEND_API_KEY is not configured.
export async function sendClientConfirmation(
  appointment: Appointment
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const dateFormatted = new Date(appointment.date).toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    );

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://velvetbrowstudio.com";

    await resend.emails.send({
      from: "Velvet Brow Studio <noreply@velvetbrowstudio.com>",
      to: appointment.clientEmail,
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
              Thank you for booking with Velvet Brow Studio. We'll be in touch shortly to confirm your appointment.
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">${appointment.serviceName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${dateFormatted}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Time</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${appointment.time}</td></tr>
              <tr><td style="padding: 10px 0; color: #666;">Location</td>
                  <td style="padding: 10px 0;">Costa Mesa, CA</td></tr>
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
            Velvet Brow Studio · Costa Mesa, CA
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Non-fatal — log but don't block the booking
    console.error("Client confirmation email failed:", err);
  }
}
