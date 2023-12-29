import React from 'react'
const TextInput = ({
  name,
  style,
  placeholder,
  defaultValue,
  isDisabled,
  type,
  handleChange,
}) => {
  // const [newValue, setNewValue] = useState("")
  // useEffect(() => {
  //   setNewValue(defaultValue)
  // }, [])
  // useEffect(() => {
  //   setNewValue(defaultValue)
  // }, [defaultValue])
  return (
    <div className={`w-full ${style}`}>
      <input
        name={name}
        // defaultValue={newValue}
        value={defaultValue}
        placeholder={placeholder}
        className={`w-full  border-1 border-gray-200 text-gray-900 shadow px-3 py-2 rounded focus:outline-none focus:border-indigo-500 ${isDisabled ? 'text-gray-600 bg-gray-200' : 'bg-white'
          }`}
        disabled={isDisabled}
        onChange={(e) => {
          handleChange(e)
        }}
        type={type}
      ></input>
    </div>
  )
}

export default TextInput
