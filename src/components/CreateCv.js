import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { BuilderContext } from '../App'
import { cvs } from '../data'
import api from "../utils/api"

const CreateCv = () => {
	const ctx = useContext(BuilderContext)
	const allCvs = ctx.infoState
	const { setInfoState, setCvSelected } = ctx
	const { user, authReady } = useContext(AuthContext);
	const [cvTitle, setCvTitle] = useState("")
	const userId = user?.id

	const createNew = (e, cvInfo) => {
		e.preventDefault()
		api.create(cvInfo).then((response) => {
			console.log("New Cv was created successfully!")
			setInfoState([...allCvs, response])
			setCvSelected(response)
			setCvTitle("")
		})
	}

	const newCv = cvs.map(cv => {
		if (cv.type === "id") {
			return ({ ...cv, authorId: userId, id: Date.now() })
		} else if (cv.type === "info") {
			return ({ ...cv, template: "1", title: cvTitle, backgroundColor: "" })
		} else {
			return cv
		}
	})

	return (
		<>
			{authReady && user &&
				<>
					<div>
						<form
							className='cv-create-wrapper'
							// onSubmit={(e) => createNew(e, cvs[0])}
							onSubmit={(e) => createNew(e, newCv)}
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
								<button className='btn cv-create-button' disabled={cvTitle === ""}>
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
