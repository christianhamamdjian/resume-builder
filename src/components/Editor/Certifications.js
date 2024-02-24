import { useState, useEffect, useContext } from 'react'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'
import TextInput from './TextInput'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import MoveUpDownLeft from './MoveUpDownLeft'
import Loading from "../Loading";
import { BuilderContext } from '../../App'

const Certifications = () => {
  const ctx = useContext(BuilderContext)
  const newItem = {
    name: '',
    date: '',
  }
  const [certification, setCertification] = useState(null)
  const [isToggled, setIsToggled] = useState(true)

  const currentCv = ctx.cvSelected
  const leftContentOrder = ctx.leftContentOrder
  const moveLeftContentUp = ctx.moveLeftContentUp
  const moveLeftContentDown = ctx.moveLeftContentDown
  const index = leftContentOrder && leftContentOrder.indexOf("Certifications")

  useEffect(() => {
    const newCetification = ctx.getComponentData('Certifications')
    setCertification(newCetification)
  }, [])

  useEffect(() => {
    const newCetification = ctx.getComponentData('Certifications')
    setCertification(newCetification)
  }, [currentCv])

  const handleChange = (e, i, title) => {
    if (title && title === "title") {
      setCertification({ ...certification, title: e.target.value })
      ctx.setCurrentCvCertifications({ ...certification, title: e.target.value })
    } else {
      const targetName = e.target.name
      const modifiedItem = {
        ...certification.items[i],
        [targetName]: e.target.value,
      }
      const newCertification = { ...certification, items: [...certification.items.slice(0, i), modifiedItem, ...certification.items.slice(i + 1)] }
      setCertification(newCertification)
      ctx.setCurrentCvCertifications(newCertification)
    }
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
  const handleSaveClick = () => {
    ctx.updateInfo(certification && certification, currentCv)
    ctx.setCurrentCvCertifications(null)
  }
  if (ctx.loadingCertifications) {
    return <Loading />
  }
  return (
    <>
      <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'} rounded-2xl`}>
        <h2 className='font-bold text-gray-400'>Certifications:</h2>
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
                  defaultValue={certification && certification['title']}
                  handleChange={(e) => handleChange(e, index, "title")}
                />
                {certification && certification.items.map((item, index) => (
                  <div key={index}>
                    <TextArea
                      placeholder='Certification Type'
                      rows='2'
                      style='pb-2'
                      name='name'
                      defaultValue={item.name}
                      handleChange={(e) => handleChange(e, index)}
                    />

                    <TextInput
                      placeholder='Date '
                      name='date'
                      style='pb-2'
                      defaultValue={item.date}
                      handleChange={(e) => handleChange(e, index)}
                    />
                  </div>
                ))}
              </div>

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
            </>
          )
        }</div>
    </>
  )
}

export default Certifications
