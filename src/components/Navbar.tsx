import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const goToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className="sticky bg-gradient top-0 z-50 w-full flex justify-between items-center p-8 h-20 shadow-md ">
      <Link className="flex items-center overflow-none" href="/">
          <Image
            src={'/mark.png'}
            alt="Friends XI logo"
            width={90}
            height={30}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />

      </Link>
      <div className='flex gap-12 items-center text-fxiblue font-bold font-header '>
        <Link className='' href="/">
          Home
        </Link>
        <Link className="" href="/projects">
          Fixtures
        </Link>
        <Link className="" href="/projects">
          Stats
        </Link>

      </div>
      <button className="bg-fxiorange p-3 rounded font-bold font-header" onClick={goToContact}>
        Contact
      </button>
    </nav>
  );
};

export default Navbar;