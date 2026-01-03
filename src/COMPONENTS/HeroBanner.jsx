
import React, { useEffect, useState } from "react";
import { BsSoundwave } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";

const HeroBanner = () => {
 const [greeting, setGreeting] = useState("");

  const updateGreeting = () => {
    const hour = new Intl.DateTimeFormat("en-NG", {
      hour: "numeric",
      hour12: false,
      timeZone: "Africa/Lagos",
    }).format(new Date());

    const greet =
      hour < 12
        ? "Good Morning"
        : hour < 17
        ? "Good Afternoon"
        : "Good Evening";

    setGreeting(greet);
  };

  useEffect(() => {
    updateGreeting(); // Run immediately on load

    const interval = setInterval(() => {
      updateGreeting(); // Re-run every minute
    }, 60000);

    return () => clearInterval(interval); // Cleanup
  }, []);
 
  const userName = "Alex"; // <-- replace with dynamic name later if needed

  return (
    <div className="w-[90%] h-[150px] space-y-3 md:flex justify-between items-center md:h-[180px] md:w-[100%] mt-12 md:mt-3 p-3 bg-gradient-to-r from-red-500/10 to-red-700/90 rounded-2xl ">
      <div className="ml-0 md:ml-10">
        <h1 className="text-xl md:text-3xl font-bold text-white ">
          {greeting}, {userName.toUpperCase()}
        </h1>
        <p className="hidden md:block text-white/40">Ready for your daily mix?</p>
      </div>

      <div className="bg-black w-[200px] md:w-[250px] h-[60px] md:h-[80px] rounded-2xl mr-10 flex items-center gap-4">
        <div className="w-[40%] bg-gradient-to-r from-white to-red-900 h-[80%] ml-2 rounded-lg p-2">
          <BsSoundwave className="mx-auto text-xl" />
          <p className="text-xs text-center font-bold">Daily Mix</p>
        </div>
        <div className="bg-white w-[40%] h-[30%] rounded-2xl flex justify-center items-center">
          <button className="text-md flex items-center gap-2"><FaPlay /> Play</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
