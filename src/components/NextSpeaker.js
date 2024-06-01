import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import { onValue, push, child, ref, set } from "firebase/database";

export default function NextSpeaker({ members, introduced, user }) {
  const [next, setNext] = useState(null);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  useEffect(() => {
    const dbRef = ref(db, "votes");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setVotes(() => {
        return {
          option1: Object.values(data).filter((d) => d.option === "option1")
            .length,
          option2: Object.values(data).filter((d) => d.option === "option2")
            .length,
          option3: Object.values(data).filter((d) => d.option === "option3")
            .length,
        };
      });
    });
    return () => {};
  }, []);

  const generateNextSpeaker = () => {
    setVoted(false);
    const leftMembers = members.filter((m) => !introduced.includes(m.name));

    if (leftMembers.length === 0) {
      setNext("No more members left");
      return;
    }

    const randomIndex = Math.floor(Math.random() * leftMembers.length);

    // const id = push(child(ref(db), "next")).key;

    // await set(ref(db, "next/" + id), { name: leftMembers[randomIndex].name })
    //   .then(() => console.log("created"))
    //   .catch((err) => console.log(err));

    setVoted(true);

    setNext(leftMembers[randomIndex].name);
  };

  const vote = async (e) => {
    console.log("voting", e.target.value);
    const id = push(child(ref(db), "votes")).key;

    await set(ref(db, "votes/" + id), { option: e.target.value })
      .then(() => console.log("created"))
      .catch((err) => console.log(err));

    setVoted(true);
  };

  return (
    <div>
      <div className="border-2 border-indigo-500 rounded w-full sm:w-1/2 mx-auto my-10">
        <p className="text-xl font-bold my-5">👏🎀 {next} 🎀👏</p>
        {/* <p className="mt-5 font-bold">2 lies, 1 truth</p>
        <p>👇</p>
        <div className="p-3 flex flex-col gap-3">
          <button
            onClick={voted ? () => console.log("already votes") : vote}
            name="option1"
            value="option1"
            className="cursor-pointer border-2 border-cyan-500 rounded p-1"
          >
            {voted ? `Votes: ${votes.option1}` : "option 1"}
          </button>
          <button
            onClick={voted ? () => console.log("already votes") : vote}
            name="option2"
            value="option2"
            className="cursor-pointer border-2 border-cyan-500 rounded p-1"
          >
            {voted ? `Votes: ${votes.option2}` : "option 2"}
          </button>
          <button
            onClick={voted ? () => console.log("already votes") : vote}
            name="option3"
            value="option3"
            className="cursor-pointer border-2 border-cyan-500 rounded p-1"
          >
            {voted ? `Votes: ${votes.option3}` : "option 3"}
          </button>
        </div> */}
      </div>

      <button
        className="bg-teal-500 text-white p-3 rounded mb-10"
        onClick={generateNextSpeaker}
      >
        Who's next?
      </button>
    </div>
  );
}
