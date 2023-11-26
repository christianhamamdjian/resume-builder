import React, { useContext } from "react";
import { cvs } from '../data'
import { Link } from 'react-router-dom'
import api from "../utils/api"
import { BuilderContext } from './../App'
import AuthContext from "../context/authContext";

const CvList = () => {
	const ctx = useContext(BuilderContext)
	const allCvs = ctx.infoState
	const { setInfoSelected } = ctx
	const { setInfoState } = ctx

	const { user } = useContext(AuthContext);
	const userId = user?.id
	const setSelectedCv = (e, id) => {
		e.preventDefault()
		allCvs.filter((cv, i) => {
			if (+i === +id) {
				setInfoSelected(cv['data']["items"])
			} else {
				return null
			}
		})
	}

	const createNew = (e, cvInfo) => {
		e.preventDefault()
		api.create(cvInfo).then((response) => {
			console.log("New Cv was created successfully!")
			setInfoState([...allCvs, response])
		})
	}
	const renderCvs = () => allCvs.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const name = data["items"][1]["name"]
		const cvId = ref["@ref"]["id"]
		return <li key={i}>
			<Link to={`/cv/${i}`}
				onPointerDown={(e) => setSelectedCv(e, i)}
			>{name}</Link>
			<button data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
				Delete Cv
			</button>
		</li>
	})
	const cvWithId = [{ author: userId, id: Date.now() }, ...cvs[0]]

	return (
		<>
			<h2>
				Create cv
			</h2>
			<form
				className='cv-create-wrapper'
				// onSubmit={(e) => createNew(e, cvs[0])}
				onSubmit={(e) => createNew(e, cvWithId)}
			>
				<input
					className='cv-create-input'
					placeholder='Add a cv item'
					name='name'
					//ref={el => inputElement = el}
					autoComplete='off'
					style={{ marginRight: 20 }}
				/>
				<div className='cv-actions'>
					<button className='cv-create-button'>
						Create cv
					</button>
				</div>
			</form>
			<h1>CV list</h1>
			<ul>
				{renderCvs()}
			</ul>
		</>
	);
};

export default CvList;
