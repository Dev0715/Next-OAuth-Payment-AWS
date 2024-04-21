"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface LoginButtonProps {
  open: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  title?: string;
  message?: string;
  onOK?: () => void;
}

export const ConfirmAlert = ({
  open,
  children,
  asChild,
  title,
  message,
  onOK
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
        <AlertDialogFooter>
          <AlertDialogAction onClick={onOK}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
