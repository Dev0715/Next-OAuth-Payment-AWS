"use client";

import { BundleItem } from "@/components/bundles/bundle-item";
import { getAllBundles } from "@/data/bundles/bundles-all";
import { Bundle } from "@/shared/types/bundles.type";
import { useEffect, useState } from "react";

const BundlePage = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    getAllBundles().then((_bundles) => {
      setBundles(_bundles);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-6 p-6">
      <p className="text-2xl font-semibold">Bundles</p>
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
