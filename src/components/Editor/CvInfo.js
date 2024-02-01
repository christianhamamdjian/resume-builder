import { useState, useEffect, useContext } from 'react'
import TextInput from './TextInput'
import TemplateGallery from '../TemplateGallery'
import Hide from './Icons/Hide'
import Show from './Icons/Show'
import { BuilderContext } from '../../App'

const CvInfo = () => {
  const ctx = useContext(BuilderContext)
  const [cvInfo, setCvInfo] = useState([])
  const [isToggled, setIsToggled] = useState(true)

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
    ctx.setCurrentCvInfo(cvInfo)
  }
  const handleBackgroundColor = (e) => {
    ctx.setBackgroundColor(e.target.value)
    setCvInfo(prevCvInfo => ({ ...prevCvInfo, backgroundColor: e.target.value }))
    ctx.setCurrentCvInfo(cvInfo)
  }
  const handleChange = (e) => {
    setCvInfo({ ...cvInfo, title: e.target.value })
    ctx.setCurrentCvInfo(cvInfo)
  }
  const fontOptions = [
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Quicksand', label: 'Quicksand' },
    { value: 'Playfair Display', label: 'Playfair Display' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Raleway', label: 'Raleway' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro' },
    { value: 'Oswald', label: 'Oswald' },
    { value: 'Roboto Condensed', label: 'Roboto Condensed' },
    { value: 'Ubuntu', label: 'Ubuntu' },
    { value: 'Merriweather', label: 'Merriweather' },
    { value: 'Dancing Script', label: 'Dancing Script' },
    { value: 'Fira Sans', label: 'Fira Sans' },
    { value: 'Work Sans', label: 'Work Sans' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Exo', label: 'Exo' },
    { value: 'Archivo', label: 'Archivo' },
    { value: 'Rubik', label: 'Rubik' },
    { value: 'Lora', label: 'Lora' },
    { value: 'Josefin Sans', label: 'Josefin Sans' },
    { value: 'Pacifico', label: 'Pacifico' },
    { value: 'Noto Sans', label: 'Noto Sans' },
    { value: 'Muli', label: 'Muli' },
    { value: 'Cabin', label: 'Cabin' },
    { value: 'Hind', label: 'Hind' },
    { value: 'Manrope', label: 'Manrope' },
    { value: 'Lalezar', label: 'Lalezar' },
  ]
  const handleFontChange = (e) => {
    setCvInfo({ ...cvInfo, font: e.target.value })
    ctx.setCurrentCvFontFamily(e.target.value)
    ctx.setCurrentCvInfo(cvInfo)
  }
  const handleImageChange = (e) => {
    setCvInfo({ ...cvInfo, roundCorners: e.target.value })
    ctx.setCurrentCvRoundCorners(e.target.value)
    ctx.setCurrentCvInfo(cvInfo)
  }
  const handleBorderChange = (e) => {
    setCvInfo({ ...cvInfo, borderWidth: e.target.value })
    ctx.setCurrentCvBorderWidth(e.target.value)
    ctx.setCurrentCvInfo(cvInfo)
  }

  const handleSaveClick = () => {
    ctx.updateInfo(cvInfo && cvInfo, currentCv)
    ctx.setCurrentCvInfo("")
  }

  return (
    <div onClick={() => isToggled && setIsToggled(!isToggled)} className={`${!isToggled ? 'bg-blue-50  border p-4 ' : 'border p-4 hover:bg-blue-50 cursor-pointer'}`}>
      <h2 className='font-bold text-gray-400'>Cv info:</h2>
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
      )}
      {
        !isToggled && (
          <>
            <h2>Title:</h2>
            <TextInput
              placeholder='CV Title'
              handleChange={handleChange}
              style='pb-3'
              defaultValue={cvInfo.title}
            />
            <h2>Template:</h2>
            <TemplateGallery updateTemplate={updateTemplate} />
            <div className='field mt-6 mb-6'>
              <label htmlFor="background-color">Background color: </label>
              <input type="color" id="background-color" value={ctx.backgroundColor !== "" ? ctx.backgroundColor : ctx.getComponentData('info')} onChange={e => handleBackgroundColor(e)} />
            </div>
            <div className='field mt-6 mb-6'>
              <label htmlFor="fonts">Choose a font:</label>
              <select
                name="fonts"
                id="fonts"
                className='box-form-top-select'
                value={ctx.currentCvFontFamily !== "" ? ctx.currentCvFontFamily : cvInfo && cvInfo.font}
                onChange={(e) => handleFontChange(e)}
              >
                {fontOptions.map((option) => (
                  <option
                    className='box-form-top-select-option'
                    style={{ fontFamily: `${option.value}` }}
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span
                className='box-form-top-span'
                style={{ fontFamily: `${ctx.currentCvFontFamily !== "" ? ctx.currentCvFontFamily : cvInfo && cvInfo.font}` }}
              > {ctx.currentCvFontFamily !== "" ? ctx.currentCvFontFamily : cvInfo && cvInfo.font}</span>
            </div>
            <div className='field mt-6 mb-6'>
              <label>Image corners:</label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                name="roundCorners"
                value={ctx.currentCvRoundCorners !== "" ? ctx.currentCvRoundCorners : cvInfo && cvInfo.roundCorners}
                onChange={(e) => handleImageChange(e)}
              />
            </div>
            <div className='field mt-6 mb-6'>
              <label>Image border:</label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                name="borderWidth"
                value={ctx.currentCvBorderWidth !== "" ? ctx.currentCvBorderWidth : cvInfo && cvInfo.borderWidth}
                onChange={(e) => handleBorderChange(e)}
              />
            </div>
            <button
              className='bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSaveClick}
            >
              Save
            </button>
          </>)
      }
    </div>
  )
}

export default CvInfo
