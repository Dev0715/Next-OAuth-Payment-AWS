"use client";

import { Footer3rdParty } from "./footer-3rdparty";
import { FooterCopyright } from "./footer-copyright";
import { FooterLinks } from "./footer-links";

import { FooterNewsletter } from "./footer-newsletter";
import { FooterSocial } from "./footer-social";

export const LandingFooter = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-y-6">
      <div className="w-full p-8 lg:px-14 lg:pt-[27px] lg:pb-10 rounded-3xl lg:rounded-[40px] grid md:grid-cols-2 xl:grid-cols-[2fr_2fr_3fr] gap-4 bg-white/30">
        <FooterLinks />
        <Footer3rdParty />
        <FooterNewsletter />
        <FooterSocial />
      </div>
      <FooterCopyright />
    </footer>
  );
};
