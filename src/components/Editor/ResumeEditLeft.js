import React, { useContext } from 'react'
import Education from './Education'
import Socials from './Socials'
import Skills from './Skills'
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
      <div className='flex flex-col gap-2 px-2'>
        <div className={`bg-${ctx.currentCvInfo ? 'blue-50' : "white"} rounded-2xl mt-2`}>
          <CvInfo />
        </div>
        <div className={`bg-${ctx.currentCvProfile ? 'blue-50' : "white"} rounded-2xl`}>
          <Profile />
        </div>
        <div className={`bg-${ctx.currentCvEducation ? 'blue-50' : "white"} rounded-2xl`}>
          <Education />
        </div>
        <div className={`bg-${ctx.currentCvSkills ? 'blue-50' : "white"} rounded-2xl`}>
          <Skills />
        </div>
        <div className={`bg-${ctx.currentCvContact ? 'blue-50' : "white"} rounded-2xl`}>
          <Contact />
        </div>
        <div className={`bg-${ctx.currentCvCertifications ? 'blue-50' : "white"} rounded-2xl`}>
          <Certifications />
        </div>
        <div className={`bg-${ctx.currentCvLanguages ? 'blue-50' : "white"} rounded-2xl`}>
          <Languages />
        </div>
        <div className={`bg-${ctx.currentCvSocials ? 'blue-50' : "white"} rounded-2xl`}>
          <Socials />
        </div>
      </div >
    </>
  )
}

export default ResumeEdit
