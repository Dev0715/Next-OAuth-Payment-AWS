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

export default function SignUpCreator() {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof CreatorRegisterSchema>>({
		resolver: zodResolver(CreatorRegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			isCreator: false,
			isAffiliate: false,
			isCustomer: false,
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

	return (
		<main className="flex h-full flex-col">
			<Navbar title="Creator Registration" content="Register as a creator" />
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
							<h3 className="mb-4 text-base font-medium">Your roles</h3>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="isCreator"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
											<div className="space-y-0.5">
												<FormLabel>Creator</FormLabel>
												<FormDescription>
													You do something and something for a creator's role
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="isAffiliate"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
											<div className="space-y-0.5">
												<FormLabel>Affiliate</FormLabel>
												<FormDescription>
													You do something and something for a affiliate's role
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="isCustomer"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
											<div className="space-y-0.5">
												<FormLabel>Customer</FormLabel>
												<FormDescription>
													You do something and something for a customer's role
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
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
