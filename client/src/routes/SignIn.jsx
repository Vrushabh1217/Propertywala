import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const SignIn = () => {
	const [csrfToken, setCsrfToken] = useState();
	const [error, setError] = useState();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();


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

	const loginHandler = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:3003/auth/login', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					'CSRF-Token': csrfToken, // Include CSRF token in the header
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (data.user) {
				//set user
				dispatch(setUser(data.user));
				navigate("/");
				console.log("Login successful:", data.user);
			} else {
				setError(data.error);
				console.error("Login failed");
			}
		} catch (error) {
			// Handle network errors
			console.error("Network error:", error);
		}

		setEmail("");
		setPassword("");
	};

	return (
		<div className={classes.loginParentContainer}>
			<div>
				<div className={classes.loginChildContainer}>
					<div className={classes.icon}></div>
					<div className={classes.welcomeMessage}>
						<h2>Welcome back!</h2>
						<p>We're so excited to see you again!</p>
					</div>
					<form onSubmit={loginHandler}>
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
						<p className={classes.forgotPass}>
							Forgot your password?
						</p>
						<button type="submit" id="login">
							Log In
						</button>
						{error && <p className={classes.msg}>{error}</p>}
						<a href="/register">
							<p>
								Need an account? <span>Register</span>
							</p>
						</a>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
