import React from "react";
import { useState } from "react";

export default function NextSpeaker({ members, introduced }) {
  const [next, setNext] = useState(null);

  const generateNextSpeaker = () => {
    const leftMembers = members.filter((m) => !introduced.includes(m.name));

    if (leftMembers.length === 0) {
      setNext("No more members left");
      return;
    }

    const randomIndex = Math.floor(Math.random() * leftMembers.length);
    setNext(leftMembers[randomIndex].name);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      {next && (
        <div className="border-2 border-indigo-500 rounded w-full sm:w-1/2 mx-auto my-10">
          <p className="text-xl font-bold mt-5 ">👏🎀 {next} 🎀👏</p>
          <p className="mt-5 font-bold">2 lies, 1 truth</p>
          <p>👇</p>
          <div className="p-3 flex flex-col gap-3">
            <button
              onClick={handleSelect}
              name="option1"
              value="option1"
              className="cursor-pointer border-2 border-cyan-500 rounded p-1"
            >
              option 1
            </button>
            <button
              onClick={handleSelect}
              name="option2"
              value="option2"
              className="cursor-pointer border-2 border-cyan-500 rounded p-1"
            >
              option 2
            </button>
            <button
              onClick={handleSelect}
              name="option3"
              value="option3"
              className="cursor-pointer border-2 border-cyan-500 rounded p-1"
            >
              option 3
            </button>
          </div>
        </div>
      )}

      <button
        className="bg-teal-500 text-white p-3 rounded mb-10"
        onClick={generateNextSpeaker}
      >
        Who's next?
      </button>
    </div>
  );
}
