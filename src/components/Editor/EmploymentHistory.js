import React, { useState, useEffect, useContext } from 'react'
import { BuilderContext } from './../../App'
import EmploymentItem from './EmploymentItem'
import ActionMenu from './ActionMenu'

const EmploymentHistory = () => {
  const ctx = useContext(BuilderContext)
  const [employmentInfo, setEmploymentInfo] = useState(null)

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
  const handleChange = (i, e) => {
    const targetName = i
    const modifiedItem = {
      ...employmentInfo.items[i],
      [targetName]: e,
    }
    const newEmploymentInfo = {
      ...employmentInfo, items: [...employmentInfo.items.slice(0, i), modifiedItem, ...employmentInfo.items.slice(i + 1)]
    }
    setEmploymentInfo(newEmploymentInfo)
    ctx.setCurrentCvEmploymentInfo(newEmploymentInfo)
  }


  // const handleChange = (id, e) => {
  //   setProfile({ ...profile, about: e })
  //   ctx.setCurrentCvProfile({ ...profile, about: e })
  // }

  // const handleStyleClick = (id, tag) => {
  //   const start = document.getElementById(`markdownTextarea-${id}`).selectionStart;
  //   const end = document.getElementById(`markdownTextarea-${id}`).selectionEnd;
  //   const newText =
  //     profile['about'].substring(0, start) +
  //     `${tag}${profile['about'].substring(start, end)}${tag}` +
  //     profile['about'].substring(end);
  //   handleChange(id, newText)
  // };


  return (
    <div>
      {employmentInfo && employmentInfo.items.map((item, index) => (
        <EmploymentItem
          key={index}
          index={index}
          data={item}
          employmentInfo={employmentInfo}
          handleChange={handleChange}
        // handleStyleClick={handleStyleClick}
        />
      ))}
      <button onClick={() => moveRightContentUp(index)}>↑</button>
      <button onClick={() => moveRightContentDown(index)}>↓</button>
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
