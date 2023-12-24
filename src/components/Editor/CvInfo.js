import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import TemplateGallery from '../TemplateGallery'

import { BuilderContext } from '../../App'

const CvInfo = () => {
  const ctx = useContext(BuilderContext)
  const [cvInfo, setCvInfo] = useState([])

  const currentCv = ctx.cvSelected
  const template = ctx.template
  console.log(template)
  const handleTemplate = ctx.handleTemplate
  console.log(cvInfo)

  useEffect(() => {
    const newCvInfo = ctx.getComponentData('info')
    setCvInfo(newCvInfo)
  }, [])

  useEffect(() => {
    setCvInfo(prevCvInfo => ({ ...prevCvInfo, template: template }))
  }, [template])

  useEffect(() => {
    // 
    const newCvInfo = ctx.getComponentData('info')
    setCvInfo(newCvInfo)
  }, [currentCv])
  const updateTemplate = (e, index) => {
    setCvInfo({ ...cvInfo, template: e.target.value })
    handleTemplate(index)
  }
  return (
    <div className='pb-11'>
      <h1>Cv info:</h1>
      <h2>Title:</h2>
      <TextInput
        placeholder='CV Title'
        handleChange={(e) =>
          setCvInfo({ ...cvInfo, title: e.target.value })
        }
        style='pb-3'
        defaultValue={cvInfo.title}
      />
      <h2>Template:</h2>
      <TemplateGallery updateTemplate={updateTemplate} />
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
