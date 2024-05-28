import Image from "next/image";

import { GradientButton } from "../utils/gradient-button";

export const Services = () => (
  <section className="w-full flex flex-col gap-y-6">
    <div className="w-full p-[6px] flex rounded-[54px] bg-white">
      <div className="w-1/2 px-9 py-6 flex flex-col">
        <p className="text-3xl font-semibold leading-tight">
          The only asset library membership you’ll ever need.
        </p>
        <p>
          KRE8TIVE will offer a treasure trove of premium curated digital assets
          , priced to make your wallet smile.
        </p>
        <div className="flex flex-col">
          <p>Sign up today and receive our</p>
          <p>Free Exclusive Pre-Launch Bundle</p>
          <p>[Offer Expires 07/01/2024]</p>
          <GradientButton label="Member Signup" onClick={() => {}} />
        </div>
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
          src="./landing/membership-preview.svg"
          width={661}
          height={368}
          alt="membership"
        />
      </div>
      <div className="w-1/2 px-9 py-6 flex flex-col items-end text-right">
        <p className="text-3xl font-semibold leading-tight">
          Attention all asset creators!
        </p>
        <p>
          {`It's time to recognize the true worth of your incredible designs and
          coded assets. Join KRE8TIVE, where you'll earn industry-leading
          payouts of over 80%+ on your submitted work, with no minimums holding
          you back from the rewards you deserve.`}
        </p>
        <GradientButton label="Creator Signup" onClick={() => {}} />
      </div>
    </div>
  </section>
);
