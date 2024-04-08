"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "../_components/header";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProfileSchema } from "@/schemas/user";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { Button } from "@/components/ui/button";
import { SwitchBox } from "@/components/utils/switch-box";

const AffiliateSettings = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      isCreator: false,
      isAffiliate: false,
      isCustomer: false,
      username: "",
      bio: "",
    }
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      // save the user's profile
    });
  };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      {/* <Header title="Creator" content="Select how this site you want to serve you" /> */}
      {/* <Separator /> */}
    </main>
  )
};

export default AffiliateSettings;
