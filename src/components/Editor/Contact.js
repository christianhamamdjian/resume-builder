import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import ActionMenu from './ActionMenu'
import { BuilderContext } from './../../App'

const Contact = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    text: '',
  }
  const [contact, setContact] = useState()

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Contact")
  useEffect(() => {
    const newContact = ctx.getComponentData('Contact')
    setContact(newContact)
  }, [])

  useEffect(() => {
    const newContact = ctx.getComponentData('Contact')
    setContact(newContact)
  }, [currentCv])

  const handleChange = (i, e) => {
    const modifiedItem = {
      ...contact.items[i],
      text: e.target.value,
    }
    contact.items.splice(i, 1, modifiedItem)
  }
  const handleAddClick = () => {
    setContact({
      ...contact,
      items: [...contact.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setContact({
      ...contact,
      items: contact.items.filter(
        (item, index) => index < contact.items.length - 1
      ),
    })
  }
  const handleSaveClick = () => ctx.updateInfo(contact && contact, currentCv)

  return (
    <div>
      <h1>Contact:</h1>
      {contact && contact.items.map((item, index) => (
        <TextInput
          key={index}
          placeholder='Custom field'
          defaultValue={item.text}
          handleChange={(e) => handleChange(index, e)}
        />
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

export default Contact
