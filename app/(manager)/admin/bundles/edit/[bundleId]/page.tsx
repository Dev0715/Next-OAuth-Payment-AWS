"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../../../_components/navbar";
import { Bundle } from "@/shared/types/types-bundles";
import { getBundleById } from "@/data/bundles/bundle-by-id";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Props = {
  params: {
    bundleId: string;
  };
};

export default function BundleEditPage({ params: { bundleId } }: Props) {
  const [bundle, setBundle] = useState<Bundle>();
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getBundleById(bundleId).then((res) => {
      if (res) {
        setBundle(res);
      }
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-6">
      <Navbar
        title={`Edit Bundle - "${bundle?.title}"`}
        content="You can add products to this bundle or edit the description."
      />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="text-md">Description for a bundle</p>
          <Textarea
            className="w-1/2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-md">Price</p>
          <Input
            className="w-1/4"
            value={price}
            onChange={(e) => setDescription(e.target.value)}
            type="number"
          />
        </div>
      </div>
    </div>
  );
}
