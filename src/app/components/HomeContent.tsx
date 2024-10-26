"use client";
import { getLatest } from "@/services/ReviewService";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { useState } from "react";
import StarsRating from "./StarsRating";
import { TbSteeringWheel } from "react-icons/tb";
import { SiCcleaner } from "react-icons/si";
import Link from "next/link";

interface Carwash {
  title: string;
  description: string;
  selected: boolean;
}
interface IProps {
  reviews: {
    name: string;
    stars: number;
    content: string;
  }[];
}

export default function HomeContent({ reviews }: IProps) {
  const [carwashes, setCarwashes] = useState<Carwash[]>([
    {
      title: "Utsidetvätt",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad officiis impedit repellendus, rem odit accusantium vitae veritatis omnis doloremque quas neque earum voluptas optio autem saepe voluptatibus, labore commodi.",
      selected: true,
    },
    {
      title: "Invändig",
      description:
        "          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad officiis impedit repellendus, rem odit accusantium vitae veritatis omnis doloremque quas neque earum voluptas optio autem saepe voluptatibus, labore commodi.",
      selected: false,
    },
    {
      title: "Rekond",
      description:
        "          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad officiis impedit repellendus, rem odit accusantium vitae veritatis omnis doloremque quas neque earum voluptas optio autem saepe voluptatibus, labore commodi.",
      selected: false,
    },
  ]);

  function selectCarwash(title: string) {
    let carwash = [...carwashes];
    carwash.forEach((item) =>
      item.title === title ? (item.selected = true) : (item.selected = false)
    );
    setCarwashes(carwash);
  }
  return (
    <div>
      <div>
        <div className="w-full sm:h-96 h-72 relative border-8 border-white rounded-lg pt-5 flex overflow-hidden justify-center md:justify-start">
          <div className="absolute sm:h-[70%] h-[55%] bg-black w-full top-0 animate-slide-in-left"></div>

          <div className="overflow-hidden z-10 animate-slide-in-right w-96 md:w-fit lg:pl-52">
            <Image
              src="/images/test.png"
              alt="Description"
              width={600}
              height={300}
            />
          </div>
          <div className="pl-12 pr-2 animate-fade-in hidden md:block lg:pl-52 lg:pt-16">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-4xl xl:text-6xl text-white">Cleanout</h1>
            </div>
            <div className="flex w-32 gap-1">
              <StarsRating stars={4.5} />
              <div className="text-gray-400">(220)</div>
            </div>
            <div>
              <span className="font-bold text-green-600">Öppet: </span>
              <span className="text-white">12:00 - 20:00</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="pl-2 pr-2 md:pl-8 md:pr-8 animate-fade-in md:hidden">
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
          <div className="lg:flex">
            <div className="sm:p-10 p-3 animate-fade-in max-w-[800px]">
              <div className="bg-[#161A1D] rounded-xl sm:p-10 p-5 h-fit text-white">
                <h1 className="font-bold">Om oss</h1>
                <span className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam esse nihil obcaecati magnam totam eligendi doloremque
                  voluptatibus, minus quos! Dolorum quisquam voluptatem, ex quia
                  cum illum impedit corporis. Officiis, cum!
                </span>
                <hr className="mt-3 mb-3" />
                <h1 className="font-bold pb-4">Biltvättar</h1>
                <div className="flex gap-2 pb-4">
                  {carwashes.map((carwash, index) => (
                    <div
                      key={index}
                      onClick={() => selectCarwash(carwash.title)}
                      className={`${
                        carwash.selected && "bg-[#E36A18] border-none"
                      } border transition-colors cursor-pointer w-36 border-white rounded-md p-2 h-16 flex flex-col justify-center items-center`}
                    >
                      <div className="w-5 h-5">
                        {index === 0 ? (
                          <FaCar className="w-full h-full" />
                        ) : index === 1 ? (
                          <TbSteeringWheel className="w-full h-full" />
                        ) : (
                          <SiCcleaner className="w-full h-full" />
                        )}
                      </div>
                      <span className="text-sm text-center">
                        {carwash.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pb-2">
                  {carwashes.map((carwash) => (
                    <div key={carwash.title}>
                      {carwash.selected && (
                        <span className="text-gray-400">
                          {carwash.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <Link href="/booking" className="text-white">
                  Boka tvätt
                </Link>
              </div>
            </div>
            <div className="p-4 text-center overflow-y-scroll animate-fade-in">
              <div className="flex flex-col gap-5">
                <div className="lg:hidden">
                  <h1 className="text-lg text-left">Recensioner</h1>
                  <hr />
                </div>
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:pt-5 gap-5">
                  {reviews.map((review, i) => (
                    <div
                      key={i}
                      className="w-full flex flex-col rounded-md shadow-lg p-5 max-w-96 max-h-64 overflow-y-scroll"
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
          </div>
        </div>
      </div>
    </div>
  );
}
