import Image from "next/image";
import Link from "next/link";

import { GradientParagraph } from "../utils/gradient-paragraph";

export const FooterSocial = () => (
  <div>
    <GradientParagraph className="text-lg font-semibold">
      Social
    </GradientParagraph>
    <div className="mt-4 lg:mt-6 flex items-center gap-4 md:justify-between">
      <Link href="/">
        <Image
          src="./social/linkedin.svg"
          width={26}
          height={26}
          alt="linkedin"
        />
      </Link>
      <Link href="/">
        <Image src="./social/x.svg" width={27} height={27} alt="linkedin" />
      </Link>
      <Link href="/">
        <Image
          src="./social/facebook.svg"
          width={26}
          height={26}
          alt="linkedin"
        />
      </Link>
      <Link href="/">
        <Image
          src="./social/youtube.svg"
          width={29}
          height={20}
          alt="linkedin"
        />
      </Link>
      <Link href="/">
        <Image
          src="./social/instagram.svg"
          width={25}
          height={25}
          alt="linkedin"
        />
      </Link>
      <Link href="/">
        <Image
          src="./social/pinterest.svg"
          width={24}
          height={24}
          alt="linkedin"
        />
      </Link>
    </div>
  </div>
);
