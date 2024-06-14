import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex items-center justify-evenly px-12 h-[70px] text-white">
        <Link href="" className="w-36 ">
          <Image
            src="/assets/logos/janes4.svg"
            width={128}
            height={39}
            alt="Janes"
          />
        </Link>
        <div className="flex flex-row gap-x-6">
          <Link href="">Auction</Link>
          <Link href="">Collections</Link>
        </div>
        <div className="flex w-32">clerk here</div>
      </div>
    </header>
  );
};

export default Header;
