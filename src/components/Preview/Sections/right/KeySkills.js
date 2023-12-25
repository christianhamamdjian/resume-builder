import React from 'react'
import Divider from './Divider'

const KeySkills = ({ skills }) => {
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
          <pre style={{ fontSize: '11', marginTop: '4' }}>{skills.text}</pre>
        </div>
      )}
    </div>
  )
}

export default KeySkills
