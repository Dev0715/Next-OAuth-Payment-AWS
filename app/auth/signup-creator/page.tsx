"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "../_components/navbar";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { CreatorRegisterSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";

export default function SignUpCreator() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof CreatorRegisterSchema>>({
		resolver: zodResolver(CreatorRegisterSchema),
		defaultValues: {
			username: "",
			firstname: "",
			lastname: "",
			email: "",
		}
	});

	const onSubmit = (values: z.infer<typeof CreatorRegisterSchema>) => {
		setError("");
		setSuccess("");

		console.log("FORM VALUES", values);

		startTransition(() => {
			// save the user's profile
		});
	};

	const onAgreeScrap = (checked: boolean) => {
		console.log("AGREE SCRAP", checked);
	}

	return (
		<main className="w-full h-full flex flex-col gap-y-6">
			<Navbar title="Creator Registration" content="Register as a creator" />
			<section className="flex items-center gap-x-4">
				<Button asChild variant="link">
					<Link href="">
						Accept our standard Legal Agreements
					</Link>
				</Button>
				<Switch onCheckedChange={onAgreeScrap} />
			</section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="w-full flex gap-x-12">
						<section className="w-1/2 flex flex-col gap-y-6">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input disabled={isPending} placeholder="John Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-x-4">
								<FormField
									control={form.control}
									name="firstname"
									render={({ field }) => (
										<FormItem className="w-1/2">
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input disabled={isPending} placeholder="John Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastname"
									render={({ field }) => (
										<FormItem className="w-1/2">
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input disabled={isPending} placeholder="John Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
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
												placeholder="username@yemail.com"
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>
						<section className="w-1/2">

						</section>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit">
						Register
					</Button>
				</form>
			</Form>
		</main>
	);
}
