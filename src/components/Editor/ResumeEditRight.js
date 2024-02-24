import React, { useContext } from 'react'
import Education from './Education'
import Socials from './Socials'
import Skills from './Skills'
import EmploymentHistory from './EmploymentHistory'
import About from './About'
import KeySkills from './KeySkills'
import Projects from './Projects'
import CvInfo from './CvInfo'
import Profile from './Profile'
import Contact from './Contact'
import Certifications from './Certifications'
import Languages from './Languages'
import { BuilderContext } from '../../App'

const ResumeEdit = () => {
  const ctx = useContext(BuilderContext)

  return (
    <>
      <div className='flex flex-col bg-white gap-2 px-2' >
        {/* <div className='flex flex-col w-1/2'> */}
        {/* <div className={`border-t-gray-400 bg-${ctx.currentCvInfo ? 'blue-50' : "white"}`}>
          <CvInfo />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvProfile ? 'blue-50' : "white"}`}>
          <Profile />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvEducation ? 'blue-50' : "white"}`}>
          <Education />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvSkills ? 'blue-50' : "white"}`}>
          <Skills />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvContact ? 'blue-50' : "white"}`}>
          <Contact />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvCertifications ? 'blue-50' : "white"}`}>
          <Certifications />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvLanguages ? 'blue-50' : "white"}`}>
          <Languages />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvSocials ? 'blue-50' : "white"}`}>
          <Socials />
        </div> */}

        {/* </div>
        <div className='flex flex-col w-1/2'> */}
        <div className={`border-t-gray-400 bg-${ctx.currentCvAbout ? 'blue-50' : "white"}`} >
          <About />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvEmploymentInfo ? 'blue-50' : "white"}`}>
          <EmploymentHistory />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvKeySkills ? 'blue-50' : "white"}`}>
          <KeySkills />
        </div>
        <div className={`border-t-gray-400 bg-${ctx.currentCvProjects ? 'blue-50' : "white"}`}>
          <Projects />
        </div>

        {/* </div > */}
      </div >
    </>
  )
}

export default ResumeEdit
