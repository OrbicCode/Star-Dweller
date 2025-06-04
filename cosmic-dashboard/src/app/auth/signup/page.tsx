"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/app/utils/supabaseClient";
import styles from "./page.module.css";

export default function SignUp() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) {
				setMessage(error.message);
			} else if (data) {
				setTimeout(() => {
					router.push("/dashboard");
				}, 2000);
				setMessage("Sign up successful! Redirecting...");
			} else {
				setMessage("No user data returned, please try again.");
			}
		} catch (err) {
			console.error("Signup Error:", err);
			setMessage("An Unexpected error occured");
		} finally {
			setIsLoading(false);
		}
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	return (
		<div className={styles.container}>
			<h1>Sign Up</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
				aria-label='Sign Up Form'
			>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={email}
						onChange={handleEmailChange}
						className={styles.input}
						disabled={isLoading}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={handlePasswordChange}
						className={styles.input}
						disabled={isLoading}
						minLength={8}
						required
					/>
				</div>
				{message ? (
					<p
						className={
							message.includes("successful")
								? styles.successMessage
								: styles.errorMessage
						}
					>
						{message}
					</p>
				) : null}
				<button className={styles.submitBtn} disabled={isLoading}>
					{isLoading ? "Sighning up..." : "Sign Up"}
				</button>
			</form>
		</div>
	);
}
