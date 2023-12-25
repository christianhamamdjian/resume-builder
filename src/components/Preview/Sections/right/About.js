import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import Divider from './Divider'

const About = ({ text }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  return <div>
    <h3
      style={{
        color: '#000',
        fontWeight: "bold",
        fontSize: '1rem',
      }}
    >
      Professional Summary
    </h3>
    <Divider />
    <p style={{ ...styles[`main__text${template}`] }}>{text}</p>
  </div>
}
export default About
