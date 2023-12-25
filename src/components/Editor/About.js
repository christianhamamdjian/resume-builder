import { useState, useEffect, useContext } from 'react'
import { BuilderContext } from '../../App'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'

const About = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])

  const currentCv = ctx.cvSelected

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [])

  useEffect(() => {
    // console.log(currentCv)
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [currentCv])


  const handleChange = (e) => {
    setProfile({ ...profile, about: e.target.value })
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
      {/* <h1>About:</h1>
      <ToggleButton
        defaultValue={about.display}
        handleChange={(name, prop, isEnabled) => {
          ctx.updateInfo({ ...about, display: isEnabled })
        }}
      />
      {about.items.map((item, index) => (
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
      ))}*/}

      <ActionMenu
        handleSaveClick={handleSaveClick}
        onlySave={true}
      // handleAddClick={handleAddClick}
      // handleRemoveClick={handleRemoveClick}
      />
    </div>
  )
}

export default About
