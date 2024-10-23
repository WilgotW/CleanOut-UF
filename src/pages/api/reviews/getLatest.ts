import { getLatest } from "@/services/ReviewService";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { amount } = req.query;

    const reviewAmount = amount ? parseInt(amount as string, 10) : 5;

    try {
      const latestReviews = await getLatest(reviewAmount);
      res.status(200).json(latestReviews);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
