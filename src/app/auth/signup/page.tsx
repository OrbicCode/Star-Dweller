'use client';

// import { supabase } from "@/utils/supabaseClient";
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const sanEmail = email.trim();
    const sanPassword = password.trim();

    if (!sanEmail) {
      setEmailError('Email required');
    }
    if (!sanPassword) {
      setPasswordError('Password required');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError ? <p>{emailError}</p> : null}
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        {passwordError ? <p>{passwordError}</p> : null}
        <button aria-label="Sign Up Button">Sign Up</button>
      </form>
    </div>
  );
}
