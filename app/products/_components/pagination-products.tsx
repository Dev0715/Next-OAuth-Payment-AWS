import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { useState } from "react";

type Props = {
  totalCnt: number;
  cntForPage: number;
};

export const ProductPagination = ({ totalCnt, cntForPage }: Props) => {
  const stepCnt = Math.ceil(totalCnt / cntForPage);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              setSelectedIndex(selectedIndex > 1 ? selectedIndex - 1 : 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={selectedIndex === 1}
            onClick={() => setSelectedIndex(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {selectedIndex > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {[0, 1, 2].map((value) => {
          const _value =
            value +
            (selectedIndex > 4
              ? selectedIndex < stepCnt - 2
                ? selectedIndex - 1
                : stepCnt - 3
              : 2);

          return (
            <PaginationItem key={value}>
              <PaginationLink
                isActive={selectedIndex === _value}
                onClick={() => setSelectedIndex(_value)}
              >
                {_value}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {selectedIndex < stepCnt - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            isActive={selectedIndex === stepCnt}
            onClick={() => setSelectedIndex(stepCnt)}
          >
            {stepCnt}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              setSelectedIndex(
                selectedIndex < stepCnt ? selectedIndex + 1 : stepCnt
              );
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
