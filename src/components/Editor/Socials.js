import { useState, useEffect, useContext } from 'react'
import ToggleButton from './ToggleButton'
import TextInput from './TextInput'
import { BuilderContext } from './../../App'

const Socials = () => {
  const ctx = useContext(BuilderContext)
  const [socials, setSocials] = useState(null)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Contact")

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
    if (property === 'url')
      socials && socials.items.splice(targetIndex, 1, { ...item[0], url: value })
    else if (property === 'enabled') {
      socials && socials.items.splice(targetIndex, 1, { ...item[0], enabled: value })
    }
  }

  return (
    <>
      <div className='flex flex-col space-evenly  my-6  '>
        <h1>Socials:</h1>
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

        <button
          className=' w-20 py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
          onClick={() => ctx.updateInfo(socials && socials)}
        >
          Save
        </button>
      </div>
      <button onClick={() => moveLeftContentUp(index)}>↑</button>
      <button onClick={() => moveLeftContentDown(index)}>↓</button>
    </>
  )
}

export default Socials
