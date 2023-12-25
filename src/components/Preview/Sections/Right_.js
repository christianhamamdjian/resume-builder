import { styles } from '../../../styles'
import About from './right/About'
import EmploymentHistory from './right/EmploymentHistory'
import { BuilderContext } from '../../../App'
import { useContext } from 'react'
import KeySkills from './right/KeySkills'
import Projects from './right/Projects'

export const Right = () => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const profile = ctx.getComponentData('Profile')
  const skills = ctx.getComponentData('KeySkills')
  const employment = ctx.getComponentData('Employment')
  const projects = ctx.getComponentData('Projects')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  console.log(template)
  return (
    <div style={{ ...styles[`section__right${template}`] }}>
      <About text={profile && profile.about} />
      <EmploymentHistory items={employment && employment.items} />
      <KeySkills skills={skills && skills} />
      <Projects projects={projects && projects} />
    </div>
  )
}
