import React, { useContext } from "react";
import { cvs } from '../data'
import { Link } from 'react-router-dom'
import { BuilderContext } from './../App'

const CvList = () => {
	const ctx = useContext(BuilderContext)
	const profile = ctx.infoState
	const selectedCv = profile[0]['name']
	console.log(selectedCv)
	return (
		<>
			<h1>CV list</h1>
			<ul>
				{cvs.map((cv, i) => {
					return <li key={i}>
						<Link to={`/cv/${i}`} onClick={() => ctx.handleCvChange(i)}>{cv[0].name}</Link>
					</li>
				})}
			</ul>
			{/* {selectedCv.name} */}
		</>
	);
};

export default CvList;
