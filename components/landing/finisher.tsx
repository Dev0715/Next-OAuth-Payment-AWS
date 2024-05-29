import Image from "next/image";

import { GradientParagraph } from "../utils/gradient-paragraph";

export const Finisher = () => (
  <section className="w-full py-12 flex flex-col items-center">
    <div className="flex items-center mb-4">
      <GradientParagraph className="text-3xl font-firs font-semibold">
        For the Community
      </GradientParagraph>
      <Image
        src="./landing/HeartSeal.svg"
        width={77}
        height={77}
        alt="heart seal"
      />
    </div>
    <div className="w-[70%]">
      <p className="text-xl text-center font-haas font-normal leading-normal mb-10">
        As fellow creators immersed in the world of design and code, we&apos;ve
        endured the pain of sifting through an ocean of mediocre assets that
        blend together in a sea of sameness or simply fail to make the grade.
        That&apos;s why we&apos;re channeling our passion and expertise into
        curating an extensive, top-tier collection of handpicked assets that not
        only meet but exceed our own lofty expectations, ensuring you have
        access to the cream of the crop.
      </p>
    </div>
    <p className="font-firs font-semibold text-2xl text-[#2A2A2A] mb-4">
      100% Curated With Love by
    </p>
    <Image
      src="./2AdvancedLogo.svg"
      width={233}
      height={111}
      alt="2advanced logo"
    />
  </section>
);
