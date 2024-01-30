import { useState, useEffect, useContext } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import Upload from '../Upload'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import { BuilderContext } from './../../App'

const Profile = () => {
  const ctx = useContext(BuilderContext)
  const [profile, setProfile] = useState([])
  const [isToggled, setIsToggled] = useState(true)

  const imageUrl = ctx.imageUrl

  const currentCv = ctx.cvSelected

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [])

  useEffect(() => {
    setProfile(prevProfile => ({ ...prevProfile, profileImageURL: imageUrl }))
  }, [imageUrl])

  useEffect(() => {
    const newProfile = ctx.getComponentData('Profile')
    setProfile(newProfile)
  }, [currentCv])

  return (
    <>
      <h1>Profile:</h1>
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
      )
      }
      {
        !isToggled && (
          <>
            <h2>Full Name:</h2>
            <TextArea
              placeholder='Full name'
              handleChange={(e) => {
                setProfile({ ...profile, name: e.target.value })
                ctx.setCurrentCvProfile({ ...profile, name: e.target.value })
              }}
              style='pb-3'
              // style={{ fontSize: '16px', padding: '10px', backgroundColor: "#f2f2f2", border: "1px solid #ececec", borderRadius: "4px" }}
              rows='2'
              defaultValue={profile.name}
            />
            <h2>Profession:</h2>
            <TextInput
              placeholder='Profession'
              handleChange={(e) => {
                setProfile({ ...profile, profession: e.target.value })
                ctx.setCurrentCvProfile({ ...profile, profession: e.target.value })
              }}
              style='pb-3'
              defaultValue={profile.profession}
            />
            <h2>Image:</h2>
            <div className='flex flex-row'>
              <TextInput
                placeholder='Profile Image Url'
                handleChange={(e) => {
                  setProfile({ ...profile, profileImageURL: ctx.imageUrl || e.target.value })
                  ctx.setCurrentCvProfile({ ...profile, profileImageURL: ctx.imageUrl || e.target.value })
                }}
                style='pb-3 pr-3'
                //defaultValue={profile && profile.profileImageURL}
                defaultValue={profile && ctx.imageUrl || profile.profileImageURL}
              />
              <ToggleButton
                defaultValue={profile && profile.display}
                handleChange={(name, prop, isEnabled) => {
                  setProfile(prevProfile => ({ ...prevProfile, display: isEnabled }))
                  ctx.updateInfo({ ...profile, display: isEnabled })
                  ctx.setCurrentCvProfile({ ...profile, display: isEnabled })
                }}
              />
            </div>
            <Upload />
            <button
              className='  py-1 px-6 mt-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
              onClick={() => ctx.updateInfo(profile && profile)}
            >
              Save
            </button>
          </>
        )
      }
    </>
  )
}

export default Profile
