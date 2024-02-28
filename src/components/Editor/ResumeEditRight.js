import React, { useContext } from 'react'
import EmploymentHistory from './EmploymentHistory'
import About from './About'
import KeySkills from './KeySkills'
import Projects from './Projects'
import { BuilderContext } from '../../App'

const ResumeEdit = () => {
  const ctx = useContext(BuilderContext)

  return (
    <>
      <div className='flex flex-col bg-white gap-2 px-2' >
        <div className={`border-t-gray-400 bg-${ctx.currentCvAbout ? 'blue-50' : "white"} rounded-2xl`} >
          <About />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvEmploymentInfo ? 'blue-50' : "white"} rounded-2xl`}>
          <EmploymentHistory />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvKeySkills ? 'blue-50' : "white"} rounded-2xl`}>
          <KeySkills />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvProjects ? 'blue-50' : "white"} rounded-2xl`}>
          <Projects />
        </div>

        {/* </div > */}
      </div >
    </>
  )
}

export default ResumeEdit
