import React, { useContext } from "react";
import ResumeEdit from '../components/Editor/ResumeEdit'
import PreviewScreen from '../components/PDF/ResumeTemplate'
import AuthContext from "../context/authContext";
//import netlifyIdentity from 'netlify-identity-widget';

import CvList from './CvList'

const Home = () => {
	// const user = netlifyIdentity.currentUser();
	// console.log({ user });
	const { user, authReady, login, logout } = useContext(AuthContext);

	return (
		<>
			{authReady && user &&
				<>
					<h1>Home</h1>
					<p>You are logged in as <b>{user.email}</b></p>
					<CvList />
					{/* <ResumeEdit />
					<PreviewScreen /> */}
				</>
			}
		</>
	);
};

export default Home;
