import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
//import Suggestions from './Suggestions'
import MoveUpDownRight from './MoveUpDownRight'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'

import { BuilderContext } from '../../App'

const About = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("About")

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [])

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [currentCv])

  const handleChange = (e, id) => {
    setProfile({ ...profile, about: e.target.value })
    ctx.setCurrentCvProfile({ ...profile, about: e.target.value })
  }
  const handleStyleClick = (id, tag, index, parent) => {
    const start = document.getElementById(`${parent}-${id}-${index}`).selectionStart;
    const end = document.getElementById(`${parent}-${id}-${index}`).selectionEnd;
    const newText =
      profile['about'].substring(0, start) +
      `${tag}${profile['about'].substring(start, end)}${tag}` +
      profile['about'].substring(end);
    setProfile({ ...profile, about: newText })
    ctx.setCurrentCvProfile({ ...profile, about: newText })
  };
  const handleSaveClick = () => ctx.updateInfo(profile && profile, currentCv)
  return (
    <div>
      <h2>About:</h2>
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
          <MarkdownEditor
            id={'about'}
            parent={'about'}
            //markdown={markdowns['about'] || ''}
            markdown={profile && profile['about']}
            //onInputChange={handleInputChange}
            onInputChange={handleChange}
            onStyleClick={handleStyleClick}
          />
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
