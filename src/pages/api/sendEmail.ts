// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, phoneNumber, plan, date, time } = req.body;

  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL_USER,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `Ny bokning från ${name}!`,
        text: `${name} har bokat [${plan}]. Datum: [${date}], Tid: [${time}]. Kontakt information: telefon: ${phoneNumber}, mail: ${email}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
      });

      console.log("Message sent: %s", info.messageId);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
