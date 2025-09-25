import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const goToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="font-family-mono sticky top-0 z-50 flex h-15 w-full items-center justify-between bg-black p-2 px-8 font-bold shadow-md">
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
      <div className="text-fxiblue font-header hidden basis-0 items-center gap-8 font-bold md:flex">
        <Link className="" href="/">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            HOME
          </div>
        </Link>
        <Link className="" href="/news">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            NEWS
          </div>
        </Link>
        <Link className="" href="/squad">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            SQUAD
          </div>
        </Link>
        <Link className="" href="/fixtures">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            FIXTURES
          </div>
        </Link>
        <Link className="" href="/stats">
          <div className="text-fximoonstone hover:text-fxisafetyorange flex w-18 justify-center p-1">
            STATS
          </div>
        </Link>
      </div>
      <button
        className="bg-fxisafetyorange font-header hover:bg-opacity-90 hidden rounded-none p-2 font-bold text-black md:block"
        onClick={goToContact}
      >
        CONTACT
      </button>
      <div className="relative ml-4 block md:hidden">
        {toggleMenu ? (
          <RiCloseLine
            color="white"
            size={27}
            onClick={() => setToggleMenu(false)}
            className="cursor-pointer transition-all duration-1000 ease-in-out"
          />
        ) : (
          <RiMenu3Line
            color="white"
            size={27}
            onClick={() => setToggleMenu(true)}
            className="cursor-pointer transition-all duration-1000 ease-in-out"
          />
        )}
        {toggleMenu && (
          <div
            className="absolute top-5 right-0 z-50 mt-4 flex min-w-40 flex-col items-end justify-end gap-4 rounded-md bg-black p-8 text-right shadow-md"
            onClick={() => setToggleMenu(false)}
          >
            <Link
              className="hover:text-fxisafetyorange text-fximoonstone text-lg font-bold no-underline"
              href="/"
            >
              HOME
            </Link>
            <Link
              className="hover:text-fxisafetyorange text-fximoonstone text-lg font-bold no-underline"
              href="/news"
            >
              NEWS
            </Link>
            <Link
              className="hover:text-fxisafetyorange text-fximoonstone text-lg font-bold no-underline"
              href="/squad"
            >
              SQUAD
            </Link>
            <Link
              className="hover:text-fxisafetyorange text-fximoonstone text-lg font-bold no-underline"
              href="/fixtures"
            >
              FIXTURES
            </Link>
            <Link
              className="hover:text-fxisafetyorange text-fximoonstone text-lg font-bold no-underline"
              href="/stats"
            >
              STATS
            </Link>
            <div className="block">
              <button
                type="button"
                onClick={() => goToContact()}
                className="bg-fxisafetyorange hover:bg-opacity-90 cursor-pointer rounded border-none px-4 py-2 text-lg font-bold text-black transition-colors duration-1000 ease-in-out outline-none"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
