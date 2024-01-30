import { styles } from '../../../styles'
import About from './right/About'
import EmploymentHistory from './right/EmploymentHistory'
import { BuilderContext } from '../../../App'
import { useContext } from 'react'
import KeySkills from './right/KeySkills'
import Projects from './right/Projects'

export const Right = () => {
  const ctx = useContext(BuilderContext)
  const rightContentOrder = ctx.rightContentOrder
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const profile = ctx.getComponentData('Profile')
  const about = ctx.getComponentData('About')
  const skills = ctx.getComponentData('KeySkills')
  const employment = ctx.getComponentData('Employment')
  const projects = ctx.getComponentData('Projects')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  return (
    <div style={{ ...styles[`section__right${template}`] }}>
      {rightContentOrder.map((item, index) => {
        if (item === "About") {
          return (<About key={index} text={about && about.text} title={about && about.title} />)
        }
        if (item === "Employment History") {
          return (<EmploymentHistory key={index} items={employment && employment.items} />)
        }
        if (item === "Key Skills") {
          return (<KeySkills key={index} skills={skills && skills} />)
        }
        if (item === "Projects") {
          return (<Projects key={index} projects={projects && projects} />)
        }
      })}
    </div>
  )
}
