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
        <div className="w-full md:h-96 h-72 relative border-8 border-white rounded-lg pt-5 flex overflow-hidden justify-center md:justify-start">
          <div className="absolute xl:h-[70%] h-[55%] bg-black w-full top-0 animate-slide-in-left"></div>

          <div className="overflow-hidden z-10 animate-slide-in-right w-96 md:w-fit lg:pl-52">
            <Image
              src="/images/homepage-picture.png"
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
          <div className="pl-4 pr-4 md:pl-8 md:pr-8 animate-fade-in md:hidden">
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
                  Vårt företag hjälper kunden att lösa problemet med att
                  bibehålla bilens inre i ett optimalt och nyskicksliknande
                  tillstånd, något som kan vara svårt att uppnå med vanliga
                  rengöringsmetoder eller hemmaprodukter. Bilar utsätts dagligen
                  för slitage, smuts och bakterier som inte bara påverkar
                  utseendet, utan även trivseln och hälsan i fordonet. Genom vår
                  specialiserade inredningstvätt tar vi bort djupt sittande
                  smuts, fläckar och odörer, vilket ger bilen ett fräscht och
                  inbjudande inre – en viktig faktor både för kundens komfort
                  och för att skapa ett gott intryck på passagerare eller
                  kunder.
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
                <div className="flex flex-col w-full lg:grid lg:grid-cols-2 lg:pt-5 gap-5">
                  {reviews.map((review, i) => (
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
