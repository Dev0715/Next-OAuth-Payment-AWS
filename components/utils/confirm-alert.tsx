"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-x-4">
          {onCancel && (
            <AlertDialogCancel
              className="w-24 py-0 border border-red-700 rounded-none"
              onClick={onCancel}
            >
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction className="w-24 rounded-none" onClick={onOK}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
