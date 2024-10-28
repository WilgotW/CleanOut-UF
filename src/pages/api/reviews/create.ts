import { createReview, findReviewByIp } from "@/services/ReviewService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, title, content, stars } = req.body;
    const ipAddress = (req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;

    if (!name || !content) {
      return res.status(400).json({ message: "Name and content are required" });
    }

    try {
      const existingReview = await findReviewByIp(ipAddress);
      // if (existingReview) {
      //   return res
      //     .status(403)
      //     .json({ message: "Du har redan skrivit en recension" });
      // }

      const newReview = await createReview(
        name,
        title,
        content,
        stars,
        ipAddress
      );
      res.status(201).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
