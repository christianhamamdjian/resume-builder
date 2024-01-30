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
        <div className='border-t-gray-400 border p-4 '>
          <CvInfo />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvProfile ? "#ffffff" : "#dddddd"}` }}>
          <Profile />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvEducation ? "#ffffff" : "#dddddd"}` }}>
          <Education />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvSkills ? "#ffffff" : "#dddddd"}` }}>
          <Skills />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvContact ? "#ffffff" : "#dddddd"}` }}>
          <Contact />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvCertifications ? "#ffffff" : "#dddddd"}` }}>
          <Certifications />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvLanguages ? "#ffffff" : "#dddddd"}` }}>
          <Languages />
        </div>
        <div className='border-t-gray-400 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvSocials ? "#ffffff" : "#dddddd"}` }}>
          <Socials />
        </div>

        {/* </div>
        <div className='flex flex-col w-1/2'> */}
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${ctx.currentCvAbout ? "#dddddd" : "#ffffff"}` }}>
          <About />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvEmploymentHistory ? "#ffffff" : "#dddddd"}` }}>
          <h2 className='font-bold'>Employment History</h2>
          <EmploymentHistory />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvKeySkills ? "#ffffff" : "#dddddd"}` }}>
          <h2 className='font-bold'>Key Skills</h2>
          <KeySkills />
        </div>
        <div className='border-t-gray-600 border p-4 ' style={{ backgroundColor: `${!ctx.currentCvProjects ? "#ffffff" : "#dddddd"}` }}>
          <h2 className='font-bold'>Projects</h2>
          <Projects />
        </div>

        {/* </div > */}
      </div >
    </>
  )
}

export default ResumeEdit
