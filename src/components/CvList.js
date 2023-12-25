import React, { useContext } from "react";
//import { Link } from 'react-router-dom'
import CreateCv from './CreateCv'
import AuthContext from "../context/authContext";
import { BuilderContext } from './../App'

const CvList = () => {
	const ctx = useContext(BuilderContext)
	const { user } = useContext(AuthContext)
	const renderCvs = () => ctx.infoState.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const title = data["items"][1]["title"]
		//const name = data["items"][1]["name"]
		const cvId = ref["@ref"]["id"]
		return <li key={i}>
			<div className="flex px-4 justify-between">
				<button className="flex-none w-34 h-8" onClick={(e) => ctx.setSelectedCv(e, i)}>{title}</button>
				<button className="flex-none w-34 h-8" data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
					Delete Cv
				</button>
			</div>
		</li>
	})

	return (
		<>
			{user && (
				<>
					<div className="flex px-4 justify-between">
						<h1 className="flex-none w-34 h-8"><strong>Your CVs:</strong> </h1>
						<CreateCv />
					</div>
					<ul className="h-36 border-2 border-grey border-solid p-2 overflow-y-auto">
						{renderCvs()}
					</ul>
				</>
			)}
		</>
	);
};

export default CvList;
