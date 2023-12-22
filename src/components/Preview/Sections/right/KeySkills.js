import Divider from './Divider'

const KeySkills = ({ skills }) => {
  return (
    <div style={{ pageBreakInside: "avoid" }}>
      {skills.display && (
        <div style={{ paddingTop: '10px' }}>
          <p
            style={{
              color: '#000',
              fontSize: '15',
            }}
          >
            {skills.header}
          </p>
          <Divider />
          <p style={{ fontSize: '11', marginTop: '4' }}>{skills.text}</p>
        </div>
      )}
    </div>
  )
}

export default KeySkills
