"use client";

import { useState } from "react";
import supabase from "@/app/utils/supabaseClient";
import styles from "./SignUp.module.css";

export default function SignUp() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
				console.log(data);
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
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={email}
						onChange={handleEmailChange}
						className={styles.emailInput}
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
						className={styles.passwordInput}
						disabled={isLoading}
						minLength={8}
						required
					/>
				</div>
				<p>{message ? message : null}</p>
				<button className={styles.submitBtn} disabled={isLoading}>
					Sign Up
				</button>
			</form>
		</div>
	);
}
