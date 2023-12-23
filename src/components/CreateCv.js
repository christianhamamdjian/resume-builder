import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { BuilderContext } from '../App'
import { cvs } from '../data'
import api from "../utils/api"

const CreateCv = () => {
	const ctx = useContext(BuilderContext)
	const allCvs = ctx.infoState
	const { setInfoState } = ctx
	const { user, authReady } = useContext(AuthContext);
	const [cvTitle, setCvTitle] = useState("")
	const userId = user?.id
	console.log(cvTitle)

	const createNew = (e, cvInfo) => {
		e.preventDefault()
		api.create(cvInfo).then((response) => {
			console.log("New Cv was created successfully!")
			setInfoState([...allCvs, response])
		})
	}
	const cvWithId = [{ type: "id", authorId: userId, id: Date.now(), template: "1", title: cvTitle }, ...cvs[0]]
	return (
		<>
			{authReady && user &&
				<>
					<div>
						<form
							className='cv-create-wrapper'
							// onSubmit={(e) => createNew(e, cvs[0])}
							onSubmit={(e) => createNew(e, cvWithId, cvTitle)}
						>
							<input
								className='cv-create-input'
								placeholder='CV title'
								name='name'
								//ref={el => inputElement = el}
								autoComplete='off'
								value={cvTitle}
								onChange={(e) => setCvTitle(e.target.value)}
								style={{ padding: ".2rem", border: "1px solid #dddddd", marginRight: 20, marginBottom: ".5rem" }}
							/>
							<div className='cv-actions'>
								<button className='btn cv-create-button'>
									Create a new CV
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
