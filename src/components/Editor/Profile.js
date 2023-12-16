import { useState, useEffect, useContext } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import Upload from '../Upload'
import { BuilderContext } from './../../App'

const Profile = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])

  const imageUrl = ctx.imageUrl
  const currentCv = ctx.cvSelected

  // console.log(profile)
  // console.log(imageUrl)

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [])

  useEffect(() => {
    setProfile(prevProfile => ({ ...prevProfile, profileImageURL: imageUrl }))
  }, [imageUrl])

  useEffect(() => {
    // 
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [currentCv])

  return (
    <div className='pb-11'>
      <h1>Profile:</h1>
      <TextArea
        placeholder='Full name'
        handleChange={(e) => setProfile({ ...profile, name: e.target.value })}
        style='pb-3'
        rows='2'
        defaultValue={profile.name}
      />

      <TextInput
        placeholder='Profession'
        handleChange={(e) =>
          setProfile({ ...profile, profession: e.target.value })
        }
        style='pb-3'
        defaultValue={profile.profession}
      />
      <div className='flex flex-row'>
        <TextInput
          placeholder='Profile Image Url'
          handleChange={(e) =>
            setProfile({ ...profile, profileImageURL: ctx.imageUrl || e.target.value })
          }
          style='pb-3 pr-3'
          //defaultValue={profile && profile.profileImageURL}
          defaultValue={profile && ctx.imageUrl || profile.profileImageURL}

        />
        <ToggleButton
          defaultValue={profile && profile.display}
          handleChange={(name, prop, isEnabled) => {
            ctx.updateInfo({ ...profile, display: isEnabled })
          }}
        />

      </div>
      <Upload />
      <button
        className='  py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
        onClick={() => ctx.updateInfo(profile && profile, currentCv)}
      >
        Save
      </button>
    </div>
  )
}

export default Profile
