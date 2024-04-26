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
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface LoginButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  title?: string;
  message?: string;
  onContinue?: () => void;
  onCancel?: () => void;
}

export const QuestionAlert = ({
  children,
  asChild,
  title,
  message,
  onContinue,
  onCancel
}: LoginButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!onContinue} asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
