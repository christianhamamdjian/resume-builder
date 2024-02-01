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
			key={i}
			className="flex px-2 py-2 justify-between bg-white"
		>
			<button className="flex-none w-34 h-8" onClick={(e) => ctx.handleSelectedCv(e, i)}>{title}</button>
			<div className="flex px-4 justify-between ml-auto gap-2">
				<button className='bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' data-id={cvId} onClick={(e) => ctx.duplicateCv(e, cv)}>
					Duplicate
				</button>
				<button className='bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' data-id={cvId} onClick={(e) => ctx.deleteCv(e)}>
					Delete
				</button>
			</div>
		</li>
	})

	return (
		<>
			{user && (
				<>
					<div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'flex flex-col justify-between border p-4 ' : 'border p-4 bg-white hover:bg-blue-50 cursor-pointer'}`}>
						<h2 className='font-bold text-gray-400'>Your documents: </h2>
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
								<ul className="flex flex-col h-36 border rounded-md border-grey bg-blue-50 gap-2 border-solid p-2 overflow-y-auto">
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
