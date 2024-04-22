"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CreatorDetailsSchema } from "@/schemas/auth/register";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { checkGeneralDetails } from "@/actions/auth/register/check-general-details";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  step: number;
  defaultData: any;
  onContinue: (values: z.infer<typeof CreatorDetailsSchema>) => void;
  onBack: (values: z.infer<typeof CreatorDetailsSchema>) => void;
};

export const CreatorDetailsForm = ({
  step,
  defaultData,
  onContinue
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [avatar, setAvatar] = useState<File | null>();
  const [avatarImagePath, setAvatarImagePath] = useState<string>("");
  const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);

  const [cover, setCover] = useState<File | null>();
  const [coverImagePath, setCoverImagePath] = useState<string>("");
  const hiddenCoverFileIniput = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof CreatorDetailsSchema>>({
    resolver: zodResolver(CreatorDetailsSchema),
    defaultValues: {
      ...defaultData
    }
  });

  const onSubmit = (values: z.infer<typeof CreatorDetailsSchema>) => {
    startTransition(() => {});
  };

  const onAvatarChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImagePath(URL.createObjectURL(e.target.files[0]));
      setAvatar(e?.target?.files?.[0]);
    }
  };

  const onCoverChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImagePath(URL.createObjectURL(e.target.files[0]));
      setCover(e?.target?.files?.[0]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title="Error"
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-xl text-green-700">
        {step + 1}. Please provide your KRE8TOR details.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-6"
        >
          <div className="flex flex-col items-start gap-y-4">
            <FormLabel>Avatar Image</FormLabel>
            <div className="flex items-end gap-x-6">
              <Avatar className="w-24 h-24 rounded-[24px]">
                <AvatarImage src={avatarImagePath} />
                <AvatarFallback className="bg-sky-500 rounded-[24px]">
                  <FaUser className="text-white" />
                </AvatarFallback>
              </Avatar>
              <Button
                disabled={isPending}
                variant={"outline"}
                className="border-green-700"
                onClick={() => hiddenAvatarFileInput.current?.click()}
              >
                Upload New
              </Button>
              <Input
                className="hidden"
                type="file"
                accept="image/*"
                ref={hiddenAvatarFileInput}
                onChange={onAvatarChanged}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <Avatar className="w-full h-28 rounded-none">
              <AvatarImage src={coverImagePath} className="object-cover" />
              <AvatarFallback className="bg-sky-500">
                <div className="w-full h-full bg-inherit"></div>
              </AvatarFallback>
            </Avatar>
            <Button
              disabled={isPending}
              variant={"default"}
              onClick={() => hiddenCoverFileIniput.current?.click()}
            >
              Upload New
            </Button>
            <Input
              className="hidden"
              type="file"
              accept="image/*"
              ref={hiddenCoverFileIniput}
              onChange={onCoverChanged}
            />
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-64 flex gap-x-4 self-end mt-4"
          >
            <FaArrowRight />
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};
