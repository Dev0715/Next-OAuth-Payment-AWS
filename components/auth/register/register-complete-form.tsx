"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight, FaKey, FaUser } from "react-icons/fa";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import Link from "next/link";

type Props = {
  step: number;
};

export const RegisterCompleteForm = ({ step }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isConfirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={isConfirmOpen}
        title="Error"
        message={confirmMessage}
        onOK={() => setConfirmOpen(false)}
      />
      <p className="text-xl text-green-700">
        {step + 1}. Complete registration.
      </p>
      <div className="flex flex-col">
        <p>Congratulations!</p>
        <p className="text-base text-gray-500">
          You have completed sign up steps.
        </p>
      </div>
      <div className="w-full mt-4">
        <Button asChild className="w-64 flex gap-x-4 border-red-700">
          <Link href="/auth/login">
            <FaKey />
            Go to Login
          </Link>
        </Button>
      </div>
    </div>
  );
};
