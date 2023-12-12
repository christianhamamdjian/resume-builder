import { useState, useContext } from 'react'
import { BuilderContext } from '../../App'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'

const About = () => {
  const ctx = useContext(BuilderContext)
  const profile = ctx.getComponentData('Profile')
  const [about, setAbout] = useState(ctx.getComponentData('About'))
  const handleChange = (e) => {
    setAbout({ ...profile, about: e.target.value })
  }

  const handleSaveClick = () => ctx.updateInfo(about)
  return (
    <div className='pt-10'>
      <h1>About:</h1>
      <TextArea
        placeholder='About'
        style='px-5 py-3'
        label='Profile'
        defaultValue={profile.about}
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
