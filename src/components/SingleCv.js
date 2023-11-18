import React, { useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import ResumeEdit from '../components/Editor/ResumeEdit'
import PreviewScreen from '../components/PDF/ResumeTemplate'
import { BuilderContext } from './../App'

const SingleCv = () => {
    const { id } = useParams()
    const ctx = useContext(BuilderContext)
    const profile = ctx.infoState

    return (
        <>
            <h1>Single Cv</h1>
            <Link to='/'>
                back home
            </Link>
            <ResumeEdit id={id} />
            <PreviewScreen />
        </>
    );
};

export default SingleCv;
