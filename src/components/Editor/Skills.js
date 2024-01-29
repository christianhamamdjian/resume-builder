import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import ActionMenu from './ActionMenu'
import ToggleButton from './ToggleButton'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import { BuilderContext } from './../../App'

const Skills = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    text: 'Skill',
    level: 'Percent',
  }
  const [skills, setSkills] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Contact")

  useEffect(() => {
    const newSkills = ctx.getComponentData('Skills')
    setSkills(newSkills)
  }, [])

  useEffect(() => {
    const newSkills = ctx.getComponentData('Skills')
    setSkills(newSkills)
  }, [currentCv])

  const handleEnable = (isEnabled) => {
    setSkills({ ...skills, display: isEnabled })
  }
  const handleChange = (e, i) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...skills.items[i],
      [targetName]: e.target.value,
    }
    // skills.items.splice(i, 1, modifiedItem)
    const newSkills = { ...skills, items: [...skills.items.slice(0, i), modifiedItem, ...skills.items.slice(i + 1)] }
    setSkills(newSkills)
    ctx.setCurrentCvSkills(newSkills)

  }
  const handleAddClick = () => {
    setSkills({
      ...skills,
      items: [...skills.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setSkills({
      ...skills,
      items: skills.items.filter(
        (item, index) => index < skills.items.length - 1
      ),
    })
  }

  const handleSaveClick = () => ctx.updateInfo(skills && skills)

  return (
    <>
      <h1>Skills:</h1>
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
      )
      }
      {
        !isToggled && (
          <>
            <ToggleButton
              defaultValue={skills && skills.display}
              // value={skills && skills.display}
              handleChange={(name, prop, isEnabled) => {
                handleEnable(isEnabled)
              }}
            />
            {skills && skills.items.map((item, index) => (
              <div key={index} className='flex flex-row py-1'>
                <TextInput
                  defaultValue={item && item.text}
                  // value={item && item.text}
                  name='text'
                  placeholder='Skill'
                  index={index}
                  handleChange={(e) => handleChange(e, index)}
                />
                <TextInput
                  defaultValue={item && item.level}
                  // value={item && item.level}
                  name='level'
                  type='number'
                  placeholder='%'
                  style='w-1/3'
                  index={index}
                  handleChange={(e) => handleChange(e, index)}
                />
              </div>
            ))}
            <button onClick={() => moveLeftContentUp(index)}>↑</button>
            <button onClick={() => moveLeftContentDown(index)}>↓</button>
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

export default Skills
