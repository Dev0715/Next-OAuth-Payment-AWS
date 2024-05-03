"use client";

import { Bundle } from "@/shared/types/bundles.type";
import { useState } from "react";

type Props = {
  params: {
    bundleId: string;
  };
};

const BundleDetailPage = ({ params: { bundleId } }: Props) => {
  const [bundle, setBundle] = useState<Bundle>();

  return (
    <div className="w-full flex flex-col py-6">
      <p>Bundle Detail Page</p>
    </div>
  );
};

export default BundleDetailPage;
