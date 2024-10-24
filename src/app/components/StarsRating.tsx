import React from "react";

export default function StarsRating({ stars }: { stars: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative w-10 h-5">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id={`half-fill-${i}`}
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
              >
                <stop offset="50%" stopColor="#ffc107" />
                <stop offset="50%" stopColor="#ccc" />
              </linearGradient>
            </defs>
            <path
              fill={
                stars - i === 0.5
                  ? `url(#half-fill-${i})`
                  : i < stars
                  ? "#ffc107"
                  : "#ccc"
              }
              d="M12 .587l3.668 7.568L24 9.267l-6 5.832 1.417 8.256L12 18.897l-7.417 4.458L6 15.099 0 9.267l8.332-1.112z"
            />
          </svg>
          <div className="absolute left-0 top-0 w-1/2 h-full"></div>
        </div>
      ))}
    </>
  );
}
