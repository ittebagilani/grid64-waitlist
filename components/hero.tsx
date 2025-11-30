"use client";

import { useState } from "react";
import Navbar from "./navbar";

const HomeLayout = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleMove = (e: any) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    setOffset({ x, y });
  };

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-screen h-screen bg-black p-4 overflow-hidden">
      <div
        onMouseMove={handleMove}
        className="
          w-full h-full rounded-4xl relative overflow-hidden flex flex-col
          bg-white 
          bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      >
        <Navbar />

        <div
          className="flex flex-col items-center justify-center grow text-center px-4 -mt-30"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.05s linear",
          }}
        >
          <h1 className="text-[14vw] md:text-[120px] font-serif leading-tight mt-6">
            not another <br /> habit tracker.
            <br />
            this is <span className="text-[#c68891]">grid64.</span>
          </h1>

          <div className="mt-6 w-full max-w-sm text-left">
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full bg-transparent 
                border-b border-gray-400 
                focus:outline-none focus:border-black
                text-md py-3
                placeholder:text-gray-700
              "
            />

            <button
              onClick={handleSubmit}
              className="
                mt-6 w-full 
                border border-gray-900 
                py-3 text-base font-light 
                bg-black text-white 
                transition-all duration-200
                hover:bg-white hover:text-black
              "
            >
              join waitlist (40% off lifetime)
            </button>

            {status === "success" && (
              <p className="text-green-600 mt-2">you&apos;re on the waitlist!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-2">something went wrong. try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
