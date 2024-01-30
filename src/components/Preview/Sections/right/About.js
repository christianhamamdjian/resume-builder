import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import Divider from './Divider'
import MarkdownPreview from '../../../markdown-editor/MarkdownPreview'

const About = ({ text, title }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvAbout = ctx.currentCvAbout
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return <div>
    <h3
      style={{
        color: '#000',
        fontWeight: "bold",
        fontSize: '1rem',
      }}
    >
      {/* Professional Summary */}
      {currentCvAbout !== null ? currentCvAbout['title'] : title}
    </h3>
    <Divider />
    <MarkdownPreview markdown={currentCvAbout !== null ? currentCvAbout['text'] : text} />
    {/* <p style={{ ...styles[`main__text${template}`] }}>{currentCvProfile !== null ? currentCvProfile['about'] : text}</p> */}
  </div>
}
export default About
