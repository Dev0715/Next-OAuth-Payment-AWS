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

  const secondValue = selectedIndex > 4 ? selectedIndex - 1 : 2;
  const thirdValue = selectedIndex > 4 ? selectedIndex : 3;
  const fourthValue = selectedIndex > 4 ? selectedIndex + 1 : 4;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive={selectedIndex === 1}>
            1
          </PaginationLink>
        </PaginationItem>

        {selectedIndex > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive={selectedIndex === secondValue}>
            {secondValue}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive={selectedIndex === thirdValue}>
            {thirdValue}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive={selectedIndex === fourthValue}>
            {fourthValue}
          </PaginationLink>
        </PaginationItem>

        {selectedIndex < stepCnt - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive={selectedIndex === stepCnt}>
            {stepCnt}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
