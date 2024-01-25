import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import TemplateGallery from '../TemplateGallery'
import { BuilderContext } from '../../App'

const CvInfo = () => {
  const ctx = useContext(BuilderContext)
  const [cvInfo, setCvInfo] = useState([])

  const currentCv = ctx.cvSelected

  const template = ctx.template

  const handleTemplate = ctx.handleTemplate

  useEffect(() => {
    const newCvInfo = ctx.getComponentData('info')
    setCvInfo(newCvInfo)
  }, [])

  useEffect(() => {
    setCvInfo(prevCvInfo => ({ ...prevCvInfo, template: template }))
  }, [template])

  useEffect(() => {
    const newCvInfo = ctx.getComponentData('info')
    setCvInfo(newCvInfo)
  }, [currentCv])
  const updateTemplate = (e, index) => {
    setCvInfo({ ...cvInfo, template: e.target.value })
    handleTemplate(index)
  }
  const handleBacgroundColor = (e) => {
    ctx.setBackgroundColor(e.target.value)
    setCvInfo(prevCvInfo => ({ ...prevCvInfo, backgroundColor: e.target.value }))
  }
  const handleChange = (e) => {
    setCvInfo({ ...cvInfo, title: e.target.value })
  }
  return (
    <div className='pb-11'>
      <h1>Cv info:</h1>
      <h2>Title:</h2>
      <TextInput
        placeholder='CV Title'
        handleChange={handleChange}
        style='pb-3'
        defaultValue={cvInfo.title}
      />
      <h2>Template:</h2>
      <TemplateGallery updateTemplate={updateTemplate} />
      <div>
        <label htmlFor="background-color">Background color: </label>
        <input type="color" id="background-color" value={ctx.backgroundColor !== "" ? ctx.backgroundColor : cvInfo.backgroundColor} onChange={e => handleBacgroundColor(e)} />
      </div>
      <button
        className='  py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
        onClick={() => ctx.updateInfo(cvInfo && cvInfo, currentCv)}
      >
        Save
      </button>
    </div>
  )
}

export default CvInfo
