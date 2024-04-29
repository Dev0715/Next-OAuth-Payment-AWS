import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
// import { useState } from "react";

type Props = {
  stepCnt: number;
  selectedIndex: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const ProductPagination = ({
  stepCnt,
  selectedIndex,
  onPrevious,
  onNext
}: Props) => {
  // const onStepChanged = (index: number) => {
  //   setSelectedIndex(index);
  // };

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // onClick={() => {
            //   onStepChanged(selectedIndex > 1 ? selectedIndex - 1 : 1);
            // }}
            onClick={onPrevious}
          />
        </PaginationItem>

        {stepCnt > 0 && (
          <PaginationItem>
            <PaginationLink
              isActive={selectedIndex === 1}
              // onClick={() => onStepChanged(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {((selectedIndex > 4 && stepCnt > 5) ||
          (selectedIndex === 4 && stepCnt === 6)) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {[0, 1, 2].map((value) => {
          const _value =
            value +
            (selectedIndex > 4 || (selectedIndex === 4 && stepCnt === 6)
              ? selectedIndex < stepCnt - 2
                ? selectedIndex - 1
                : stepCnt - 3
              : 2);

          return stepCnt >= _value ? (
            <PaginationItem key={value}>
              <PaginationLink
                isActive={selectedIndex === _value}
                // onClick={() => onStepChanged(_value)}
              >
                {_value}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}

        {selectedIndex < stepCnt - 2 && stepCnt > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {stepCnt > 4 && (
          <PaginationItem>
            <PaginationLink
              isActive={selectedIndex === stepCnt}
              // onClick={() => onStepChanged(stepCnt)}
            >
              {stepCnt}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            // onClick={() => {
            //   onStepChanged(
            //     selectedIndex < stepCnt ? selectedIndex + 1 : stepCnt
            //   );
            // }}
            onClick={onNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
