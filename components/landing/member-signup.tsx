import Image from "next/image";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const MemberSignUp = () => (
  <div className="w-full p-[6px] grid grid-cols-1 xl:grid-cols-2 gap-3 rounded-3xl md:rounded-[54px] bg-white">
    <div className="p-4 space-y-4 sm:space-y-0 md:px-14 md:py-6">
      <div className="space-y-4 text-center md:text-left">
        <GradientParagraph className="text-xl md:text-3xl leading-8 font-firs font-semibold">
          The only asset library membership you’ll ever need.
        </GradientParagraph>
        <p className="font-firs text-md md:text-[22px] text-[#757575] font-semibold leading-snug">
          KRE8TIVE will offer a treasure trove of premium curated digital assets
          , priced to make your wallet smile.
        </p>
      </div>
      <div className="flex items-center justify-center md:justify-start gap-6">
        <div className="font-haas text-[#4F4F4F] text-center md:text-left">
          <p className="text-md lg:text-xl font-normal leading-[25px]">
            Sign up today and receive our
          </p>
          <p className="mb-2 text-md lg:text-[21px] font-bold leading-[25px]">
            Free Exclusive Pre-Launch Bundle
          </p>
          <p className="mb-4 ml-0.5 text-[13px] font-normal text-[#B9B9B9] italic">
            [Offer Expires 07/01/2024]
          </p>
          <GradientButton
            className="font-firs text-md md:text-xl py-[6px] font-semibold"
            label="Member Signup"
            onClick={() => {}}
          />
        </div>
        <Image
          className="hidden sm:block"
          src="./landing/ToutImageBundleBox.svg"
          width={160}
          height={166}
          alt="Tout"
        />
      </div>
    </div>
    <div className="min-h-[350px] rounded-3xl lg:rounded-[54px] overflow-hidden bg-[url('/landing/MembershipPreview.svg')] bg-no-repeat bg-center bg-cover"></div>
  </div>
);
