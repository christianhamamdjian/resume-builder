import React, { useContext } from "react";
import { cvs } from '../data'
import { Link } from 'react-router-dom'
import api from "../utils/api"
import { BuilderContext } from './../App'

const CvList = () => {

	const ctx = useContext(BuilderContext)

	const createNew = (e, cvInfo) => {
		e.preventDefault()
		api.create(cvInfo)
	}

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
				{cvs.map((cv, i) => {
					return <li key={i}>
						<Link to={`/cv/${i}`}
						// onClick={() => ctx.handleCvChange(i)}
						>{cv[1].name}</Link>
						<button data-id={i} onClick={ctx.deleteCv}>
							delete
						</button>
					</li>
				})}
			</ul>
		</>
	);
};

export default CvList;
