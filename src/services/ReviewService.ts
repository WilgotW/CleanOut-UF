import prisma from "../config/prisma";

export async function getLatest(amount: number) {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: amount,
  });
  return reviews;
}

export async function createReview(
  name: string,
  content: string,
  stars: number,
  ipAddress: string
) {
  const newReview = await prisma.review.create({
    data: {
      name,
      content,
      stars,
      ipAddress,
    },
  });
  return newReview;
}

export async function findReviewByIp(ipAddress: string) {
  return prisma.review.findFirst({
    where: { ipAddress },
  });
}

export async function deleteReview(id: number) {
  const review = await prisma.review.delete({
    where: {
      id: id,
    },
  });
  return review;
}

export async function editReview(
  id: number,
  name: string,
  content: string,
  stars: number
) {
  const updatedReview = await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      name,
      content,
      stars,
    },
  });
  return updatedReview;
}
