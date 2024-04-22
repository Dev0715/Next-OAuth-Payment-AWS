"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { SelectAccountsSchema } from "@/schemas/auth/register";
import { Switch } from "@/components/ui/switch";
import { SignedUpData } from "@/shared/types-user";

type Props = {
  defaultData: SignedUpData["creatorMatchings"];
  onContinue: (values: z.infer<typeof SelectAccountsSchema>) => void;
  onBack: (values: z.infer<typeof SelectAccountsSchema>) => void;
};

export const SelectMatchingForm = ({
  defaultData,
  onContinue,
  onBack
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");
  const [matchings, setMatchings] = useState<SignedUpData["creatorMatchings"]>({
    ...defaultData
  });

  const onContinueClicked = () => {
    onContinue(matchings);
  };

  const onBackClicked = () => {
    onBack(matchings);
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
        4. Please confirm your accounts on other creative markets.
      </p>
    </div>
  );
};
