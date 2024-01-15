import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'
import { BuilderContext } from '../../App'

const About = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])

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


  const handleChange = (e) => {
    setProfile({ ...profile, about: e.target.value })
    ctx.setCurrentCvProfile({ ...profile, about: e.target.value })
  }

  const handleSaveClick = () => ctx.updateInfo(profile && profile, currentCv)
  return (
    <div>
      <h2>About:</h2>
      <TextArea
        placeholder='About'
        style='px-5 py-3'
        label='Profile'
        defaultValue={profile && profile.about}
        handleChange={(e) => {
          handleChange(e)
        }}
      />
      <button onClick={() => moveRightContentUp(index)}>↑</button>
      <button onClick={() => moveRightContentDown(index)}>↓</button>
      <ActionMenu
        handleSaveClick={handleSaveClick}
        onlySave={true}
      />
    </div>
  )
}

export default About
