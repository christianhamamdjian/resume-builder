import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import EducationItem from './EducationItem'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import MoveUpDownLeft from './MoveUpDownLeft'
import { BuilderContext } from './../../App'

const Education = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    degree: 'Software Engineering - University of Sydney',
    date: 'Mar 2017 - Dec 2019',
  }
  const [education, setEducation] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Contact")

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [])

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [currentCv])

  const handleChange = (e, i) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...education.items[i],
      [targetName]: e.target.value,
    }
    //education.items.splice(i, 1, modifiedItem)
    const newEducation = { ...education, items: [...education.items.slice(0, i), modifiedItem, ...education.items.slice(i + 1)] }
    setEducation(newEducation)
    ctx.setCurrentCvEducation(newEducation)
  }
  const handleAddClick = () => {
    setEducation({
      ...education,
      items: [...education.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setEducation({
      ...education,
      items: education.items.filter(
        (item, index) => index < education.items.length - 1
      ),
    })
  }
  const handleSaveClick = () => ctx.updateInfo(education && education, currentCv)

  return (
    <>
      <h1>Education:</h1>
      {!isToggled ? (
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
      )}
      {
        !isToggled && (
          <>

            {education && education.items.map((item, index) => (
              <EducationItem
                key={index}
                index={index}
                data={item}
                handleChange={handleChange}
              />
            ))}
            <MoveUpDownLeft
              moveLeftContentUp={moveLeftContentUp}
              moveLeftContentDown={moveLeftContentDown}
              index={index}
            />
            <ActionMenu
              handleSaveClick={handleSaveClick}
              handleAddClick={handleAddClick}
              handleRemoveClick={handleRemoveClick}
            />
          </>
        )
      }
    </>
  )
}

export default Education
