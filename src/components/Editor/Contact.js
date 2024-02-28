import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import ActionMenu from './ActionMenu'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import MoveUpDownLeft from './MoveUpDownLeft'
import Loading from "../Loading";
import { BuilderContext } from '../../App'

const Contact = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    text: '',
  }
  const [contact, setContact] = useState()
  const [isToggled, setIsToggled] = useState(true)

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

  const handleChange = (e, i, title) => {
    if (title && title === "title") {
      setContact({ ...contact, title: e.target.value })
      ctx.setCurrentCvContact({ ...contact, title: e.target.value })
    } else {
      const modifiedItem = {
        ...contact.items[i],
        text: e.target.value,
      }
      const newContact = { ...contact, items: [...contact.items.slice(0, i), modifiedItem, ...contact.items.slice(i + 1)] }
      setContact(newContact)
      ctx.setCurrentCvContact(newContact)
    }
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
  const handleSaveClick = () => {
    ctx.updateInfo(contact && contact, currentCv)
    ctx.setCurrentCvContact(null)
  }
  if (ctx.loadingContact) {
    return <Loading />
  }
  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'} rounded-2xl`}>
      <h2 className='font-bold text-gray-400'>Contact:</h2>
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
            <div className='flex flex-col gap-2 py-2'>
              <TextInput
                key={index}
                placeholder='Custom field'
                defaultValue={contact && contact['title']}
                handleChange={(e) => handleChange(e, index, "title")}
              />
              <div className='flex flex-col gap-2 py-2'>
                {contact && contact.items.map((item, index) => (
                  <TextInput
                    key={index}
                    placeholder='Custom field'
                    defaultValue={item.text}
                    handleChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
            </div>
            <div className='flex gap-6 justify-evenly'>
              <MoveUpDownLeft
                moveLeftContentUp={moveLeftContentUp}
                moveLeftContentDown={moveLeftContentDown}
                index={index}
              />
              <ActionMenu
                // handleSaveClick={handleSaveClick}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
              />
            </div>
            <button
              className={`${ctx.currentCvContact ? 'bg-green-400' : "bg-gray-400"} mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
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

export default Contact
