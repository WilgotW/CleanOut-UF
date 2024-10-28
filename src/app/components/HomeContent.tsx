"use client";
import { useEffect, useState } from "react";
import { getLatest } from "@/services/ReviewService";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { RiCarWashingFill } from "react-icons/ri";
import Link from "next/link";
import StarsRating from "./StarsRating";

interface Carwash {
  title: string;
  description: string;
  selected: boolean;
}

interface IProps {
  reviews: {
    name: string;
    title: string;
    stars: number;
    content: string;
  }[];
}

export default function HomeContent({ reviews }: IProps) {
  const [carwashes, setCarwashes] = useState<Carwash[]>([
    {
      title: "Utsidetvätt",
      description:
        "Ge bilens utsida en snabb uppfräschning med vår utsidatvätt. Vi tar bort smuts, damm och vägsalt för att återställa bilens glans.",
      selected: true,
    },
    {
      title: "Invändig",
      description:
        "Fräscha upp insidan av din bil med en grundlig inredningstvätt. Vi rengör säten, golvmattor och ytor för att ge bilen en ren och fräsch känsla.",
      selected: false,
    },
    {
      title: "Rekond",
      description:
        "Vår rekondtjänst ger din bil en fullständig behandling både in- och utvändigt. Vi rengör, polerar och skyddar alla ytor för ett hållbart och lyxigt resultat.",
      selected: false,
    },
  ]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");

  function selectCarwash(title: string) {
    setCarwashes((prev) =>
      prev.map((carwash) => ({
        ...carwash,
        selected: carwash.title === title,
      }))
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationClass("fade-out");
      setTimeout(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setAnimationClass("fade-in");
      }, 1000);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [reviews.length]);

  const currentReview = reviews[currentReviewIndex];

  return (
    <div>
      <div className="w-full md:h-96 h-72 relative border-8 border-white rounded-lg pt-5 flex overflow-hidden justify-center md:justify-start">
        <div className="absolute xl:h-[70%] h-[55%] bg-black w-full top-0 animate-slide-in-left"></div>
        <div className="overflow-hidden z-10 animate-slide-in-right w-96 md:w-fit xl:pl-52 md:pl-8 absolute">
          <Image
            src="/images/homepage-picture.png"
            alt="Description"
            width={600}
            height={300}
          />
        </div>
        <div className="absolute xl:right-52 lg:right-24 right-12 pl-12 pr-2 animate-fade-in hidden md:block lg:pl-52 xl:pt-16 md:pt-8">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl md:text-6xl text-white">CleanOut</h1>
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
        <div className="pl-4 pr-4 md:pl-8 md:pr-8 animate-fade-in md:hidden">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl text-gray-700">CleanOut</h1>
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
          <div className="sm:p-10 p-3 animate-fade-in min-h-[550px] max-w-[1000px] 2xl:min-w[1250px]">
            <div className="bg-[#161A1D] rounded-xl min-h-[550px]  sm:p-10 p-5 h-fit text-white">
              <h1 className="font-bold xl:text-xl">Om oss</h1>
              <span className="text-gray-400 xl:text-lg">
                Vårt företag hjälper kunden att lösa problemet med att bibehålla
                bilens inre i ett optimalt och nyskicksliknande tillstånd, något
                som kan vara svårt att uppnå med vanliga rengöringsmetoder eller
                hemmaprodukter. Bilar utsätts dagligen för slitage, smuts och
                bakterier som inte bara påverkar utseendet, utan även trivseln
                och hälsan i fordonet. Genom vår specialiserade inredningstvätt
                tar vi bort djupt sittande smuts, fläckar och odörer, vilket ger
                bilen ett fräscht och inbjudande inre – en viktig faktor både
                för kundens komfort och för att skapa ett gott intryck på
                passagerare eller kunder.
              </span>
              <hr className="mt-3 mb-3" />
              <h1 className="font-bold pb-4 xl:text-xl">Biltvättar</h1>
              <div className="flex gap-2 pb-4">
                {carwashes.map((carwash, index) => (
                  <div
                    key={index}
                    onClick={() => selectCarwash(carwash.title)}
                    className={`${
                      carwash.selected && "bg-[#E36A18] border-none"
                    } border transition-colors cursor-pointer w-36 xl:w-44 border-white rounded-md p-2 h-16 xl:h-20 flex flex-col justify-center items-center`}
                  >
                    <div className="w-5 xl:w-7 h-5 xl:h-7">
                      {index === 0 ? (
                        <FaCar className="w-full h-full" />
                      ) : index === 1 ? (
                        <TbSteeringWheel className="w-full h-full" />
                      ) : (
                        <RiCarWashingFill className="w-full h-full" />
                      )}
                    </div>
                    <span className="text-sm text-center xl:text-md">
                      {carwash.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pb-2">
                {carwashes.map((carwash) => (
                  <div key={carwash.title}>
                    {carwash.selected && (
                      <span className="text-gray-400 xl:text-lg">
                        {carwash.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Link href="/booking" className="text-white xl:text-lg">
                Boka tvätt
              </Link>
            </div>
          </div>

          <div className="p-4 text-center overflow-y-scroll animate-fade-in">
            <div className="flex flex-col gap-5 h-full">
              <div className="lg:hidden">
                <h1 className="text-lg text-left">Recensioner</h1>
                <hr />
              </div>
              <div className="flex flex-col w-full gap-5 xl:hidden pt-5 pr-5">
                {reviews.map((review, i) => (
                  <>
                    {i > 2 ? (
                      <div
                        key={i}
                        className="w-full lg:hidden flex flex-col rounded-md shadow-lg p-5 max-h-64 2xl:w-96 overflow-y-scroll"
                      >
                        <h1 className="text-left lg:text-xl">
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
                    ) : (
                      <div
                        key={i}
                        className="w-full flex flex-col rounded-md shadow-lg p-5 max-h-64 2xl:w-96 overflow-y-scroll"
                      >
                        <h1 className="text-left lg:text-xl">
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
                    )}
                  </>
                ))}
              </div>

              <div className="hidden xl:flex h-full pt-5 pb-5 gap-5 pl-10 pr-12">
                <div
                  className={`${animationClass} w-[500px] 2xl:w-[800px] h-[550px] text-wrap flex flex-col rounded-md shadow-lg p-12 overflow-y-auto`}
                >
                  <h1 className="text-left lg:text-xl">
                    <b>{currentReview.name}</b>
                  </h1>
                  <div className="flex w-28 mt-2">
                    <StarsRating stars={currentReview.stars} />
                  </div>
                  <h1 className="text-left lg:text-xl mt-1">
                    {currentReview.title}
                  </h1>
                  <hr />
                  <span className="w-full break-words text-left text-lg mt-2">
                    {currentReview.content}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-44 bg-[#161A1D] z-20 mt-32 text-white flex items-end p-6">
        Kontakta oss: 070...
      </div>
    </div>
  );
}
