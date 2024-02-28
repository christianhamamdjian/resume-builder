import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import Divider from './Divider'
import MarkdownPreview from '../../../markdown-editor/MarkdownPreview'

const KeySkills = ({ skills, title }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvKeySkills = ctx.currentCvKeySkills
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div style={{ pageBreakInside: "avoid" }}>
      {currentCvKeySkills !== null && currentCvKeySkills.display && <div style={{ paddingTop: '10px' }}>
        <h3
          style={{
            color: '#000',
            fontSize: '1rem',
            fontWeight: "bold",
          }}
        >
          {currentCvKeySkills['title']}
        </h3>
        <Divider />
        <MarkdownPreview markdown={currentCvKeySkills.text} />
      </div>}
      {currentCvKeySkills === null && skills.display && (
        <div style={{ paddingTop: '10px' }}>
          <h3
            style={{
              color: '#000',
              fontSize: '1rem',
              fontWeight: "bold",
            }}
          >
            {title}
          </h3>
          <Divider />
          <MarkdownPreview markdown={skills.text} />
        </div>
      )}
    </div>
  )
}

export default KeySkills
