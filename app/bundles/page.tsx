"use client";

import { BundleItem } from "@/components/bundles/bundle-item";
import { Button } from "@/components/ui/button";
import { getAllBundlesByState } from "@/data/bundle";
import { Bundle } from "@/shared/types/bundles.type";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ROWS_PER_PAGE = 10;

const BundlePage = () => {
  const [isPending, startTransition] = useTransition();

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<Record<string, string>>();

  useEffect(() => {
    getAllBundlesByState("available", ROWS_PER_PAGE).then((res) => {
      console.log(res);
      setBundles(res.items as Bundle[]);
      setLastEvaluatedKey(res.lastEvaluatedKey);
    });
  }, []);

  const isNextAvailable = useMemo(() => {
    return (
      lastEvaluatedKey ||
      pageIndex + 1 < Math.ceil(bundles.length / ROWS_PER_PAGE)
    );
  }, [lastEvaluatedKey, pageIndex, bundles.length]);

  const onNext = () => {
    if (pageIndex + 1 === Math.ceil(bundles.length / ROWS_PER_PAGE)) {
      startTransition(() => {
        getAllBundlesByState(
          "available",
          ROWS_PER_PAGE,
          lastEvaluatedKey?.bundleId
        ).then((res) => {
          if (res.items.length) {
            setBundles([...bundles, ...(res.items as Bundle[])]);
            setPageIndex(pageIndex + 1);
          }
          setLastEvaluatedKey(res.lastEvaluatedKey);
        });
      });
    } else {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-6 p-6 bg-gray-100">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">Bundles</p>
        <div className="flex gap-x-4">
          <Button
            variant={"outline"}
            className="flex gap-x-2"
            disabled={pageIndex === 0 || isPending}
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            <FaArrowLeft />
            Previous
          </Button>
          <Button
            variant={"outline"}
            className="flex gap-x-2"
            disabled={!isNextAvailable || isPending}
            onClick={onNext}
          >
            Next
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {bundles.map((bundle, index) =>
          index >= pageIndex * ROWS_PER_PAGE &&
          index < (pageIndex + 1) * ROWS_PER_PAGE ? (
            <div
              className={`w-1/2 pb-6 ${index % 2 === 0 ? "pr-3" : "pl-3"}`}
              key={bundle.bundleId}
            >
              <BundleItem bundle={bundle} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default BundlePage;
