import React, { useState, useEffect, useContext } from 'react'
import { BuilderContext } from './../../App'
import EmploymentItem from './EmploymentItem'
import ActionMenu from './ActionMenu'

const EmploymentHistory = () => {
  const ctx = useContext(BuilderContext)
  const [employmentInfo, setEmploymentInfo] = useState(null)

  const currentCv = ctx.cvSelected

  useEffect(() => {
    const newEmploymentInfo = ctx.getComponentData('Employment')
    setEmploymentInfo(newEmploymentInfo)
  }, [])

  useEffect(() => {
    const newEmploymentInfo = ctx.getComponentData('Employment')
    setEmploymentInfo(newEmploymentInfo)
  }, [currentCv])

  const newItem = {
    position: 'Software Engineering - University of Sydney',
    date: 'Mar 2017 - Dec 2019',
    description: '1',
    responsibilities: '',
  }
  const handleChange = (i, e) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...employmentInfo.items[i],
      [targetName]: e.target.value,
    }
    employmentInfo.items.splice(i, 1, modifiedItem)
  }
  return (
    <div>
      {employmentInfo && employmentInfo.items.map((item, index) => (
        <EmploymentItem
          key={index}
          index={index}
          data={item}
          handleChange={handleChange}
        />
      ))}

      <ActionMenu
        style='px-5'
        handleSaveClick={() => ctx.updateInfo(employmentInfo && employmentInfo, currentCv)}
        handleAddClick={() =>
          setEmploymentInfo({
            ...employmentInfo,
            items: [...employmentInfo.items, newItem],
          })
        }
        handleRemoveClick={() =>
          setEmploymentInfo({
            ...employmentInfo,
            items: employmentInfo.items.filter(
              (item, index) => index < employmentInfo.items.length - 1
            ),
          })
        }
      />
    </div>
  )
}

export default EmploymentHistory
