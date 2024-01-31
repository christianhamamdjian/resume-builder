import React, { useContext } from "react";
import ResumeEdit from '../components/Editor/ResumeEdit'
import PreviewScreen from './Preview/ResumeTemplate'
import CvList from './CvList'
import { BuilderContext } from './../App'

const Dashboard = () => {

    const ctx = useContext(BuilderContext)
    const id = ctx.getComponentData("id")

    return (
        <>
            <div className="flex justify-evenly wrap">
                <div className="flex flex-col w-1/2 bg-white'">
                    <div>
                        <CvList />
                    </div>
                    {ctx.infoState && ctx.infoState.length > 0 && id && <ResumeEdit />}
                </div>
                <div className="flex flex-col w-2/3 bg-white'">
                    {ctx.infoState && ctx.infoState.length > 0 && id && <PreviewScreen />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
