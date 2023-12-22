import React, { useContext } from "react";
import ResumeEdit from './Editor/ResumeEdit'
import PreviewScreen from './Preview/ResumeTemplate'
import AuthContext from "../context/authContext";
import { BuilderContext } from '../App'
import { cvs } from '../data'
import api from "../utils/api"
//import netlifyIdentity from 'netlify-identity-widget';

import CvList from './CvList'
import SingleCv from './SingleCv'

const CreateCv = () => {
	const ctx = useContext(BuilderContext)
	const allCvs = ctx.infoState
	const { setInfoState } = ctx
	// const user = netlifyIdentity.currentUser();
	// console.log({ user });
	const { user, authReady, login, logout } = useContext(AuthContext);

	const userId = user?.id
	const createNew = (e, cvInfo) => {
		e.preventDefault()
		api.create(cvInfo).then((response) => {
			console.log("New Cv was created successfully!")
			setInfoState([...allCvs, response])
		})
	}
	const cvWithId = [{ type: "id", authorId: userId, id: Date.now() }, ...cvs[0]]
	return (
		<>
			{authReady && user &&
				<>
					<div style={{ width: "40%", margin: "0 auto" }}>
						<form
							className='cv-create-wrapper'
							// onSubmit={(e) => createNew(e, cvs[0])}
							onSubmit={(e) => createNew(e, cvWithId)}
						>
							{/* <input
								className='cv-create-input'
								placeholder='Add a cv item'
								name='name'
								//ref={el => inputElement = el}
								autoComplete='off'
								style={{ marginRight: 20 }}
							/> */}
							<div className='cv-actions'>
								<button className='btn cv-create-button'>
									Create cv
								</button>
							</div>
						</form>
						<br />
						{/* <CvList /> */}
						{/* <SingleCv /> */}
					</div>
				</>
			}
		</>
	);
};

export default CreateCv;
