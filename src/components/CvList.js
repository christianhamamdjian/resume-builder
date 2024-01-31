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
	const [isToggled, setIsToggled] = useState(ctx.infoState.length === 0 ? false : true)

	const renderCvs = () => ctx.infoState.map((cv, i) => {
		const { data } = cv
		const { ref } = cv
		const title = data["items"][1]["title"]
		const cvId = ref["@ref"]["id"]
		return <li
			//style={{ border: "1px solid #dddddd" }} 
			key={i}
		>
			<div className="flex px-2 justify-between">
				<button className="flex-none w-34 h-8" onClick={(e) => ctx.handleSelectedCv(e, i)}>{title}</button>
				<div className="flex px-4 justify-between ml-auto gap-2">
					<button className="flex-none w-34 h-8 border border-solid border-gray px-2" data-id={cvId} onClick={(e) => ctx.duplicateCv(e, cv)}>
						Duplicate
					</button>
					<button className="flex-none w-34 h-8 border border-solid border-gray px-2" data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
						Delete
					</button>
				</div>
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
								<ul className="flex flex-col h-36 border-2 border-grey gap-2 border-solid p-2 overflow-y-auto">
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
