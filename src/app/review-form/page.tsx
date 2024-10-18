"use client";

import { useEffect, useState } from "react";

interface StarComponent {
  id: number;
  filled: boolean;
}

export default function page() {
  const [name, setName] = useState<string>();
  const [content, setContent] = useState<string>();
  const [stars, setStars] = useState<number>();

  const halfStars = 10;
  const [starsComponents, setStarComponents] = useState<StarComponent[]>([]);

  useEffect(() => {
    let stars = [];
    for (let i = 0; i < halfStars; i++) {
      const star: StarComponent = { id: i, filled: false };
      stars.push(star);
    }
    setStarComponents([...stars]);
  }, []);

  function fillStars(id: number) {
    let updatedStars: StarComponent[] = [...starsComponents];
    for (let i = 0; i < starsComponents.length; i++) {
      if (i <= id) {
        updatedStars[i].filled = true;
      } else {
        updatedStars[i].filled = false;
      }
    }
    setStarComponents([...updatedStars]);
  }

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
      <div className="flex gap-5">
        {starsComponents.map((halfStar) => (
          <div
            onClick={() => fillStars(halfStar.id)}
            className={`w-10 h-10 ${
              halfStar.filled ? "bg-amber-300" : "bg-slate-400"
            } `}
          ></div>
        ))}
      </div>
    </div>
  );
}
