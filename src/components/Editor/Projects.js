import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import { Hide } from './Icons/Hide'
import Show from './Icons/Show'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'
import { BuilderContext } from './../../App'

const Projects = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    name: 'Javascript Project',
    description: 'Some cool stuff',
  }
  const [projects, setProjects] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

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

  const handleChange = (e, id, i) => {
    const targetName = id
    const targetValue = e.target ? e.target.value : e
    const modifiedItem = {
      ...projects.items[i],
      [targetName]: targetValue,
    }
    const newProjects = { ...projects, items: [...projects.items.slice(0, i), modifiedItem, ...projects.items.slice(i + 1)] }
    setProjects(newProjects)
    ctx.setCurrentCvProjects(newProjects)
  }
  const handleStyleClick = (id, tag, index, parent) => {
    const start = document.getElementById(`${parent}-${id}-${index}`).selectionStart;
    const end = document.getElementById(`${parent}-${id}-${index}`).selectionEnd;
    const newText =
      projects.items[index][id].substring(0, start) +
      `${tag}${projects.items[index][id].substring(start, end)}${tag}` +
      projects.items[index][id].substring(end);
    handleChange(newText, id, index)
    console.log(newText, id, index)
  };
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
      {!isToggled && (
        <>
          {projects && projects.items.map((item, index) => (
            <div className='pb-5' key={index}>

              <TextInput
                defaultValue={item.name}
                placeholder='Project Name'
                style='pb-2'
                name='name'
                handleChange={(e) => handleChange(e, 'name', index)}
              />
              <MarkdownEditor
                id={'description'}
                parent={'projects'}
                index={index}
                //markdown={markdowns['about'] || ''}
                markdown={item.description}
                //onInputChange={handleInputChange}
                onInputChange={handleChange}
                onStyleClick={handleStyleClick}
              />
              {/* <TextArea
                name='description'
                defaultValue={item.description}
                placeholder='Description'
                handleChange={(e) => handleChange(index, e)}
              /> */}

            </div>
          ))}
        </>)}
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
