import React, { useContext } from "react";
//import { Link } from 'react-router-dom'
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
				ctx.setCvSelected(cv)
			} else {
				return null
			}
		})
	}

	const renderCvs = () => allCvs.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const name = data["items"][1]["name"]
		const cvId = ref["@ref"]["id"]
		return <li key={i}>
			<div className="flex justify-evenly">
				{/* <Link to={`/cv/${i}`}
					onPointerDown={(e) => setSelectedCv(e, i)}
				>{name}</Link> */}
				<button onClick={(e) => setSelectedCv(e, i)}>{name}</button>
				<button data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
					Delete Cv
				</button>
			</div>
		</li>
	})

	return (
		<>

			<div>
				<h1>Your CVs: </h1>
				<ul>
					{renderCvs()}
				</ul>
			</div>
		</>
	);
};

export default CvList;
