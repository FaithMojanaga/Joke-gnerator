"use client";
import { useState, useEffect } from "react";

export default function JokeGenerator() {
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("random");

  async function fetchJoke(selectedCategory: string = "random") {
    let url = "https://official-joke-api.appspot.com/random_joke";

    if (selectedCategory === "programming") {
      url = "https://official-joke-api.appspot.com/jokes/programming/random";
    } else if (selectedCategory === "general") {
      url = "https://official-joke-api.appspot.com/jokes/general/random";
    }

    const res = await fetch(url);
    const data = await res.json();
    const jokeData = Array.isArray(data) ? data[0] : data;
    setJoke(`${jokeData.setup} ... ${jokeData.punchline}`);
  }

  // Inject Tailwind since im not able to use it(sad)
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@3.3.3/dist/tailwind.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-orange-500 animate-pulse" style={{ fontFamily: 'Comic Neue, cursive' }}>
         Random Joke Generator
      </h1>

      <div className="mb-4">
        <select
          className="border border-gray-300 rounded px-3 py-2 mr-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="random">Random</option>
          <option value="programming">Programming</option>
          <option value="general">General</option>
        </select>

        <button
          onClick={() => fetchJoke(category)}
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all shadow-lg"
        >
          Tell Me a Joke
        </button>
      </div>

      {joke && (
        <p className="mt-6 text-xl text-center max-w-md animate-bounce">
          {joke} 😭😭😭😭😂
        </p>
      )}
    </div>
  );
}
