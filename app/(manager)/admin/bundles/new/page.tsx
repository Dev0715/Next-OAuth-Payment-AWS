"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaArrowRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

import { GradientButton } from "@/components/utils/gradient-button";
import { createBundle } from "@/data/bundle";
import { userAtom } from "@/store/user";

import { Navbar } from "../../_components/navbar";

const NewBundlePage = () => {
  const [user] = useAtom(userAtom);
  const history = useRouter();

  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _title = e.target.value;
    setTitle(_title);
    setError(error && _title.length < 6);
  };

  const onCreateBundle = () => {
    if (title.length < 6) {
      setError(true);
      return;
    }

    const bundleId = uuidv4();
    startTransition(() => {
      createBundle({
        bundleId,
        title,
        userId: user?.userId as string,
        state: "editing"
      }).then((res) => {
        if (res.success) {
          history.push(`/admin/bundles/edit/${bundleId}`);
        } else {
          setServerError(true);
        }
      });
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <ConfirmAlert
        open={serverError}
        title="Error"
        message="Internal Server Error"
        onOK={() => setServerError(false)}
      />
      <Navbar title="New Bundle" content="Create a new bundle" />
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <p className="text-xl">Title for bundle</p>
          <Input
            disabled={isPending}
            className="w-96"
            placeholder="Enter title"
            value={title}
            onChange={onTitleChange}
          />
          {error && (
            <p className="text-sm text-red-500">
              Title should be at least 6 characters long
            </p>
          )}
        </div>
        <GradientButton
          disabled={isPending}
          className="w-48 flex gap-x-2 rounded-none"
          onClick={onCreateBundle}
        >
          <FaArrowRight />
          Create
        </GradientButton>
      </div>
    </div>
  );
};

export default NewBundlePage;
