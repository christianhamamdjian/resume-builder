import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import ActionMenu from './ActionMenu'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import MoveUpDownLeft from './MoveUpDownLeft'
import Loading from "../Loading";
import { BuilderContext } from '../../App'

const Languages = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    text: '',
  }
  const [languages, setLanguages] = useState()
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Languages")
  useEffect(() => {
    const newLanguages = ctx.getComponentData('Languages')
    setLanguages(newLanguages)
  }, [])

  useEffect(() => {
    const newLanguages = ctx.getComponentData('Languages')
    setLanguages(newLanguages)
  }, [currentCv])

  const handleChange = (e, i, title) => {
    if (title && title === "title") {
      setLanguages({ ...languages, title: e.target.value })
      ctx.setCurrentCvLanguages({ ...languages, title: e.target.value })
    } else {
      const modifiedItem = {
        ...languages.items[i],
        text: e.target.value,
      }
      const newLanguages = { ...languages, items: [...languages.items.slice(0, i), modifiedItem, ...languages.items.slice(i + 1)] }
      setLanguages(newLanguages)
      ctx.setCurrentCvLanguages(newLanguages)
    }
  }
  const handleAddClick = () => {
    setLanguages({
      ...languages,
      items: [...languages.items, newItem],
    })
  }
  const handleRemoveClick = () => {
    setLanguages({
      ...languages,
      items: languages.items.filter(
        (item, index) => index < languages.items.length - 1
      ),
    })
  }
  const handleSaveClick = () => {
    ctx.updateInfo(languages && languages, currentCv)
    ctx.setCurrentCvLanguages(null)
  }
  if (ctx.loadingLanguages) {
    return <Loading />
  }
  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'} rounded-2xl`}>
      <h2 className='font-bold text-gray-400'>Languages:</h2>
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
                defaultValue={languages && languages['title']}
                handleChange={(e) => handleChange(e, index, "title")}
              />
              <div className='flex flex-col gap-2 py-2'>
                {languages && languages.items.map((item, index) => (
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
                handleSaveClick={handleSaveClick}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
              />
            </div>
            <button
              className={`${ctx.currentCvLanguages ? 'bg-green-400' : "bg-gray-400"} mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
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

export default Languages
