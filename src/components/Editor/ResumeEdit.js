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
import { BuilderContext } from './../../App'

const ResumeEdit = () => {
  const ctx = useContext(BuilderContext)

  return (
    <>
      <div className='flex flex-col bg-white' >
        {/* <div className='flex flex-col w-1/2'> */}
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvInfo ? "#dddddd" : "#ffffff"}` }}>
          <CvInfo />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvProfile ? "#dddddd" : "#ffffff"}` }}>
          <Profile />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvEducation ? "#dddddd" : "#ffffff"}` }}>
          <Education />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvSkills ? "#dddddd" : "#ffffff"}` }}>
          <Skills />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvContact ? "#dddddd" : "#ffffff"}` }}>
          <Contact />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvCertifications ? "#dddddd" : "#ffffff"}` }}>
          <Certifications />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvLanguages ? "#dddddd" : "#ffffff"}` }}>
          <Languages />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${ctx.currentCvSocials ? "#dddddd" : "#ffffff"}` }}>
          <Socials />
        </div>

        {/* </div>
        <div className='flex flex-col w-1/2'> */}
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${ctx.currentCvAbout ? "#dddddd" : "#ffffff"}` }}>
          <About />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${ctx.currentCvEmploymentInfo ? "#dddddd" : "#ffffff"}` }}>
          <h2 className='font-bold'>Employment History</h2>
          <EmploymentHistory />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${ctx.currentCvKeySkills ? "#dddddd" : "#ffffff"}` }}>
          <h2 className='font-bold'>Key Skills</h2>
          <KeySkills />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${ctx.currentCvProjects ? "#dddddd" : "#ffffff"}` }}>
          <h2 className='font-bold'>Projects</h2>
          <Projects />
        </div>

        {/* </div > */}
      </div >
    </>
  )
}

export default ResumeEdit
