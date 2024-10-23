import { createReview } from "@/services/ReviewService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, content, stars } = req.body;

    if (!name || !content) {
      return res.status(400).json({ message: "Name and content is required" });
    }
    try {
      const newReview = await createReview(name, content, stars);
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ message: "Servor error" });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
