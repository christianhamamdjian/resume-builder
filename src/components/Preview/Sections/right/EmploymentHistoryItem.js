import MarkdownPreview from '../../../markdown-editor/MarkdownPreview'

const EmploymentHistoryItem = ({
  text,
  date,
  description,
  responsibilities,
}) => {
  // console.log(description,
  //   responsibilities)
  return (
    <div style={{ paddingBottom: '20px' }}>
      <h4
        style={{
          color: '#000',
          fontSize: '.9rem',
          fontWeight: "bold",
        }}
      >
        {text}
      </h4>
      <p style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
        {date}
      </p>
      {/* <p style={{ fontSize: '11' }}>{description}</p> */}
      <MarkdownPreview markdown={description} />
      {/* <pre style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {responsibilities}
    </pre> */}
      <MarkdownPreview markdown={responsibilities} />
    </div>
  )
}
export default EmploymentHistoryItem