import React, { useState, useEffect, useContext } from "react";
//import { useParams, Link } from 'react-router-dom'
import ResumeEdit from '../components/Editor/ResumeEdit'
//import PreviewScreen from '../components/PDF/ResumeTemplate'
import PreviewScreen from './Preview/ResumeTemplate'
import CvList from './CvList'
import CreateCv from './CreateCv'
import { BuilderContext } from './../App'

const Dashboard = () => {
    //const { id } = useParams()
    const ctx = useContext(BuilderContext)
    //const allCvs = ctx.infoState
    // const [name, setName] = useState("")
    // const profile = ctx.getComponentData('Education')
    // const socials = ctx.getComponentData('Education')
    const id = ctx.getComponentData("id")
    // useEffect(() => {
    //     allCvs.filter((cv, i) => {
    //         if (i === +selected.id) {
    //             setName(cv['data']["items"][1]["name"])
    //         } else {
    //             return null
    //         }
    //     })

    // }, [])

    return (
        <>
            <div className="flex justify-evenly">
                {/* <Link className="btn" to='/'>
                    back home
                </Link> */}
                <CreateCv />
                {/* <div>
                    {`${name}'s cv`}
                </div> */}
            </div>
            <div className="flex justify-evenly">
                <div><CvList />
                    {id && <ResumeEdit />}
                </div>
                {id && <PreviewScreen />}
            </div>
        </>
    );
};

export default Dashboard;
