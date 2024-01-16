import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import { BuilderContext } from './../../App'

const Projects = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    name: 'Javascript Project',
    description: 'Some cool stuff',
  }
  const [projects, setProjects] = useState(null)

  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("Projects")

  useEffect(() => {
    const newProjects = ctx.getComponentData('Projects')
    setProjects(newProjects)
  }, [])

  useEffect(() => {
    const newProjects = ctx.getComponentData('Projects')
    setProjects(newProjects)
  }, [currentCv])

  const handleChange = (i, e) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...projects.items[i],
      [targetName]: e.target.value,
    }
    projects.items.splice(i, 1, modifiedItem)
    ctx.setCurrentCvProjects(projects)
  }
  const handleAddClick = () => {
    setProjects({
      ...projects,
      items: [...projects.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setProjects({
      ...projects,
      items: projects.items.filter(
        (item, index) => index < projects.items.length - 1
      ),
    })
  }

  const handleSaveClick = () => ctx.updateInfo(projects && projects)

  return (
    <div className='pt-3 px-5 '>
      {projects && projects.items.map((item, index) => (
        <div className='pb-5' key={index}>
          <TextInput
            defaultValue={item.name}
            placeholder='Project Name'
            style='pb-2'
            name='name'
            handleChange={(e) => handleChange(index, e)}
          />

          <TextArea
            name='description'
            defaultValue={item.description}
            placeholder='Description'
            handleChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <ToggleButton
        defaultValue={projects && projects.display}
        handleChange={(name, prop, isEnabled) => {
          ctx.updateInfo({ ...projects, display: isEnabled })
        }}
      />

      <button onClick={() => moveRightContentUp(index)}>↑</button>
      <button onClick={() => moveRightContentDown(index)}>↓</button>
      <ActionMenu
        handleSaveClick={handleSaveClick}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
      />
    </div>
  )
}

export default Projects
