import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { getDate, getMonth, getYear } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    email,
    phoneNumber,
    selectedPlan,
    selectedDate,
    selectedTime,
    selectedCarType,
    joinedExtras,
    totalPrice,
  } = req.body;

  const date = new Date(selectedDate);
  const time = new Date(selectedTime);

  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `Ny bokning från ${name}!`,
        text: `${name} har bokat [${selectedPlan}].`,
        html: `<p><strong>${name}</strong> har bokat en biltvätt av typ: <strong>${selectedPlan}</strong> 
          <p>Datum: ${getDate(selectedDate)}-${getMonth(date) + 1}-${getYear(
          selectedDate
        )}</p>
          <p>Tid: ${String(time.getHours()).padStart(2, "0")}:${String(
          time.getMinutes()
        ).padStart(2, "0")}</p></p>
          <p>Bil typ: ${selectedCarType} </p> 
          <p>extras: ${joinedExtras} </p>
          <p>totalt pris: <strong>${totalPrice}</strong>kr</p>
          <p><strong>Kontaktinformation:</strong></p>
          <p>mail: ${email}</p>
          <p>telefonnummer: ${phoneNumber}</p>`,
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
