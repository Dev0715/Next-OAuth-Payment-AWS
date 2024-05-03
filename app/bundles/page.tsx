"use client";

import { BundleItem } from "@/components/bundles/bundle-item";
import { Button } from "@/components/ui/button";
import { getAllBundles } from "@/data/bundles/bundles-all";
import { Bundle } from "@/shared/types/bundles.type";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BundlePage = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    getAllBundles().then((_bundles) => {
      setBundles(_bundles);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-y-6 p-6 bg-gray-100">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">Bundles</p>
        <div className="flex gap-x-4">
          <Button variant={"outline"} className="flex gap-x-2">
            <FaArrowLeft />
            Previous
          </Button>
          <Button variant={"outline"} className="flex gap-x-2">
            Next
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {bundles.map((bundle, index) => (
          <div
            className={`w-1/2 pb-6 ${index % 2 === 0 ? "pr-3" : "pl-3"}`}
            key={bundle.bundleId}
          >
            <BundleItem bundle={bundle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BundlePage;
