import { useState, useEffect, useContext } from 'react'
import TextArea from './TextArea'
import TextInput from './TextInput'
import ToggleButton from './ToggleButton'
import Upload from '../Upload'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import Loading from "../Loading";
import { BuilderContext } from '../../App'

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
  const handleSaveClick = () => {
    ctx.updateInfo(profile && profile)
    ctx.setCurrentCvProfile(null)
  }
  if (ctx.loadingProfile) {
    return <Loading />
  }
  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'} rounded-2xl`}>
      <h2 className='font-bold text-gray-400'>Profile:</h2>
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
                  // ctx.updateInfo({ ...profile, display: isEnabled })
                  ctx.setCurrentCvProfile({ ...profile, display: isEnabled })
                }}
              />
            </div>
            <Upload />
            <button
              className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSaveClick}
            >
              Save
            </button>
          </>
        )
      }
    </div>
  )
}

export default Profile
