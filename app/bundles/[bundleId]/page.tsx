"use client";

import { getBundleById } from "@/data/bundles/bundle-by-id";
import { Bundle } from "@/shared/types/bundles.type";
import { useEffect, useState } from "react";

type Props = {
  params: {
    bundleId: string;
  };
};

const BundleDetailPage = ({ params: { bundleId } }: Props) => {
  const [bundle, setBundle] = useState<Bundle>();

  useEffect(() => {
    getBundleById(bundleId).then((res) => {
      setBundle(res || undefined);
    });
  }, []);

  if (!bundle) {
    return <div className="w-full p-6">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col p-6">
      <p>Bundle Detail Page</p>
    </div>
  );
};

export default BundleDetailPage;
