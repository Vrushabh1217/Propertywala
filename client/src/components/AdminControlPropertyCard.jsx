import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/AdminControlPropertyCard.module.css";

const AdminControlPropertyCard = ({ property }) => {
	const [deleted, setDeleted] = useState(false);
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

	const removePropertyHandler = async () => {
		fetch(`http://localhost:3003/properties/remove/${property._id}`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'CSRF-Token': csrfToken, // Include CSRF token in the header
			},
		}).then(() => setDeleted(true));
	};

	return (
		<div>
			{!deleted && (
				<div className={classes.propertyCardAdminControl}>
					<div className={classes.propertyCardAdminControlChild}>
						<div>
							<p className={classes.icon}>{property.name[0]}</p>
						</div>
						<div>
							<h2>{property.name}</h2>
							<div className={classes.card__handle}>
								<span className={classes.handle}>
									{property.location}
								</span>
							</div>
						</div>
					</div>
					<div className={classes.propertyCardAdminControlButtons}>
						<button onClick={removePropertyHandler}>
							Remove Property
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminControlPropertyCard;
