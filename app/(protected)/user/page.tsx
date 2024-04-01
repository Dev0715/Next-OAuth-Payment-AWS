"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { login } from "@/actions/login";
import { Separator } from "@/components/ui/separator";
import { ProfileSchema } from "@/schemas/user";

export default function Profile() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			email: "",
			password: ""
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
		<main className="w-full h-full px-8 flex flex-col gap-y-5">
			<header className="flex flex-col gap-y-1">
				<p className="text-xl text-black font-medium drop-shadow-md">Profile</p>
				<p className="text-sm text-gray-600">
					This is how others will see you on the site
				</p>
			</header>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-6 w-96 max-w-full">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<Button
										size="sm"
										variant="link"
										asChild
										className="px-0 font-normal"
									>
										<Link href="/auth/reset">Forgot password?</Link>
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit">
						Save Profile
					</Button>
				</form>
			</Form>
		</main>
	);
};