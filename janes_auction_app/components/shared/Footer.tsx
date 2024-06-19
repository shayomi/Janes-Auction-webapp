import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navitems from "./Navitems";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="w-full block ">
      <div className="flex flex-row flex-1 justify-between p-12 items-center border-b border-1 border-white">
        <div>
          <Link href="/" className="w-36">
            <Image
              src="/assets/logos/janes4.svg"
              width={200}
              height={50}
              alt="janes-logo"
            />
          </Link>
          {/* <p className="max-w-[250px] w-[220px] text-white">
            Janes is an auction platform to buy exclusive collectibles
          </p> */}
        </div>
        <div className="flex-row flex justify-evenly gap-8 text-white font-medium">
          <Link href="/">Janes Auctions</Link>
          <Link href="/">Janes Collectibles</Link>
          <Link href="/">Settings</Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Image src="/icons/world.svg" width={20} height={20} alt="langauge" />
          <h2 className="text-white font-bold">EN</h2>
        </div>
      </div>

      <div className="flex justify-center p-12 text-white font-medium mx-auto">
        <div className="flex flex-row items-center ">
          Copyright
          <span>
            <Image
              src="/icons/copyright.svg"
              width={20}
              height={20}
              alt="janes-logo"
            />
          </span>
          Janes, 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
