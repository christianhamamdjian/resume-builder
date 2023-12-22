import React, { useState, useEffect, useContext } from "react";
//import { useParams, Link } from 'react-router-dom'
import ResumeEdit from '../components/Editor/ResumeEdit'
import PreviewScreen from '../components/Preview/ResumeTemplate'
import CvList from './CvList'
import CreateCv from './CreateCv'
import { BuilderContext } from './../App'

const SingleCv = () => {
    //const { id } = useParams()
    const ctx = useContext(BuilderContext)
    const allCvs = ctx.infoState

    const [name, setName] = useState("")
    const profile = ctx.getComponentData('Profile')
    const socials = ctx.getComponentData('Socials')

    useEffect(() => {
        allCvs.filter((cv, i) => {
            if (i === +cv.id) {
                setName(cv['data']["items"][1]["name"])
            } else {
                return null
            }
        })

    }, [profile])

    return (
        <>
            <div className="flex justify-evenly">
                {/* <Link className="btn" to='/'>
                    back home
                </Link> */}
                <CreateCv />
                <div>
                    {`${name}'s cv`}
                </div>
            </div>
            <div className="flex justify-evenly">
                <div><CvList />
                    {profile && <ResumeEdit />}
                </div>
                {socials && <PreviewScreen />}
            </div>
        </>
    );
};

export default SingleCv;
