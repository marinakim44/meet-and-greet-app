import React from "react";

export default function Logo() {
  return (
    <div>
      <img
        alt="catbytes logo"
        src={require("../assets/images/logo.png")}
        className="w-40 m-auto sm:ml-10 mb-10"
      />
    </div>
  );
}
