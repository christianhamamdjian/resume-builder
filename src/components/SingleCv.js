import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import ResumeEdit from '../components/Editor/ResumeEdit'
import PreviewScreen from '../components/PDF/ResumeTemplate'
import { BuilderContext } from './../App'

const SingleCv = () => {
    const { id } = useParams()
    const ctx = useContext(BuilderContext)
    const allCvs = ctx.infoState
    // const { setInfoSelected } = ctx

    const [name, setName] = useState("")
    const profile = ctx.getComponentData('Profile')
    const socials = ctx.getComponentData('Socials')
    useEffect(() => {
        allCvs.filter((cv, i) => {
            if (i === +id) {
                setName(cv['data']["items"][1]["name"])
                console.log(cv['data']["items"])
                // setInfoSelected(() => {
                //     const newInfo = { ...cv['data']["items"] };
                //     // do stuff with newCart
                //     return newInfo;
                // });
                // setInfoSelected(cv['data']["items"])
            } else {
                return null
            }
        })

    }, [])

    return (
        <>
            <h1>Single Cv</h1>
            <Link to='/'>
                back home
            </Link>
            {name}
            {profile && <ResumeEdit />}
            {socials && <PreviewScreen />}
        </>
    );
};

export default SingleCv;
