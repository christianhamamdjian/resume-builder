import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import template7 from '../templates/Template7.png';
// import { Link } from 'react-router-dom';

const Navbar = () => {
	const { user, login, logout } = useContext(AuthContext);
	return (
		// <nav className="bg-white border-gray-200 dark:bg-gray-900">
		<>
			<nav className="bg-white border-gray-200">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
					<h1>Resume Builder</h1>
					{user && <p>Welcome back <b>{user?.email}</b> !</p>}
					<div className="login">
						{/* <Link to="home">Home</Link> | */}
						{/* <Link to="/"> Login</Link> */}
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
				</div>
			</nav>
			{!user && <div style={{ width: "100%", height: "auto", display: "flex", justifyItems: "center", alignContent: "center" }}>
				<img style={{ margin: "0 auto", width: "20rem", height: "auto" }} src={template7} alt="" />
			</div>}
		</>
	);
};

export default Navbar;
