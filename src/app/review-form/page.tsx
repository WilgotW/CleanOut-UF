"use client";

import { useEffect, useState } from "react";

interface StarComponent {
  id: number;
  filled: boolean;
}

export default function page() {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [stars, setStars] = useState<number>(0);

  const halfStars = 10;
  const [starsComponents, setStarComponents] = useState<StarComponent[]>([]);

  const [message, setMessage] = useState<string>("");

  const [reviews, setReviews] = useState([]);

  function fillStars(id: number) {
    let updatedStars: StarComponent[] = [...starsComponents];
    for (let i = 0; i < starsComponents.length; i++) {
      if (id === 0 || i > id) {
        updatedStars[i].filled = false;
      } else {
        updatedStars[i].filled = true;
      }
    }
    setStarComponents([...updatedStars]);
    setStars((id + 1) / 2);
  }

  // async function fetchReviews() {
  //   const response = await fetch("/api/reviews");
  //   const data = await response.json();
  //   setReviews(data);
  // }

  async function postReview(ev: any) {
    ev.preventDefault();
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
  }
  useEffect(() => {
    let stars = [];
    for (let i = 0; i < halfStars; i++) {
      const star: StarComponent = { id: i, filled: false };
      stars.push(star);
    }
    setStarComponents([...stars]);

    // fetchReviews();
  }, []);
  return (
    <div>
      <h1>Create an review!</h1>
      <input
        type="text"
        placeholder="enter your name..."
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        type="text"
        className="text-black"
        placeholder="write review"
        value={content}
        onChange={(ev) => setContent(ev.target.value)}
      />
      <div>{stars}</div>
      <div className="flex cursor-pointer">
        {starsComponents.map((halfStar) => (
          <div
            key={halfStar.id}
            onClick={() => fillStars(halfStar.id)}
            className={`w-10 h-10 cursor-pointer hover:brightness-125 ${
              halfStar.id % 2 === 0 && halfStar.id !== 0 && "ml-5"
            } ${halfStar.filled ? "bg-amber-300" : "bg-slate-400"}`}
          ></div>
        ))}
      </div>
      <button onClick={(ev) => postReview(ev)}>Post review</button>
      <div>{message}</div>

      <div>
        {reviews.map((review) => (
          <div>
            <h3>{(review as any).name}</h3>
            <span>{(review as any).content}</span>
            <span>stars: {(review as any).stars}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
