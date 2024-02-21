import { useState, useEffect, useContext } from 'react'
import ToggleButton from './ToggleButton'
import TextInput from './TextInput'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import MoveUpDownLeft from './MoveUpDownLeft'
import Loading from "../Loading";
import { BuilderContext } from '../../App'

const Socials = () => {
  const ctx = useContext(BuilderContext)
  const [socials, setSocials] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Socials")

  useEffect(() => {
    const newSocials = ctx.getComponentData('Socials')
    setSocials(newSocials)
  }, [])

  useEffect(() => {
    const newSocials = ctx.getComponentData('Socials')
    setSocials(newSocials)
  }, [currentCv])

  const handleSocialChange = (type, property, value) => {
    const item = socials && socials.items.filter((item) => item.type === type)
    const targetIndex = socials && socials.items.indexOf(item[0])
    if (property === 'url') {
      // socials && socials.items.splice(targetIndex, 1, { ...item[0], url: value })
      const newSocials = { ...socials, items: [...socials.items.slice(0, targetIndex), { ...item[0], url: value }, ...socials.items.slice(targetIndex + 1)] }
      setSocials(newSocials)
      ctx.setCurrentCvSocials(newSocials)
    } else if (property === 'enabled') {
      // socials && socials.items.splice(targetIndex, 1, { ...item[0], enabled: value })
      const newSocials = { ...socials, items: [...socials.items.slice(0, targetIndex), { ...item[0], enabled: value }, ...socials.items.slice(targetIndex + 1)] }
      setSocials(newSocials)
      ctx.setCurrentCvSocials(newSocials)
    }
  }
  const handleSaveClick = () => {
    ctx.updateInfo(socials && socials)
    ctx.setCurrentCvSocials(null)
  }
  if (ctx.loadingSocials) {
    return <Loading />
  }
  return (
    <>
      <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'}`}>
        <h1 className='font-bold text-gray-400'>Socials:</h1>
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
              {socials && socials.items.map((item, index) => (
                <div className='flex flex-col pb-2' key={index}>
                  <a className=' text-gray-800 text-sm'>{item.type}</a>
                  <div className='flex flex-row gap-x-5'>
                    <TextInput
                      placeholder={`${item.type} url`}
                      defaultValue={item.url}
                      handleChange={(e) => {
                        handleSocialChange(item.type, 'url', e.target.value)
                      }}
                    />

                    <ToggleButton
                      name={item.type}
                      handleChange={handleSocialChange}
                      defaultValue={item.enabled}
                    />
                  </div>
                </div>
              ))}
              <div>
                <MoveUpDownLeft
                  moveLeftContentUp={moveLeftContentUp}
                  moveLeftContentDown={moveLeftContentDown}
                  index={index}
                />
              </div>
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
    </>
  )
}

export default Socials
