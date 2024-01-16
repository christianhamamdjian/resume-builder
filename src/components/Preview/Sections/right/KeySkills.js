import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import Divider from './Divider'

const KeySkills = ({ skills }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvKeySkills = ctx.currentCvKeySkills
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div style={{ pageBreakInside: "avoid" }}>
      {skills.display && (
        <div style={{ paddingTop: '10px' }}>
          <h3
            style={{
              color: '#000',
              fontSize: '1rem',
              fontWeight: "bold",
            }}
          >
            {skills.header}
          </h3>
          <Divider />
          {/* <pre style={{ fontSize: '11', marginTop: '4' }}>{skills.text}</pre> */}
          <pre style={{ ...styles[`main__text${template}`], fontSize: '11', marginTop: '4' }}>{currentCvKeySkills !== null ? currentCvKeySkills.text : skills.text}</pre>
        </div>
      )}
    </div>
  )
}

export default KeySkills
