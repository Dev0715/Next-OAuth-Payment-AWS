import Image from "next/image";

import { Input } from "../ui/input";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const FooterNewsletter = () => (
  <div className="">
    <GradientParagraph className="text-lg font-semibold">
      Join Our Newsletter
    </GradientParagraph>
    <div className="mt-4 lg:mt-6 flex items-center flex-wrap gap-x-2 lg:gap-x-6">
      <Image
        className="hidden lg:block"
        src="./footer/NewsLetter.svg"
        width={46}
        height={35}
        alt="newsletter"
      />
      <Input
        className="w-32 md:w-48 xl:w-60 h-[35px] bg-[#E6CCE8] border-white rounded-[9px]"
        placeholder="Enter your email address"
      />
      <GradientButton
        className="font-firs text-[15px] leading-none py-2"
        label="Subscribe"
        onClick={() => {}}
      />
    </div>
  </div>
);
