"use client";

import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface LoginButtonProps {
  open: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  title?: string;
  message?: string;
  onOK?: () => void;
  onCancel?: () => void;
}

export const ConfirmAlert = ({
  open,
  title,
  message,
  onOK,
  onCancel
}: LoginButtonProps) => {
  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger disabled={!onOK} asChild={asChild}>
        {children}
      </AlertDialogTrigger> */}
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-x-4">
          {onCancel && (
            <AlertDialogCancel className="w-24" onClick={onCancel}>
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction className="w-24" onClick={onOK}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
