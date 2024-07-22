import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full ">
      <div className="wrapper flex items-center justify-between p-12  border-b-[1px] border-blue-500 ">
        <Link href="/" className="w-36">
          <Image
            src="/assets/logos/janes4.svg"
            width={128}
            height={38}
            alt="drievent-logo"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex md:flex-around hidden w-full max-w-xs">
            <Navitems />
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-sm bg-blue-400" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
