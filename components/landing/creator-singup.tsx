import { GradientButton } from "../utils/gradient-button";
import { GradientParagraph } from "../utils/gradient-paragraph";

export const CreatorSignUp = () => (
  <div className="w-full p-[6px] grid grid-cols-1 xl:grid-cols-2 rounded-3xl lg:rounded-[54px] bg-white">
    <div className="min-h-[350px] rounded-3xl lg:rounded-[54px] overflow-hidden bg-[url('/landing/CreatorPreview.svg')] bg-no-repeat bg-center bg-cover"></div>
    <div className="p-4 lg:px-14 lg:py-6 space-y-6 lg:text-right">
      <GradientParagraph className="text-xl lg:text-3xl font-firs font-semibold leading-tight">
        Attention all asset creators!
      </GradientParagraph>
      <div className="flex flex-col items-end gap-y-8">
        <p className="font-haas font-normal text-md lg:text-[19px] text-[#757575] leading-normal">
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
                        bg-[length:20px_20px] bg-[position:0_0,10px_10px] italic text-white px-4 flex items-center justify-end"
            >
              80%+ Payouts!
            </div>
          </div>
        </div>
        <GradientButton
          className="font-firs text-xl py-[6px] font-semibold"
          label="Creator Signup"
          onClick={() => {}}
        />
      </div>
    </div>
  </div>
);
