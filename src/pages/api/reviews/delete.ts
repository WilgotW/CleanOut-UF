import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { deleteReview } from "@/services/ReviewService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) res.status(400).json({ message: "reviews id required" });

    try {
      const deletedReview = deleteReview(id);
      res.status(201).json(deletedReview);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
}
