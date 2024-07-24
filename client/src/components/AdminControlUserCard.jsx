import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/AdminControlUserCard.module.css";

const AdminControlUserCard = ({ user }) => {
	const [isCertified, setIsCetified] = useState(user.isCertified);
	const [isAdmin, setIsAdmin] = useState(user.isAdmin);
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

	const certifiedHandler = async (change) => {
		await fetch(`http://localhost:3003/certified/${user._id}/${change}`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'CSRF-Token': csrfToken, // Include CSRF token in the header
			},
		});
		setIsCetified(change);
	};
	const adminHandler = async (change) => {
		await fetch(`http://localhost:3003/admin/${user._id}/${change}`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'CSRF-Token': csrfToken, // Include CSRF token in the header
			},

		});
		setIsAdmin(change);
	};

	return (
		<div>
			<div className={classes.userCard}>
				<div className={classes.userCardChild}>
					<div>
						<p className={classes.icon}>{user.name[0]}</p>
					</div>
					<div>
						<h2>{user.name}</h2>
						<div className={classes.card__handle}>
							<span className={classes.handle}>{user.email}</span>
						</div>
					</div>
				</div>
				<div className={classes.userCardButtons}>
					{isCertified && (
						<button onClick={() => certifiedHandler(false)}>
							Remove Certified
						</button>
					)}
					{!isCertified && (
						<button onClick={() => certifiedHandler(true)}>
							Make Certified
						</button>
					)}
					{isAdmin && (
						<button onClick={() => adminHandler(false)}>
							Remove Admin
						</button>
					)}
					{!isAdmin && (
						<button onClick={() => adminHandler(true)}>
							Make Admin
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminControlUserCard;
