import React, { useContext } from "react";
import ResumeEditLeft from './Editor/ResumeEditLeft'
import ResumeEditRight from './Editor/ResumeEditRight'
import PreviewScreen from './Preview/ResumeTemplate'
import CvList from './CvList'
import { BuilderContext } from '../App'

const Dashboard = () => {

    const ctx = useContext(BuilderContext)
    const id = ctx.getComponentData("id")

    return (
        <>
            <div className="flex justify-evenly flex-wrap">
                <div className="flex flex-col bg-white sm:w-full md:w-full lg:w-1/4 bg-white'">
                    <div>
                        <CvList />
                    </div>
                    {ctx.infoState && ctx.infoState.length > 0 && id && <ResumeEditLeft />}
                </div>
                <div className="flex flex-col bg-white sm:w-full md:w-full lg:w-1/2 bg-white'">
                    {ctx.infoState && ctx.infoState.length > 0 && id && <PreviewScreen />}
                </div>
                <div className="flex flex-col bg-white sm:w-full md:w-full lg:w-1/4 bg-white'">
                    {ctx.infoState && ctx.infoState.length > 0 && id && <ResumeEditRight />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
