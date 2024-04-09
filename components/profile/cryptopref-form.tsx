"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { register } from "@/actions/register";
import { CryptoPrefSchema } from "@/schemas/user";

export const CryptoPreferenceForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CryptoPrefSchema>>({
    resolver: zodResolver(CryptoPrefSchema),
    defaultValues: {
      bitcoin: '',
      ethereum: '',
      litecoin: '',
      dogecoin: '',
      xrp: '',
      sol: '',
      usdcoin: '',
      avax: '',
      tron: ''
    }
  });

  const onSubmit = (values: z.infer<typeof CryptoPrefSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {

    });
  };
}