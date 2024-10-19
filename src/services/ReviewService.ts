import prisma from "../config/prisma";

export async function createReview(
  name: string,
  content: string,
  stars: number
) {
  const newReview = await prisma.review.create({
    data: {
      name,
      content,
      stars,
    },
  });
  return newReview;
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
