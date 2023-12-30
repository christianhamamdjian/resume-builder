import { useState, useEffect, useContext } from 'react'
import { BuilderContext } from './../../App'

const ToggleButton = ({ name, handleChange, defaultValue, style }) => {
  const ctx = useContext(BuilderContext)
  const [isChecked, setIsUnchecked] = useState(defaultValue)

  const currentCv = ctx.cvSelected

  const handleToggle = (checked) => {
    handleChange(name, 'enabled', checked)
    setIsUnchecked(checked)
  }

  useEffect(() => {
    setIsUnchecked(defaultValue)
  }, [])

  useEffect(() => {
    setIsUnchecked(defaultValue)
  }, [defaultValue, currentCv])

  return (
    <div key={name} className={style}>
      <div className='flex flex-col'>
        {isChecked ? (
          <label
            htmlFor={name}
            className='mt-3 inline-flex items-center cursor-pointer'
          >
            <span className='relative'>
              <span className='block w-10 h-6 bg-gray-200 rounded-lg shadow-inner'></span>
              <span className='absolute block w-4 h-4 mt-1 ml-1 rounded-md shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-gray-400 transform translate-x-full'>
                <input
                  id={name}
                  defaultValue={defaultValue}
                  type='checkbox'
                  className='absolute opacity-0 w-0 h-0'
                  onClick={() => {
                    handleToggle(false)
                  }}
                />
              </span>
            </span>
          </label>
        ) : (
          <label
            htmlFor={name}
            className='mt-3 inline-flex items-center cursor-pointer'
          >
            <span className='relative'>
              <span className='block w-10 h-6 bg-gray-400 rounded-lg shadow-inner'></span>
              <span className='absolute block w-4 h-4 mt-1 ml-1 bg-gray-300 rounded-md shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out'>
                <input
                  id={name}
                  type='checkbox'
                  defaultValue={defaultValue}
                  className='absolute opacity-0 w-0 h-0'
                  onClick={() => {
                    handleToggle(true)
                  }}
                />
              </span>
            </span>
          </label>
        )}
      </div>
    </div>
  )
}

export default ToggleButton
