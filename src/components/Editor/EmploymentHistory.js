import React, { useState, useEffect, useContext } from 'react'
import { BuilderContext } from './../../App'
import EmploymentItem from './EmploymentItem'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import TextInput from './TextInput'
import MoveUpDownRight from './MoveUpDownRight'
import ActionMenu from './ActionMenu'

const EmploymentHistory = () => {
  const ctx = useContext(BuilderContext)
  const [employmentInfo, setEmploymentInfo] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("Employment History")

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

  const handleChange = (e, id, i, title) => {
    if (title && title === "title") {
      setEmploymentInfo({ ...employmentInfo, title: e.target.value })
      ctx.setCurrentCvEmploymentInfo({ ...employmentInfo, title: e.target.value })
    } else {
      const targetName = id
      const targetValue = e.target ? e.target.value : e
      const modifiedItem = {
        ...employmentInfo.items[i],
        // [targetName]: e.target.value,
        [targetName]: targetValue,
      }
      const newEmploymentInfo = {
        ...employmentInfo, items: [...employmentInfo.items.slice(0, i), modifiedItem, ...employmentInfo.items.slice(i + 1)]
      }
      console.log(e)
      setEmploymentInfo(newEmploymentInfo)
      ctx.setCurrentCvEmploymentInfo(newEmploymentInfo)
    }
  }

  return (
    <div>
      {
        !isToggled ? (
          <Hide
            handleClick={() => {
              setIsToggled(true)
            }}
          />
        ) : (
          <Show
            handleClick={() => {
              setIsToggled(!isToggled)
            }}
          />
        )
      }
      {
        !isToggled && (
          <>
            <div className='flex flex-col gap-2 py-2'>
              <TextInput
                key={index}
                placeholder='Custom field'
                defaultValue={employmentInfo && employmentInfo['title']}
                handleChange={(e) => handleChange(e, index, "i", "title")}
              />
              {employmentInfo && employmentInfo.items.map((item, index) => (
                <EmploymentItem
                  key={index}
                  index={index}
                  data={item}
                  employmentInfo={employmentInfo}
                  handleChange={handleChange}
                //handleInputChange={handleInputChange}
                />
              ))}
            </div>
            <MoveUpDownRight
              moveRightContentUp={moveRightContentUp}
              moveRightContentDown={moveRightContentDown}
              index={index}
            />
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
          </>
        )
      }
    </div>
  )
}

export default EmploymentHistory
