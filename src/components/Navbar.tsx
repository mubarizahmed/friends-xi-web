import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

// import "@/styles/navbar.module.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const goToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex h-15 w-full items-center justify-between bg-black p-2 px-8 shadow-md">
      <Link className="overflow-none flex h-full items-center" href="/">
        <Image
          src={"/mark.png"}
          alt="Friends XI logo"
          width={110}
          height={30}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Link>
      <div className="text-fxiblue font-header flex basis-0 items-center gap-8 font-bold">
        <Link className="" href="/">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            Home
          </div>
        </Link>
        <Link className="" href="/projects">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            Fixtures
          </div>
        </Link>
        <Link className="" href="/projects">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            Stats
          </div>
        </Link>
      </div>
      <button
        className="bg-fxisafetyorange font-header hover:bg-opacity-90 rounded-none p-2 font-bold text-black"
        onClick={goToContact}
      >
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
