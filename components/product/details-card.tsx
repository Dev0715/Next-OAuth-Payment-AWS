import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FaFileUpload, FaPlus, FaSave } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ImagePreview } from "./preview-image";
import {
  FileOrCreativeFile,
  FileOrString
} from "@/shared/types/file-preview-types";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MdClose } from "react-icons/md";
import { UseFormReturn } from "react-hook-form";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/shared/constants/product.constant";
import { FormError } from "../utils/form-error";
import { FormSuccess } from "../utils/form-success";
import { KeywordsCard } from "./keywords-card";

type Props = {
  isPending: boolean;
  error: string;
  success: string;
  selectedKeywords: string[];
  setSelectedKeywords: Dispatch<SetStateAction<string[]>>;
  form: any;
  onSubmit: () => void;
};

export const DetailsCard = ({
  isPending,
  error,
  success,
  selectedKeywords,
  setSelectedKeywords,
  form,
  onSubmit
}: Props) => {
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(PRODUCT_TYPE_DISPLAY_TEXT).map(
                    ([productType, text]) => (
                      <SelectItem key={productType} value={productType}>
                        {text}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title for Product</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Product Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description for Product</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="Product Description..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price for Product</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Product Price"
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <KeywordsCard
          isPending={isPending}
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full gap-x-2">
          <FaSave />
          Save
        </Button>
      </form>
    </Form>
  );
};
