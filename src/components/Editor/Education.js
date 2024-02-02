import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import EducationItem from './EducationItem'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import TextInput from './TextInput'
import MoveUpDownLeft from './MoveUpDownLeft'
import Loading from "../Loading";
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
  const index = leftContentOrder && leftContentOrder.indexOf("Education")

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [])

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [currentCv])

  const handleChange = (e, i, title) => {
    if (title && title === "title") {
      setEducation({ ...education, title: e.target.value })
      ctx.setCurrentCvEducation({ ...education, title: e.target.value })
    } else {
      const targetName = e.target.name
      const modifiedItem = {
        ...education.items[i],
        [targetName]: e.target.value,
      }
      const newEducation = { ...education, items: [...education.items.slice(0, i), modifiedItem, ...education.items.slice(i + 1)] }
      setEducation(newEducation)
      ctx.setCurrentCvEducation(newEducation)
    }
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
  const handleSaveClick = () => {
    ctx.updateInfo(education && education, currentCv)
    ctx.setCurrentCvEducation(null)
  }
  if (ctx.loadingEducation) {
    return <Loading />
  }
  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'}`}>
      <h2 className='font-bold text-gray-400'>Education:</h2>
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
            <div className='flex flex-col gap-2 py-2'>
              <TextInput
                key={index}
                placeholder='Custom field'
                defaultValue={education && education['title']}
                handleChange={(e) => handleChange(e, index, "title")}
              />
              {education && education.items.map((item, index) => (
                <EducationItem
                  key={index}
                  index={index}
                  data={item}
                  handleChange={handleChange}
                />
              ))}
            </div>
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
    </div>
  )
}

export default Education
