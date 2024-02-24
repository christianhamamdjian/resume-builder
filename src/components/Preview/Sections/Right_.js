import React, { useState, useEffect, useContext } from 'react'
import { styles } from '../../../styles'
import About from './right/About'
import EmploymentHistory from './right/EmploymentHistory'
import { BuilderContext } from '../../../App'
import KeySkills from './right/KeySkills'
import Projects from './right/Projects'

export const Right = () => {
  const ctx = useContext(BuilderContext)
  const rightContentOrder = ctx.rightContentOrder
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const getProfile = ctx.getComponentData('Profile')
  const currentCvProfile = ctx.currentCvProfile
  const about = ctx.getComponentData('About')
  const skills = ctx.getComponentData('KeySkills')
  const employment = ctx.getComponentData('Employment')
  const projects = ctx.getComponentData('Projects')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  const [profile, setProfile] = useState([])
  useEffect(() => {
    const newProfile = getProfile
    setProfile(newProfile)
  }, [getProfile])


  return (
    <div style={{ ...styles[`section__right${template}`] }}>
      <h1 style={{ fontSize: "2rem" }}>{currentCvProfile !== null ? currentCvProfile.name : profile.name}</h1>
      <h2 style={{ fontSize: "1.2rem" }}>{currentCvProfile !== null ? currentCvProfile.profession : profile.profession}</h2>
      <div
        style={{
          width: '50%',
          height: '1px',
          // backgroundColor: '#000',
          textAlign: 'center',
          marginBottom: "1rem"
        }}
      />
      {rightContentOrder.map((item, index) => {
        if (item === "About") {
          return (<About key={index} text={about && about.text} title={about && about.title} />)
        }
        if (item === "Employment History") {
          return (<EmploymentHistory key={index} items={employment && employment.items} title={employment && employment.title} />)
        }
        if (item === "Key Skills") {
          return (<KeySkills key={index} skills={skills && skills} title={skills && skills.title} />)
        }
        if (item === "Projects") {
          return (<Projects key={index} projects={projects && projects} title={projects && projects.title} />)
        }
      })}
    </div>
  )
}
