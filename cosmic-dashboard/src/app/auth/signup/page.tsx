"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/app/utils/supabaseClient";
import styles from "./page.module.css";

export default function SignUp() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);

		const sanEmail = email.trim().toLowerCase();
		const sanPassword = password.trim();
		let hasError: boolean = false;

		if (!sanEmail) {
			setEmailError("Email is required");
			hasError = true;
		} else if (!sanEmail.includes("@") || !sanEmail.includes(".")) {
			setEmailError("Enter valid Email");
			hasError = true;
		}

		if (!sanPassword) {
			setPasswordError("Password is required");
			hasError = true;
		} else if (sanPassword.length < 8) {
			setPasswordError("Password must be at least 8 chararcters");
			hasError = true;
		}

		if (hasError) {
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
		setEmailError(null);
	}

	function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
		setMessage(null);
		setPasswordError(null);
	}

	return (
		<div className={styles.container}>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className={styles.form} aria-label='Sign Up Form'>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='text'
						id='email'
						name='email'
						value={email}
						onChange={handleEmailChange}
						className={styles.input}
						disabled={isLoading}
					/>
					{emailError ? <p className={styles.inputError}>{emailError}</p> : null}
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
					/>
					{passwordError ? <p className={styles.inputError}>{passwordError}</p> : null}
				</div>
				{message ? <p className={message.includes("successful") ? styles.successMessage : styles.errorMessage}>{message}</p> : null}
				<button className={styles.submitBtn} disabled={isLoading} aria-label='Sign Up Button'>
					{isLoading ? "Signing up..." : "Sign Up"}
				</button>
			</form>
		</div>
	);
}
