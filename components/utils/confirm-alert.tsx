"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface LoginButtonProps {
  open: boolean;
  children?: React.ReactNode;
  asChild?: boolean;
  title?: string;
  message?: string;
  onContinue?: () => void,
}

export const ConfirmAlert = ({ open, children, asChild, title, message, onContinue }: LoginButtonProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger disabled={!onContinue} asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
