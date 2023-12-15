import { useState, useEffect, useContext } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import Upload from '../Upload'
import { BuilderContext } from './../../App'

const Profile = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])
  const [url, setUrl] = useState("")

  const currentCv = ctx.cvSelected
  const imageUrl = ctx.imageUrl

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [])

  useEffect(() => {
    const newUrl = ctx.imageUrl
    setProfile(prevProfile => ({ ...prevProfile, imageUrl: newUrl || imageUrl }))
  }, [imageUrl])

  useEffect(() => {
    // console.log(currentCv)
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
            setProfile({ ...profile, profileImageURL: url || e.target.value })
          }
          style='pb-3 pr-3'
          //defaultValue={profile && profile.profileImageURL}
          defaultValue={profile && url || profile.profileImageURL}

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
