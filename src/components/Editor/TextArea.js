import React from 'react'

const TextArea = ({
  name,
  placeholder,
  style,
  handleChange,
  defaultValue,
  rows,
  isDisabled,
}) => {
  //const [newValue, setNewValue] = useState("")

  // useEffect(() => {
  //   setNewValue(defaultValue)
  // }, [])

  // useEffect(() => {
  //   setNewValue("")
  //   setNewValue(defaultValue)
  // }, [defaultValue])

  return (
    <div className={`w-full ${style}`}>
      <textarea
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className={`w-full  border-1 border-gray-200 text-gray-900 shadow px-3 py-2 rounded focus:outline-none focus:border-indigo-500 ${isDisabled ? 'text-gray-600 bg-gray-200' : 'bg-white'
          }`}
        disabled={isDisabled}
        rows={rows ? rows : '6'}
        name={name}
        value={defaultValue}
      //defaultValue={newValue}
      ></textarea>
    </div>
  )
}

export default TextArea
