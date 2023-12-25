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
