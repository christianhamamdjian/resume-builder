import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import { EmploymentHistoryItem } from './EmploymentHistoryItem'
import Divider from './Divider'

const EmploymentHistory = ({ items }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvEmploymentInfo = ctx.currentCvEmploymentInfo
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div style={{ paddingTop: '20px' }}>
      <h3
        style={{
          color: '#000',
          fontSize: '1rem',
          fontWeight: "bold",
        }}
      >
        Employment History
      </h3>
      <Divider />
      {currentCvEmploymentInfo !== null ? currentCvEmploymentInfo.items.map((item, index) => (
        <EmploymentHistoryItem
          key={index}
          text={item.position}
          date={item.date}
          description={item.description}
          responsibilities={item.responsibilities}
        />
      ))
        : items.map((item, index) => (
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
