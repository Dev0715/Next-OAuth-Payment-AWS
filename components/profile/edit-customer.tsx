"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { CustomerRegisterSchema } from "@/schemas/auth/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/utils/form-error";
import { FormSuccess } from "@/components/utils/form-success";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCcStripe, FaPaypal, FaUser } from "react-icons/fa";
import { registerUser } from "@/actions/auth/register-user";
import { axiosClient, axiosConfig } from "@/lib/axios";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import { getUserById } from "@/data/user";

export default function EditCustomer({
  disabled = false
}: {
  disabled?: boolean;
}) {
  const [user] = useAtom(userAtom);

  return (
    <main className="w-full flex justify-between gap-x-6">
      <div className="w-2/5 flex flex-col gap-y-6">
        <p className="text-xl font-medium">For First CUSTOMERs!</p>
        <div>
          <p>
            Be the earliest users to get the latest updates and news from us!
          </p>
          <p>
            Early subscribers will get exclusive access to our new features and
            various benefits.
          </p>
          <p>We will also give a number of bonuses like $10 off.</p>
          <p>
            You will have free Launch Package that will have a bundle of free
            fonts, images, ...
          </p>
          <p>
            Join the Discord and follow notifications and news on our channel
          </p>
        </div>
        <p className="text-xl font-medium">SUBSCRIBE NOW!</p>
        <div className="w-3/4 flex flex-col gap-y-6">
          <Button
            variant="outline"
            disabled={disabled}
            className="flex gap-x-2 border-green-700"
          >
            <FaPaypal />
            Subscribe with Paypal
          </Button>
          <Button
            variant="outline"
            disabled={disabled}
            className="flex gap-x-2 border-blue-700"
          >
            <FaCcStripe />
            Subscribe with Stripe
          </Button>
        </div>
      </div>
    </main>
  );
}
