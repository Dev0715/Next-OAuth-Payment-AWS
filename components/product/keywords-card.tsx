import { FormDescription, FormItem, FormLabel } from "../ui/form";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";

type Props = {
  isPending: boolean;
  selectedKeywords: string[];
  setSelectedKeywords: Dispatch<SetStateAction<string[]>>;
};

export const KeywordsCard = ({
  isPending,
  selectedKeywords,
  setSelectedKeywords
}: Props) => {
  const [newKeywordVal, setNewKeywordVal] = useState<string>("");

  const onAddNewKeyword = () => {
    if (newKeywordVal === "") return;

    const existingOne = selectedKeywords.find(
      (keyword) => keyword === newKeywordVal
    );
    if (!existingOne) setSelectedKeywords((prev) => [...prev, newKeywordVal]);

    setNewKeywordVal("");
  };

  const onDeleteKeyword = (index: number) => {
    const newKeywords = [...selectedKeywords];
    newKeywords.splice(index, 1);
    setSelectedKeywords(newKeywords); // # Show Duplication Error? #
  };

  return (
    <FormItem>
      <FormLabel>Keywords</FormLabel>
      <FormDescription>
        You can set as many keywords as you want to improve chance of your
        product to be found out
      </FormDescription>
      <div className="w-full grid grid-cols-[1fr_auto] gap-4">
        <Input
          disabled={isPending}
          className=""
          type="text"
          value={newKeywordVal}
          onChange={(e) => setNewKeywordVal(e.target.value)}
        />
        <Button
          disabled={isPending}
          type="button"
          variant="link"
          className="flex gap-x-2 text-sm"
          onClick={onAddNewKeyword}
        >
          <FaPlus />
          Add
        </Button>
        <div className="flex flex-wrap gap-4 col-span-2">
          {selectedKeywords.map((keyword, index) => (
            <Badge key={keyword} className="h-8 flex gap-x-4 px-4 rounded-full">
              <p>{keyword}</p>
              <Button
                // asChild
                disabled={isPending}
                variant="link"
                className="p-0 text-base text-black cursor-pointer"
                onClick={() => onDeleteKeyword(index)}
              >
                <MdClose />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </FormItem>
  );
};
