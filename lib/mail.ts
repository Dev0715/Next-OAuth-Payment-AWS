import { sendEmail } from "@/data/email";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = "kre8tive@2advanced.com";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};
