import Divider from './Divider'

const KeySkills = ({ skills }) => {
  return (
    <div>
      {skills.display && (
        <div style={{ paddingTop: '10px' }}>
          <div
            style={{
              color: '#000',
              fontSize: '15',
            }}
          >
            {skills.header}
          </div>
          <Divider />
          <div style={{ fontSize: '11', marginTop: '4' }}>{skills.text}</div>
        </div>
      )}
    </div>
  )
}

export default KeySkills
