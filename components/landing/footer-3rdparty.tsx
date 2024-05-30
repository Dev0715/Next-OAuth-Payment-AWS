import Image from "next/image";

import { GradientParagraph } from "../utils/gradient-paragraph";

export const Footer3rdParty = () => (
  <div className="row-span-2">
    <GradientParagraph className="text-lg font-semibold">
      Trusted & Secure
    </GradientParagraph>
    <div className="mt-4 lg:mt-6 flex gap-x-12">
      <div className="flex flex-col items-center gap-y-9">
        <Image
          src="./footer/TrustmarkEngagement.svg"
          width={121}
          height={51}
          alt="TrustedSite"
        />
      </div>
      <div className="flex flex-col items-center gap-y-9">
        <Image
          src="./footer/NortonSecureSeal.svg"
          width={114}
          height={63}
          alt="TrustPilot"
        />
        <Image
          src="./footer/TrustpilotLogo.svg"
          width={96}
          height={46}
          alt="TrustPilot"
        />
      </div>
    </div>
  </div>
);
