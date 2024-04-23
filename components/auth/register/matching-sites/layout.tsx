import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Matching Site</CardTitle>
        <CardDescription>Confirm your username on this site</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
