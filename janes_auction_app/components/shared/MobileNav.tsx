import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Navitems from "./Navitems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer stroke-slate-50 fill-white"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-dark-4 md:hidden">
          <Image
            src="/assets/logos/janes4.svg"
            alt="logo"
            width={128}
            height={38}
            className="cursor-pointer"
          />
          <Separator className="border border-gray-50" />
          <Navitems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
