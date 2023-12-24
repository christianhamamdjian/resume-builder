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
      <div className='flex flex-row bg-white'>

        <div className='flex flex-col w-1/2 px-5 py-16'>
          {/* <h2>Template:</h2>
           <TemplateGallery /> */}
          <CvInfo />
          <Profile />
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

          <Socials />
          <Education />
          <Skills />
          <Contact />
          <Certifications />
        </div>

        <div className='w-full'>
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
          <About />
          <h1>Key Skills</h1>
          <KeySkills />
          <h1>Projects</h1>
          <Projects />
          <h1>Employment History</h1>
          <EmploymentHistory />
        </div>
      </div>
    </>
  )
}

export default ResumeEdit
