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

  return (
    <>
      {/* <div className='flex flex-row bg-white' > */}
      {/* <div className='flex flex-col w-1/2'> */}
      <div className='border-gray-300 border p-4 '>
        <CvInfo />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Profile />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Socials />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Education />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Skills />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Contact />
      </div>
      <div className='border-gray-300 border p-4 '>
        <Certifications />
      </div>
      {/* </div>
        <div className='flex flex-col w-1/2'> */}
      <div className='border-gray-300 border p-4 '>
        <About />
      </div>
      <div className='border-gray-300 border p-4 '>
        <h2>Key Skills</h2>
        <KeySkills />
      </div>
      <div className='border-gray-300 border p-4 '>
        <h2>Projects</h2>
        <Projects />
      </div>
      <div className='border-gray-300 border p-4 '>
        <h2>Employment History</h2>
        <EmploymentHistory />
      </div>
      {/* </div > */}
      {/* </div > */}
    </>
  )
}

export default ResumeEdit
