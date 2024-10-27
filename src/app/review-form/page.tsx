"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

interface StarComponent {
  id: number;
  filled: boolean;
  half: boolean;
}

export default function Page() {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const totalStars = 5;
  const [starsComponents, setStarComponents] = useState<StarComponent[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function fillStars(id: number, isHalf: boolean) {
    let updatedStars = starsComponents.map((star, index) => {
      if (index < id) {
        return { ...star, filled: true, half: false };
      } else if (index === id) {
        return { ...star, filled: !isHalf, half: isHalf };
      } else {
        return { ...star, filled: false, half: false };
      }
    });
    setStarComponents(updatedStars);
    setStars(id + (isHalf ? 0.5 : 1));
  }

  async function postReview(ev: any) {
    ev.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/reviews/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content, stars }),
      });

      if (response.ok) {
        setMessage("Review submitted successfully!");
        setName("");
        setContent("");
        setStars(0);
      } else {
        setMessage("Failed to submit review");
      }
    } catch (err) {
      setMessage("Error submitting review");
    }
    setLoading(false);
  }

  useEffect(() => {
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push({ id: i, filled: false, half: false });
    }
    setStarComponents(stars);
  }, []);

  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col w-96 gap-8">
        <h1 className="text-xl">Skriv en recensioner!</h1>
        <TextField
          id="standard-basic"
          label="Ditt namn"
          variant="standard"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <TextField
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          label="skriv recension"
          variant="outlined"
          multiline
          rows={8}
          fullWidth
        />

        <div className="flex gap-2">
          {starsComponents.map((star, i) => (
            <div key={i} className="relative w-10 h-10 cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                onClick={() => fillStars(star.id, false)}
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
                    star.filled
                      ? "#ffc107"
                      : star.half
                      ? `url(#half-fill-${i})`
                      : "#ccc"
                  }
                  d="M12 .587l3.668 7.568L24 9.267l-6 5.832 1.417 8.256L12 18.897l-7.417 4.458L6 15.099 0 9.267l8.332-1.112z"
                />
              </svg>
              <div
                className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
                onClick={() => fillStars(star.id, true)}
              ></div>
            </div>
          ))}
        </div>
        <LoadingButton
          onClick={(ev) => postReview(ev)}
          className="w-full"
          variant="contained"
          loading={loading}
          disabled={!name || !content || !stars}
        >
          Post review
        </LoadingButton>

        <div>{message}</div>
      </div>
    </div>
  );
}
