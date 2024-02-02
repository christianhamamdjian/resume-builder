import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import illustration1 from '../images/illustration-1.svg';

const Navbar = () => {
	const { user, login, logout } = useContext(AuthContext);
	return (
		// <nav className="bg-white border-gray-200 dark:bg-gray-900">
		<>
			<nav className="bg-white border-gray-200">
				<div className="flex flex-wrap justify-around items-center mx-auto max-w-screen-2xl p-4">
					<h1 className="text-2xl font-bold italic text-gray-400">Resume Builder</h1>
					{user && <p className="ml-auto" >Welcome back <b>{user?.email}</b> !</p>}
					<div className="login">
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
			{!user && <>
				<div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column", justifyItems: "center", alignContent: "center" }}>
					<img style={{ margin: "0 auto", width: "30rem", height: "auto" }} src={illustration1} alt="" />
					<h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", color: "gray" }}>Welcome to Resume Builder!</h1>
				</div>
			</>
			}
		</>
	);
};

export default Navbar;
