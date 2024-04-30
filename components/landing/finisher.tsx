import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Finisher = () => (
  <section className="pb-20 relative block bg-gray-900">
    <div
      className="bottom-auto top-px left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
      style={{ height: "80px" }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="text-gray-900 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>

    <div className="container mx-auto px-4 lg:pt-24 lg:pb-20">
      <div className="flex flex-wrap text-center justify-center">
        <div className="w-full lg:w-6/12 px-4">
          <h2 className="text-4xl font-semibold text-white">
            Ready to unleash your creativity?
          </h2>
          <div className="mt-20">
            <Button
              className="w-1/3 animate-pulse"
              variant="default"
              asChild
              size="lg"
            >
              <Link href="/auth/register">Sign-Up Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
