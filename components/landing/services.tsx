import Image from "next/image";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const Services = () => (
  <section className="w-full flex flex-col gap-y-6">
    <div className="w-full p-[6px] flex rounded-[54px] bg-white">
      <div className="w-1/2 px-9 py-4 flex flex-col gap-y-4">
        <GradientParagraph className="text-3xl font-semibold leading-tight">
          The only asset library membership you’ll ever need.
        </GradientParagraph>
        <p className="text-[22px] text-[#757575] font-semibold leading-tight">
          KRE8TIVE will offer a treasure trove of premium curated digital assets
          , priced to make your wallet smile.
        </p>
        <div className="flex flex-col">
          <p className="text-xl font-normal text-[#4F4F4F]">
            Sign up today and receive our
          </p>
          <p className="text-[21px] font-bold leading-normal">
            Free Exclusive Pre-Launch Bundle
          </p>
          <p className="text-sm text-[#B9B9B9] italic">
            [Offer Expires 07/01/2024]
          </p>
        </div>
        <GradientButton label="Member Signup" onClick={() => {}} />
      </div>
      <div className="w-1/2 flex rounded-[54px] overflow-hidden">
        <Image
          className="w-full"
          src="./landing/membership-preview.svg"
          width={661}
          height={368}
          alt="membership"
        />
      </div>
    </div>
    <div className="w-full p-[6px] flex rounded-[54px] bg-white">
      <div className="w-1/2 flex rounded-[54px] overflow-hidden">
        <Image
          className="w-full"
          src="./landing/creator-preview.svg"
          width={661}
          height={368}
          alt="membership"
        />
      </div>
      <div className="w-1/2 px-9 py-6 flex flex-col items-end gap-y-4 text-right">
        <GradientParagraph className="text-3xl font-semibold leading-tight">
          Attention all asset creators!
        </GradientParagraph>
        <p className="text-[19px] text-[#757575] leading-normal">
          {`It's time to recognize the `}
          <span className="font-bold">true worth</span>
          {` of your incredible designs and coded assets. Join `}
          <span className="font-bold">KRE8TIVE</span>
          {`, where you'll `}
          <span className="font-bold">
            earn industry-leading payouts of over 80%+
          </span>
          {`on your submitted work, with no minimums holding
          you back from the `}
          <span className="font-bold">rewards you deserve.</span>
        </p>
        <GradientButton label="Creator Signup" onClick={() => {}} />
      </div>
    </div>
  </section>
);
