import React, { useState, useContext } from "react";
//import { Link } from 'react-router-dom'
import CreateCv from './CreateCv'
import Hide from '../components/Editor/Icons/Hide'
import Show from '../components/Editor/Icons/Show'
import AuthContext from "../context/authContext";
import { BuilderContext } from './../App'

const CvList = () => {
	const ctx = useContext(BuilderContext)
	const { user } = useContext(AuthContext)
	const [isToggled, setIsToggled] = useState(true)

	const renderCvs = () => ctx.infoState.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const title = data["items"][1]["title"]
		const cvId = ref["@ref"]["id"]
		return <li key={i}>
			<div className="flex px-4 justify-between">
				<button className="flex-none w-34 h-8" onClick={(e) => ctx.handleSelectedCv(e, i)}>{title}</button>
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
					<div className="flex flex-col px-4 py-4 justify-between">
						<h1 className="flex-none w-34 h-8">Your documents: </h1>
						{!isToggled ? (
							<Hide
								handleClick={() => {
									setIsToggled(true)
								}}
							/>
						) : (
							<Show
								handleClick={() => {
									setIsToggled(!isToggled)
								}}
							/>
						)}
						{!isToggled && (
							<>
								<CreateCv />
								<ul className="h-36 border-2 border-grey border-solid p-2 overflow-y-auto">
									{renderCvs()}
								</ul>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default CvList;
