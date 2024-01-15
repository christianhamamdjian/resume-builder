import { useContext, useEffect, useState } from 'react'
import TextArea from './TextArea'
import ToggleButton from './ToggleButton'
import { BuilderContext } from './../../App'

const KeySkills = () => {
  const ctx = useContext(BuilderContext)
  const [skills, setSkills] = useState([])

  const currentCv = ctx.cvSelected
  const rightContentOrder = ctx.rightContentOrder
  const moveRightContentUp = ctx.moveRightContentUp
  const moveRightContentDown = ctx.moveRightContentDown
  const index = rightContentOrder.indexOf("Key Skills")

  useEffect(() => {
    const newSkills = ctx.getComponentData('KeySkills')
    setSkills(newSkills)
  }, [])

  useEffect(() => {
    const newSkills = ctx.getComponentData('KeySkills')
    setSkills(newSkills)
  }, [currentCv])

  const handleChange = (e) => {
    setSkills({ ...skills, text: e.target.value })
  }

  return (
    <>
      <TextArea
        placeholder='Key Skills'
        style='px-5 py-3'
        defaultValue={skills && skills.text}
        handleChange={handleChange}
      />
      <ToggleButton
        style='px-5 pb-2'
        defaultValue={skills && skills.display}
        handleChange={(name, prop, isEnabled) => {
          ctx.updateInfo({ ...skills, display: isEnabled })
        }}
      />
      <button onClick={() => moveRightContentUp(index)}>↑</button>
      <button onClick={() => moveRightContentDown(index)}>↓</button>
      <button
        className='mx-5 py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
        onClick={() => ctx.updateInfo(skills && skills)}
      >
        Save
      </button>
    </>
  )
}

export default KeySkills
