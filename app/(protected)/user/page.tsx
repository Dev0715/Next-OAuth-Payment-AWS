"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { login } from "@/actions/login";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values, callbackUrl).then((data) => {
				console.log("__login__RETURNED", data);

				if (data?.error) {
					form.reset();
					setError(data.error);
				}

				if (data?.success) {
					form.reset();
					setSuccess(data.success);
				}
			});
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
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="username@myemail.com"
											type="email"
										/>
									</FormControl>
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
					<Button disabled={isPending} type="submit" className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</main>
	);
};