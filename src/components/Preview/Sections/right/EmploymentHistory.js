import { EmploymentHistoryItem } from './EmploymentHistoryItem'
import Divider from './Divider'

const EmploymentHistory = ({ items }) => {
  return (
    <div style={{ paddingTop: '20px' }}>
      <div
        style={{
          color: '#000',
          fontSize: '15',
        }}
      >
        Employment History
      </div>
      <Divider />
      {items.map((item, index) => (
        <EmploymentHistoryItem
          key={index}
          text={item.position}
          date={item.date}
          description={item.description}
          responsibilities={item.responsibilities}
        />
      ))}
    </div>
  )
}

export default EmploymentHistory
