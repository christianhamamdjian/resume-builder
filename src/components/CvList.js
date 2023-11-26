import React, { useContext } from "react";
import { cvs } from '../data'
import { Link } from 'react-router-dom'
import api from "../utils/api"
import { BuilderContext } from './../App'

const CvList = () => {
	const ctx = useContext(BuilderContext)
	const allCvs = ctx.infoState
	const { setInfoSelected } = ctx

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
		api.create(cvInfo)
	}

	const renderCvs = () => allCvs.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const name = data["items"][1]["name"]
		const cvId = ref["@ref"]["id"]
		return <li key={i}>
			<Link to={`/cv/${i}`}
				onPointerUp={(e) => setSelectedCv(e, i)}
			>{name}</Link>
			<button data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
				Delete Cv
			</button>
		</li>
	})
	return (
		<>
			<h2>
				Create cv
			</h2>
			<form
				className='cv-create-wrapper'
				onSubmit={(e) => createNew(e, cvs[0])}
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
