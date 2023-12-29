import TextInput from './TextInput'
import { useState, useEffect, useContext } from 'react'
import { BuilderContext } from './../../App'
import ActionMenu from './ActionMenu'
import ToggleButton from './ToggleButton'

const Skills = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    text: 'Skill',
    level: 'Percent',
  }

  const [skills, setSkills] = useState(null)
  const currentCv = ctx.cvSelected
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
  const handleChange = (i, e) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...skills.items[i],
      [targetName]: e.target.value,
    }
    skills.items.splice(i, 1, modifiedItem)
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
  const handleSaveClick = () => ctx.updateInfo(skills && skills, currentCv)
  return (
    <div className='pt-10'>
      <h1>Skills:</h1>
      <ToggleButton
        defaultValue={skills && skills.display}
        handleChange={(name, prop, isEnabled) => {
          handleEnable(isEnabled)
        }}
      />
      {skills && skills.items.map((item, index) => (
        <div key={index} className='flex flex-row py-1'>
          <TextInput
            defaultValue={item.text}
            name='text'
            placeholder='Skill'
            index={index}
            handleChange={(e) => handleChange(index, e)}
          />
          <TextInput
            defaultValue={item.level}
            name='level'
            type='number'
            placeholder='%'
            style='w-1/3'
            index={index}
            handleChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}

      <ActionMenu
        handleSaveClick={handleSaveClick}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
      />
    </div>
  )
}

export default Skills
