import { getLatest } from "@/services/ReviewService";
import Image from "next/image";
import StarsRating from "./components/StarsRating";
import { FaCar } from "react-icons/fa";

export default async function Home() {
  const reviews = await getLatest(5);

  return (
    <div className="">
      <div className="w-full md:h-96 h-72 relative border-8 border-white rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute md:h-[70%] h-[55%] bg-black w-full top-0 animate-slide-in-left"></div>

        <div className="rounded-xl overflow-hidden z-10 animate-slide-in-right">
          <Image
            src="/images/test.png"
            alt="Description"
            width={600}
            height={300}
          />
        </div>
      </div>

      <div className="p-4 animate-fade-in">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl text-gray-700">Cleanout</h1>
          <div>
            <span className="font-bold text-green-600">Öppet: </span>
            <span>12:00 - 20:00</span>
          </div>
        </div>
        <div className="flex w-32 gap-1">
          <StarsRating stars={4.5} />
          <div className="text-gray-400">(220)</div>
        </div>
      </div>

      <div className="md:p-10 p-3 animate-fade-in">
        <div className="bg-[#161A1D] rounded-xl md:p-10 p-5 h-96 text-white">
          <h1 className="font-bold">Om oss</h1>
          <span className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            esse nihil obcaecati magnam totam eligendi doloremque voluptatibus,
            minus quos! Dolorum quisquam voluptatem, ex quia cum illum impedit
            corporis. Officiis, cum!
          </span>
          <hr className="mt-3 mb-3" />
          <h1 className="font-bold pb-4">Biltvättar</h1>
          <div className="flex gap-2">
            <div className="border hover:bg-[#E36A18] hover:border-none transition-colors  cursor-pointer w-36 border-white rounded-md p-2 h-16 flex flex-col justify-center items-center">
              <div className="w-5 h-5">
                <FaCar className="w-full h-full" />
              </div>
              <span className="text-sm text-center">Utsidtvätt</span>
            </div>
            <div className="border hover:bg-[#E36A18] hover:border-none transition-colors cursor-pointer w-36 border-white rounded-md p-2 h-16 flex flex-col justify-center items-center">
              <div className="w-5 h-5">
                <FaCar className="w-full h-full" />
              </div>
              <span className="text-sm text-center text-wrap">Invändig</span>
            </div>
            <div className="border hover:bg-[#E36A18] hover:border-none transition-colors cursor-pointer w-36 border-white rounded-md p-2 h-16 flex flex-col justify-center items-center">
              <div className="w-5 h-5">
                <FaCar className="w-full h-full" />
              </div>
              <span className="text-sm text-center">Rekond</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
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
