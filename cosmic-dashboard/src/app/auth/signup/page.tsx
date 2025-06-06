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

		if (!email || !password) {
			setMessage("Email and Password are required");
			setIsLoading(false);
			return;
		}

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) {
				console.log(error, error.code);
				if (error.code === "user_already_exists") {
					setMessage("This e-mail already exists, please signup again with different details");
				} else {
					setMessage(error.message);
				}
			} else if (data.user) {
				console.log(data, error);
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
		setMessage(null);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
		setMessage(null);
	}

	return (
		<div className={styles.container}>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className={styles.form} aria-label='Sign Up Form'>
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
				{message ? <p className={message.includes("successful") ? styles.successMessage : styles.errorMessage}>{message}</p> : null}
				<button className={styles.submitBtn} disabled={isLoading} aria-label='Sign Up Button'>
					{isLoading ? "Signing up..." : "Sign Up"}
				</button>
			</form>
		</div>
	);
}
