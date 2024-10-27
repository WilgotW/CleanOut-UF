import { getLatest } from "@/services/ReviewService";
import HomeContent from "./components/HomeContent";

export default async function Page() {
  const reviews = await getLatest(6);
  console.log("Fetched reviews:", reviews);
  return <HomeContent reviews={reviews} />;
}

export const revalidate = 60;
