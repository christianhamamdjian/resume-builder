export const EmploymentHistoryItem = ({
  text,
  date,
  description,
  responsibilities,
}) => (
  <div style={{ paddingBottom: '20px' }}>
    <div
      style={{
        color: '#000',
        fontSize: '13',
      }}
    >
      {text}
    </div>
    <div style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
      {date}
    </div>
    <div style={{ fontSize: '11' }}>{description}</div>
    <div style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {responsibilities}
    </div>
  </div>
)
