export const EmploymentHistoryItem = ({
  text,
  date,
  description,
  responsibilities,
}) => (
  <div style={{ paddingBottom: '20px' }}>
    <p
      style={{
        color: '#000',
        fontSize: '13',
      }}
    >
      {text}
    </p>
    <p style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
      {date}
    </p>
    <p style={{ fontSize: '11' }}>{description}</p>
    <p style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {responsibilities}
    </p>
  </div>
)
