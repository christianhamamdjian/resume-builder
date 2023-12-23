import React, { useState, useEffect, useContext } from "react";
//import { useParams, Link } from 'react-router-dom'
import ResumeEdit from '../components/Editor/ResumeEdit'
//import PreviewScreen from '../components/PDF/ResumeTemplate'
import PreviewScreen from './Preview/ResumeTemplate'
import CvList from './CvList'
import { BuilderContext } from './../App'

const Dashboard = () => {

    const ctx = useContext(BuilderContext)
    const id = ctx.getComponentData("id")

    return (
        <>
            <div className="flex justify-evenly">
                <div className="flex-none">
                    <div>
                        <CvList />
                    </div>
                    {id && <ResumeEdit />}
                </div>
                {id && <PreviewScreen />}
            </div>
        </>
    );
};

export default Dashboard;
