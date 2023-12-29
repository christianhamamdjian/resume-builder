import React, { useMemo } from 'react'
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

const ResumeEdit = () => {
  const memoizedProfile = useMemo(() => <Profile />, []);
  const memoizedSocials = useMemo(() => <Socials />, []);
  const memoizedEducation = useMemo(() => <Education />, []);
  const memoizedSkills = useMemo(() => <Skills />, []);
  const memoizedContact = useMemo(() => <Contact />, []);
  const memoizedCertifications = useMemo(() => <Certifications />, []);
  const memoizedAbout = useMemo(() => <About />, []);
  const memoizedKeySkills = useMemo(() => <KeySkills />, []);
  const memoizedProjects = useMemo(() => <Projects />, []);
  const memoizedEmploymentHistory = useMemo(() => <EmploymentHistory />, []);
  return (
    <>
      <div className='flex flex-row bg-white' >
        <div className='flex flex-col w-1/2'>
          <div className='border-gray-300 border p-4 '>
            <CvInfo /></div>
          <div className='border-gray-300 border p-4 '>
            {memoizedProfile}</div>
          <div className='border-gray-300 border p-4 '>
            {memoizedSocials}</div>
          <div className='border-gray-300 border p-4 '>
            {memoizedEducation}</div>
          <div className='border-gray-300 border p-4 '>
            {memoizedSkills}</div>
          <div className='border-gray-300 border p-4 '>
            {memoizedContact}</div>
          <div className='border-gray-300 border p-4 '>
            {memoizedCertifications}</div>
        </div>
        <div className='flex flex-col w-1/2'>
          <div className='border-gray-300 border p-4 '>
            {memoizedAbout}
          </div>
          <div className='border-gray-300 border p-4 '>
            <h2>Key Skills</h2>
            {memoizedKeySkills}</div>
          <div className='border-gray-300 border p-4 '>
            <h2>Projects</h2>
            {memoizedProjects}</div>
          <div className='border-gray-300 border p-4 '>
            <h2>Employment History</h2>
            {memoizedEmploymentHistory}</div>
        </div >
      </div >
    </>
  )
}

export default ResumeEdit
