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

        {selectedIndex > 4 && selectedIndex < stepCnt - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
