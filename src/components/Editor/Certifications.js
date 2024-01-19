import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'
import TextInput from './TextInput'
import { BuilderContext } from './../../App'

const Certifications = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    name: '',
    date: '',
  }
  const [certification, setCertification] = useState(null)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Contact")

  useEffect(() => {
    const newCetification = ctx.getComponentData('Certifications')
    setCertification(newCetification)
  }, [])

  useEffect(() => {
    const newCetification = ctx.getComponentData('Certifications')
    setCertification(newCetification)
  }, [currentCv])

  const handleChange = (i, e) => {
    const targetName = e.target.name
    const modifiedItem = {
      ...certification.items[i],
      [targetName]: e.target.value,
    }
    //certification.items.splice(i, 1, modifiedItem)
    const newCertification = { ...certification, items: [...certification.items.slice(0, i), modifiedItem, ...certification.items.slice(i + 1)] }
    setCertification(newCertification)
    ctx.setCurrentCvCertifications(newCertification)
  }
  const handleAddClick = () => {
    setCertification({
      ...certification,
      items: [...certification.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setCertification({
      ...certification,
      items: certification.items.filter(
        (item, index) => index < certification.items.length - 1
      ),
    })
  }
  const handleSaveClick = () => ctx.updateInfo(certification && certification, currentCv)

  return (
    <div className='pt-6'>
      <h1>Certifications:</h1>
      {certification && certification.items.map((item, index) => (
        <div key={index}>
          <TextArea
            placeholder='Certification Type'
            rows='2'
            style='pb-2'
            name='name'
            defaultValue={item.name}
            handleChange={(e) => handleChange(index, e)}
          />

          <TextInput
            placeholder='Date '
            name='date'
            style='pb-2'
            defaultValue={item.date}
            handleChange={(e) => handleChange(index, e)}
          />
        </div>
      ))}
      <button onClick={() => moveLeftContentUp(index)}>↑</button>
      <button onClick={() => moveLeftContentDown(index)}>↓</button>
      <ActionMenu
        handleSaveClick={handleSaveClick}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
      />
    </div>
  )
}

export default Certifications
