import Image from "next/image";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const MemberSignUp = () => (
  <div className="w-full p-[6px] flex rounded-[54px] bg-white">
    <div className="w-1/2 px-9 py-4 flex flex-col">
      <div className="flex flex-col gap-y-4">
        <GradientParagraph className="text-3xl leading-8 font-firs font-semibold">
          The only asset library membership you’ll ever need.
        </GradientParagraph>
        <p className="font-firs text-[22px] text-[#757575] font-semibold leading-snug">
          KRE8TIVE will offer a treasure trove of premium curated digital assets
          , priced to make your wallet smile.
        </p>
      </div>
      <div className="flex gap-x-6 -mt-6">
        <div className="flex flex-col font-haas text-[#4F4F4F] mt-10">
          <p className="text-xl font-normal">Sign up today and receive our</p>
          <p className="text-[21px] font-bold leading-normal mb-2">
            Free Exclusive Pre-Launch Bundle
          </p>
          <p className="text-[13px] font-normal text-[#B9B9B9] italic mb-4">
            [Offer Expires 07/01/2024]
          </p>
          <GradientButton
            className="font-firs text-xl"
            label="Member Signup"
            onClick={() => {}}
          />
        </div>
        <Image
          src="./landing/ToutImageBundleBox.svg"
          width={160}
          height={178}
          alt="Tout"
        />
      </div>
    </div>
    <div className="w-1/2 flex rounded-[54px] overflow-hidden">
      <Image
        className="w-full"
        src="./landing/MembershipPreview.svg"
        width={661}
        height={368}
        alt="membership"
      />
    </div>
  </div>
);
