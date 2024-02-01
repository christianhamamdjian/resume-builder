import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
//import Suggestions from './Suggestions'
import TextInput from './TextInput'
import MoveUpDownRight from './MoveUpDownRight'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'

import { BuilderContext } from '../../App'

const About = () => {
  const ctx = useContext(BuilderContext)
  const [about, setAbout] = useState([])
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("About")

  useEffect(() => {
    const newAbout = ctx.getComponentData('About')
    setAbout(newAbout)
  }, [])

  useEffect(() => {
    const newAbout = ctx.getComponentData('About')
    setAbout(newAbout)
  }, [currentCv])

  const handleChange = (e, id, title) => {
    if (title && title === "title") {
      setAbout({ ...about, title: e.target.value })
      ctx.setCurrentCvAbout({ ...about, title: e.target.value })
    } else {
      setAbout({ ...about, text: e.target.value })
      ctx.setCurrentCvAbout({ ...about, text: e.target.value })
    }
  }
  const handleStyleClick = (id, tag, index, parent) => {
    const start = document.getElementById(`${parent}-${id}-${index}`).selectionStart;
    const end = document.getElementById(`${parent}-${id}-${index}`).selectionEnd;
    const newText =
      about['text'].substring(0, start) +
      `${tag}${about['text'].substring(start, end)}${tag}` +
      about['text'].substring(end);
    setAbout({ ...about, text: newText })
    ctx.setCurrentCvAbout({ ...about, text: newText })
  };
  const handleSaveClick = () => {
    ctx.updateInfo(about && about, currentCv)
    ctx.setCurrentCvAbout(null)
  }
  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'}`}>
      <h2 className='font-bold text-gray-400'>About:</h2>
      {/* <Suggestions /> */}
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
              defaultValue={about && about['title']}
              handleChange={(e) => handleChange(e, index, "title")}
            />
            <MarkdownEditor
              id={'about'}
              parent={'about'}
              //markdown={markdowns['about'] || ''}
              markdown={about && about['text']}
              //onInputChange={handleInputChange}
              onInputChange={handleChange}
              onStyleClick={handleStyleClick}
            />
          </div>
          <MoveUpDownRight
            moveRightContentUp={moveRightContentUp}
            moveRightContentDown={moveRightContentDown}
            index={index}
          />
          <ActionMenu
            handleSaveClick={handleSaveClick}
            onlySave={true}
          />
        </>
      )
      }
    </div>
  )
}

export default About
