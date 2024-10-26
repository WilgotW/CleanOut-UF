import { getLatest } from "@/services/ReviewService";
import HomeContent from "./components/HomeContent";

export default async function Page() {
  const reviews = await getLatest(4);
  return <HomeContent reviews={reviews} />;
}
