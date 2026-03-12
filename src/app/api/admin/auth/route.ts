import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validators";
import {
  verifyPassword,
  createSession,
  clearSession,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRY,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = adminLoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { password } = result.data;

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = createSession();
    const maxAgeSeconds = SESSION_EXPIRY / 1000;

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      path: "/",
      maxAge: maxAgeSeconds,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Error in admin auth:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      clearSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Error in admin logout:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
