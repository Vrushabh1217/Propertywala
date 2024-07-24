import React, { useEffect } from "react";
import { useState } from "react";
import classes from "../assets/Styles/register.module.css";

const SignUp = () => {
	const [error, setError] = useState();
	const [message, setMessage] = useState();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [csrfToken, setCsrfToken] = useState();

	useEffect(() => {
		// Fetch CSRF token from the server
		fetch('http://localhost:3003/csrf-token', {
			method: 'GET',
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((data) => setCsrfToken(data.csrfToken))
			.catch((error) => console.error('Error fetching CSRF token:', error));

	}, []);


	const registerHandler = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3003/auth/register",
				{
					method: "POST",
					credentials: 'include',
					headers: {
						"Content-Type": "application/json",
						'CSRF-Token': csrfToken, // Include CSRF token in the header
					},
					body: JSON.stringify({ email, name, password }),
				}
			);

			const data = await response.json();
			if (data.msg) {
				setMessage(data.msg);
				console.log("Login successful:", data);
			} else {
				setError(data.error);
				console.error("Login failed");
			}
		} catch (error) {
			console.error("Network error:", error);
		}

		setEmail("");
		setName("");
		setPassword("");
	};

	return (
		<div className={classes.loginParentContainer}>
			<div className={classes.loginChildContainer}>
				<h2 className={classes.welcomeMessage}>Create an account</h2>
				<form onSubmit={registerHandler}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						required
					></input>
					<label htmlFor="name">Username</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					></input>
					<label htmlFor="password">password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						required
					></input>
					<button type="submit" id="register">
						Register
					</button>
					{error && <p className={classes.error}>{error}</p>}
					{message && <p className={classes.msg}>{message}</p>}
					<a href="/login">
						<p className={classes.alreadyAccount}>
							Already have an account?
						</p>
					</a>
					<p>
						By registering you agree to Property Wala's
						<span>Terms of Service</span> and
						<span>Privacy Policy</span>.
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
