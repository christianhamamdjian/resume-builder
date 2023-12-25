import React, { useContext, useState, useEffect } from 'react'
import { BuilderContext } from './../../App'
import Education from './Education'
import Socials from './Socials'
import TextArea from './TextArea'
import TextSelect from './TextSelect'
import Skills from './Skills'
import EmploymentHistory from './EmploymentHistory'
import About from './About'
import KeySkills from './KeySkills'
import Projects from './Projects'
import CvInfo from './CvInfo'
import Profile from './Profile'
import Contact from './Contact'
import Certifications from './Certifications'
// import TemplateGallery from '../TemplateGallery'
const ResumeEdit = () => {
  const ctx = useContext(BuilderContext)
  const [selected, setSelect] = useState('Education')
  const [tabSelected, setTabSelected] = useState('About')
  const handleSelect = (e) => {
    setSelect(e.target.value)
  }
  // const profile = ctx.getComponentData('Profile')
  // // console.log(profile)

  // const handleChange = (e) => {
  //   ctx.updateInfo({ ...profile, about: e.target.value })
  // }
  // useEffect(() => {
  //   handleChange()
  // }, [])

  return (
    <>
      {/* <div className='flex flex-row bg-gray-50'> */}
      <div className='flex flex-row bg-white' >

        <div className='flex flex-col w-1/2'>
          {/* <h2>Template:</h2>
           <TemplateGallery /> */}
          <div className='border-gray-300 border p-4 '>
            <CvInfo /></div>
          <div className='border-gray-300 border p-4 '>
            <Profile /></div>
          {/* <TextSelect
            options={[
              'Education',
              'Skills',
              'Certifications',
              'Contact',
              'Socials',
            ]}
            handleChange={handleSelect}
            style=' pb-3'
          />

          {selected === 'Socials' && <Socials />}
          {selected === 'Education' && <Education />}
          {selected === 'Skills' && <Skills />}
          {selected === 'Contact' && <Contact />}
          {selected === 'Certifications' && <Certifications />} */}
          <div className='border-gray-300 border p-4 '>
            <Socials /></div>
          <div className='border-gray-300 border p-4 '>
            <Education /></div>
          <div className='border-gray-300 border p-4 '>
            <Skills /></div>
          <div className='border-gray-300 border p-4 '>
            <Contact /></div>
          <div className='border-gray-300 border p-4 '>
            <Certifications /></div>
        </div>

        <div className='flex flex-col w-1/2'>
          {/* <div className='mx-5 '>
        <ul className='flex cursor-pointer'>
          <li
            className={`py-2 mt-2  px-6  border-gray-300 border ${tabSelected === 'About'
              ? 'bg-white'
              : 'bg-gray-200 text-gray-600'
              } rounded-t-lg `}
            onClick={() => setTabSelected('About')}
          >
            About
          </li>
          <li
            className={`py-2 mt-2 px-6 border-gray-300 border ${tabSelected === 'Skills'
              ? 'bg-white'
              : 'bg-gray-200 text-gray-600'
              } rounded-t-lg 	`}
            onClick={() => setTabSelected('Skills')}
          >
            Skills
          </li>
          <li
            className={`py-2 mt-2 px-6 border-gray-300 border ${tabSelected === 'Projects'
              ? 'bg-white'
              : 'bg-gray-200 text-gray-600'
              } rounded-t-lg`}
            onClick={() => setTabSelected('Projects')}
          >
            Projects
          </li>
        </ul>
      </div> */}
          {/* {tabSelected === 'About' && (
            <TextArea
              placeholder='About'
              style='px-5 py-3'
              label='Profile'
              defaultValue={profile.about}
              handleChange={(e) => {
                handleChange(e)
              }}
            />
          )}
          {tabSelected === 'Skills' && <KeySkills />}
          {tabSelected === 'Projects' && <Projects />} */}
          {/* <h1>About</h1>
          <TextArea
            placeholder='About'
            style='px-5 py-3'
            label='Profile'
            defaultValue={profile.about}
            handleChange={(e) => {
              handleChange(e)
            }}
          /> */}
          <div className='border-gray-300 border p-4 '>
            <About />
          </div>
          <div className='border-gray-300 border p-4 '>
            <h2>Key Skills</h2>
            <KeySkills /></div>
          <div className='border-gray-300 border p-4 '>
            <h2>Projects</h2>
            <Projects /></div>
          <div className='border-gray-300 border p-4 '>
            <h2>Employment History</h2>
            <EmploymentHistory /></div>
        </div >
      </div >
    </>
  )
}

export default ResumeEdit
