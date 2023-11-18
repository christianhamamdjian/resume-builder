import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { user, login, logout } = useContext(AuthContext);
	return (
		<nav className="nav">
			<div className="login">
				<Link to="home">Home</Link> |
				<Link to="/"> Login</Link>
				<div>
					{!user && (
						<button onClick={login} className="btn">
							Login / Signup
						</button>
					)}

					{user && (
						<button onClick={logout} className="btn">
							Logout
						</button>
					)}
				</div>
			</div>

		</nav>
	);
};

export default Navbar;
