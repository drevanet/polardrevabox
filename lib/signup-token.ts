import { createHmac, timingSafeEqual } from "crypto";

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not configured.");
  }

  return secret;
}

export function createSignupToken(userId: string) {
  const payload = Buffer.from(
    JSON.stringify({
      userId,
      expiresAt: Date.now() + 5 * 60 * 1000,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySignupToken(token: string): string | null {
  try {
    const [payload, signature] = token.split(".");

    if (!payload || !signature) return null;

    const expectedSignature = createHmac("sha256", getSecret())
      .update(payload)
      .digest();

    const receivedSignature = Buffer.from(signature, "base64url");

    if (
      receivedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      typeof decoded.userId !== "string" ||
      typeof decoded.expiresAt !== "number" ||
      decoded.expiresAt < Date.now()
    ) {
      return null;
    }

    return decoded.userId;
  } catch {
    return null;
  }
}