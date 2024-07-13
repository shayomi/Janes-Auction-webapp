import Collection from "@/components/shared/Collection";
import Image from "next/image";
import Search from "@/components/shared/Search";
import { getAllAuction } from "@/lib/actions/auction.action";
import { SearchParamProps } from "@/types";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const auctions = await getAllAuction({
    query: searchText,
    category,
    page,
    limit: 8,
  });

  return (
    <main className="max-w-[1440px] w-full block">
      {/* hero section */}
      <section className="flex h-[500px] md:min-h-[600px] flex-col items-center justify-between md:p-24 p-12 mt-24">
        <Image
          src="/assets/janes_bg.png"
          width={600}
          height={600}
          alt="janes_hero"
        />

        <Image
          src="/assets/janesartone.png"
          width={500}
          height={800}
          alt="janesart"
          className="absolute top-[13%] left-[50%} cursor-pointer"
        />
      </section>

      {/* about section */}
      <section className="flex flex-col  gap-12 p-6 md:p-12 mt-12 md:mt-6">
        <div className="flex flex-col gap-6 md:flex-row justify-between items-start mx-auto ">
          <Image
            src="/assets/janes-about.png"
            width={300}
            height={400}
            alt="janesart"
            className="mx-auto sm:mx-0"
          />

          <p className="text-white text-md max-w-[500px]">
            These art works are exclusively created for people with inner
            imaginations. They are well created and much of value. The owners
            have collaborated with Janes to make usre it gets out there for
            people who appreciate arts.
          </p>
        </div>
        <div className="mt-12">
          <Collection
            data={auctions?.data}
            emptyTitle="No collections at the moment"
            emptyStateSubtext="Come back later"
            collectionType="All_Auctions"
            limit={8}
            page={1}
            totalPages={2}
          />
        </div>
      </section>

      {/* collection section */}

      <section className="flex flex-col  gap-12 p-6 md:p-12 mt-12 md:mt-6 max-h-[700px] h-full">
        <Image
          src="/assets/collectionbg.png"
          width={500}
          height={500}
          alt="janesart"
          className=""
        />
        <div className="flex flex-col md:flex-row justify-evenly gap-12 text-white ">
          <p className="text-sm max-w-[100%] md:max-w-[40%]">
            JANES has created more than 100 editions of his most famous
            characters: Companion, JANES&apos;s ubiquitous Mickey Mouse-inspired
            cartoon with Xs for eyes, Chum, a version of Companion that is
            reminiscent of the Michelin Man, and Accomplice, another seeming
            relative of Companion, but with a pair of rabbit ears. JANES are
            produced in vinyl, wood, and mixed media. JANES&apos; sculpture have
            been produced in editions of 10, 25, and 100.
          </p>
          <div className="grid grid-cols-2  gap-8 w-[100%] md:w-[55%] items-start md:items-end">
            <Image
              src="/assets/janesthree.png"
              width={400}
              height={1000}
              alt="janesart"
              className="px-6 py-4 border-[1px] border-slate-300 rounded-md "
            />
            <div className="flex flex-col gap-4 justify-center">
              <Link href="/collections">
                <Image
                  src="/icons/nexticon.png"
                  alt="menu"
                  width={60}
                  height={60}
                  className="cursor-pointer order-last md:order-none"
                />
              </Link>
              <Image
                src="/assets/janesfour.png"
                width={250}
                height={300}
                alt="janesart"
                className="px-6 py-4 border-[1px] border-slate-300 rounded-md opacity-40"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
