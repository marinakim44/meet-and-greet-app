import Logo from "./components/Logo";
import { db } from "./firebase";
import { push, child, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import NextSpeaker from "./components/NextSpeaker";

function App() {
  const [joinedMembers, setJoinedMembers] = useState([]);
  const [introducedMembers, setIntroducedMembers] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, "users");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setJoinedMembers(Object.values(data));
    });
    return () => {};
  }, []);

  const [user, setUser] = useState("");
  const [providedName, setProvidedName] = useState(false);

  async function saveUser(name) {
    const id = push(child(ref(db), "users")).key;

    await set(ref(db, "users/" + id), { name: name })
      .then(() => console.log("created"))
      .catch((err) => console.log(err));

    setUser("");
    setProvidedName(true);
  }

  const handleChangeName = (e) => {
    setUser(e.target.value);
    console.log(e.target.value);
  };

  const changeList = (e) => {
    if (e.target.checked) {
      setIntroducedMembers([...introducedMembers, e.target.name]);
    } else {
      const index = introducedMembers.indexOf(e.target.name);

      setIntroducedMembers(introducedMembers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-indigo-100 w-full sm:w-3/4 md:w-3/4 xl:w-2/4 m-auto h-screen text-center py-10">
      <Logo />
      <div className="m-10">
        <h1 className="text-lg font-bold">Meet & Greet</h1>
        <p className="text-slate-500">{new Date().toDateString()}</p>
        <p className="text-slate-500 mb-10">
          Member joined: {joinedMembers?.length}
        </p>

        {providedName ? (
          <div>
            <NextSpeaker
              members={joinedMembers}
              introduced={introducedMembers}
            />
            <div className="grid grid-rows-4 sm:grid-cols-3 grid-cols-1">
              {joinedMembers?.map((m, i) => {
                return (
                  <div
                    key={i}
                    className="m-1 bg-indigo-300 rounded flex flex-row justify-start pl-5 gap-3"
                  >
                    <input
                      type="checkbox"
                      name={m.name}
                      onChange={changeList}
                    />
                    <p className="text-white">{m.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full sm:w-1/2 mx-auto my-20 p-10">
            <input
              className="p-3 rounded"
              placeholder="Name"
              value={user}
              onChange={handleChangeName}
            />
            <button
              onClick={() => saveUser(user)}
              className="bg-indigo-500 text-white rounded p-3"
            >
              JOIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
