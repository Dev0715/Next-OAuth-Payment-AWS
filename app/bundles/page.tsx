"use client";

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
      <div className="w-full flex flex-wrap gap-6"></div>
    </div>
  );
};

export default BundlePage;
