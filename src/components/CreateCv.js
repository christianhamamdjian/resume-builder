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
			return ({ ...cv, template: "1", title: cvTitle })
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
							// className='cv-create-wrapper'
							className="flex mt-4 px-4 justify-between"
							// onSubmit={(e) => createNew(e, cvs[0])}
							onSubmit={(e) => createNew(e, newCv)}
						>
							<input
								//className='cv-create-input'
								placeholder='CV title'
								name='name'
								//ref={el => inputElement = el}
								autoComplete='off'
								value={cvTitle}
								onChange={(e) => setCvTitle(e.target.value)}
								style={{ padding: ".4rem", border: "1px solid #dddddd", borderRadius: ".4rem", marginRight: 20, marginBottom: ".5rem", minWidth: "10rem", width: "16rem" }}
							/>
							<div className='cv-actions'>
								{/* <button className='btn cv-create-button' disabled={cvTitle === ""}> */}
								<button className='bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' disabled={cvTitle === ""}>
									New CV
								</button>
							</div>
						</form>
						<br />
					</div>
				</>
			}
		</>
	);
};

export default CreateCv;
