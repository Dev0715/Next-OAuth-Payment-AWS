import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NewProductSchema } from "@/schemas/product";
import { PRODUCT_TYPE_DISPLAY_TEXT } from "@/shared/constants/product.constant";

import { KeywordsCard } from "./keywords-card";

type Props = {
  isPending: boolean;
  isUpdating?: boolean;
  selectedKeywords: string[];
  setSelectedKeywords: Dispatch<SetStateAction<string[]>>;
  form: UseFormReturn<z.infer<typeof NewProductSchema>>;
};

export const DetailsCard = ({
  isPending,
  isUpdating,
  selectedKeywords,
  setSelectedKeywords,
  form
}: Props) => {
  return (
    <Card className="w-full h-fit p-6">
      <Form {...form}>
        <form className="w-full space-y-4">
          <FormField
            control={form.control}
            name="submitComment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment for action</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="Submit comment..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select
                  disabled={isPending || isUpdating}
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
        </form>
      </Form>
    </Card>
  );
};
