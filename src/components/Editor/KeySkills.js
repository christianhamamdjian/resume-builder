import { useContext, useEffect, useState } from 'react'
import ToggleButton from './ToggleButton'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import TextInput from './TextInput'
import MoveUpDownRight from './MoveUpDownRight'
import { BuilderContext } from './../../App'

const KeySkills = () => {
  const ctx = useContext(BuilderContext)
  const [skills, setSkills] = useState([])
  const [isToggled, setIsToggled] = useState(true)
  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("Key Skills")

  useEffect(() => {
    const newSkills = ctx.getComponentData('KeySkills')
    setSkills(newSkills)
  }, [])

  useEffect(() => {
    const newSkills = ctx.getComponentData('KeySkills')
    setSkills(newSkills)
  }, [currentCv])

  const handleChange = (e, id, title) => {
    if (title && title === "title") {
      setSkills({ ...skills, title: e.target.value })
      ctx.setCurrentCvKeySkills({ ...skills, title: e.target.value })
    } else {
      setSkills({ ...skills, text: e.target.value })
      ctx.setCurrentCvKeySkills({ ...skills, text: e.target.value })
    }
  }
  const handleStyleClick = (id, tag, index, parent) => {
    const start = document.getElementById(`${parent}-${id}-${index}`).selectionStart;
    const end = document.getElementById(`${parent}-${id}-${index}`).selectionEnd;
    const newText =
      skills['text'].substring(0, start) +
      `${tag}${skills['text'].substring(start, end)}${tag}` +
      skills['text'].substring(end);
    setSkills({ ...skills, text: newText })
    ctx.setCurrentCvKeySkills({ ...skills, text: newText })
  };
  const handleSaveClick = () => {
    ctx.updateInfo(skills && skills)
    ctx.setCurrentCvKeySkills(null)
  }
  return (
    <>
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
          <div className='flex flex-col gap-2 py-2'>
            <TextInput
              key={index}
              placeholder='Custom field'
              defaultValue={skills && skills['title']}
              handleChange={(e) => handleChange(e, index, "title")}
            />
            <MarkdownEditor
              id={'skills'}
              parent={'keyskills'}
              markdown={skills && skills['text']}
              onInputChange={handleChange}
              onStyleClick={handleStyleClick}
            />
          </div>
          <ToggleButton
            style='px-5 pb-2'
            defaultValue={skills && skills.display}
            handleChange={(name, prop, isEnabled) => {
              ctx.updateInfo({ ...skills, display: isEnabled })
            }}
          />
          <MoveUpDownRight
            moveRightContentUp={moveRightContentUp}
            moveRightContentDown={moveRightContentDown}
            index={index}
          />
          <button
            className='mx-5 py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
            onClick={handleSaveClick}
          >
            Save
          </button>
        </>)
      }
    </>
  )
}

export default KeySkills
