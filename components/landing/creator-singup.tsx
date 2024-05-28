import Image from "next/image";

import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const CreatorSignUp = () => (
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
    <div className="w-1/2 px-9 py-6 flex flex-col gap-y-6 text-right">
      <GradientParagraph className="text-3xl font-firs font-semibold leading-tight">
        Attention all asset creators!
      </GradientParagraph>
      <div className="flex flex-col items-end gap-y-8">
        <p className="font-haas font-normal text-[19px] text-[#757575] leading-normal">
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
        <div className="w-[90%] h-8 rounded-full bg-[#D9D9D9]">
          <div className="w-[80%] h-full rounded-full overflow-hidden bg-gradient-to-r from-[#702B69] to-[#2B7AC3]">
            <div
              className="w-full h-full bg-[linear-gradient(-45deg,#777_25%,transparent_25%,transparent_50%,#777_50%,#777_75%,transparent_75%,transparent)] 
                        bg-[length:20px_20px] bg-[position:0_0,10px_10px] text-white px-4 flex items-center justify-end"
            >
              80%+ Payouts!
            </div>
          </div>
        </div>
        <GradientButton
          className="font-firs text-xl"
          label="Creator Signup"
          onClick={() => {}}
        />
      </div>
    </div>
  </div>
);
