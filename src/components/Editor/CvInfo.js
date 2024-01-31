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
  console.log(cvInfo)
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
  }
  const handleSaveClick = () => {
    ctx.updateInfo(cvInfo && cvInfo, currentCv)
    ctx.setCurrentCvFontFamily("")
  }
  return (
    <>
      <h1>Cv info:</h1>
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
            <div>
              <label htmlFor="background-color">Background color: </label>
              <input type="color" id="background-color" value={ctx.backgroundColor !== "" ? ctx.backgroundColor : ctx.getComponentData('info')} onChange={e => handleBacgroundColor(e)} />
            </div>
            <div className='field'>
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
            <button
              className='  py-1 px-6 border-gray-300  bg-gray-200 text-gray-600 rounded-lg shadow hover:bg-gray-300'
              onClick={handleSaveClick}
            >
              Save
            </button>
          </>)
      }
    </>
  )
}

export default CvInfo
