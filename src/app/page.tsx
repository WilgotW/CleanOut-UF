import { getLatest } from "@/services/ReviewService";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StarsRating from "./components/StarsRating";
export default async function Home() {
  const reviews = await getLatest(5);
  return (
    <div className="">
      <div className="w-full h-96 bg-blue-300 flex items-center justify-center">
        <div className="flex flex-col text-center">
          <h1 className="text-2xl font-bold">Namn</h1>
          <h2>XXX BILTVÄTT</h2>
        </div>
      </div>
      <div className="p-4 text-center">
        {/* <h1 className="text-lg sm:text-2xl lg:text-4xl">Responsive Heading</h1>
        <p className="text-base sm:text-lg lg:text-xl">
          This text adjusts size based on screen width.
        </p> */}
        <div className="flex flex-col gap-5">
          <h1 className="text-lg text-left">Recensioner</h1>
          <hr />
          {reviews.map((review, i) => (
            <div
              key={i}
              className="w-full flex flex-col rounded-md shadow-lg p-5"
            >
              <h1 className="text-left">
                <b>{review.name}</b>
              </h1>
              <div className="flex w-20 mb-2">
                <StarsRating stars={review.stars} />
              </div>
              <hr />
              <span className="w-full break-words text-left mt-2">
                {review.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
