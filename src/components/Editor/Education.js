import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import EducationItem from './EducationItem'
import { BuilderContext } from './../../App'

const Education = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    degree: 'Software Engineering - University of Sydney',
    date: 'Mar 2017 - Dec 2019',
  }
  const [education, setEducation] = useState(null)

  const currentCv = ctx.cvSelected

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [])

  useEffect(() => {
    const newEducation = ctx.getComponentData('Education')
    setEducation(newEducation)
  }, [currentCv])

  const handleChange = (i, e) => {
    const targetName = e.target.name
    console.log(targetName, e.target.value)
    const modifiedItem = {
      ...education.items[i],
      [targetName]: e.target.value,
    }
    education.items.splice(i, 1, modifiedItem)
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
    <div className='pt-6'>
      <h1>Education:</h1>
      {education && education.items.map((item, index) => (
        <EducationItem
          key={index}
          index={index}
          data={item}
          handleChange={handleChange}
        />
      ))}
      <ActionMenu
        handleSaveClick={handleSaveClick}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
      />
    </div>
  )
}

export default Education
