import { Add } from './Icons/Add'
import { Remove } from './Icons/Remove'
const ActionMenu = ({
  style,
  handleSaveClick,
  handleAddClick,
  handleRemoveClick,
  onlySave
}) => {
  return (
    <div className={`flex py-2 flex-row justify-between ${style}`}>
      <button
        className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleSaveClick}
      >
        Save
      </button>
      {!onlySave && <div className='flex flex-row pt-[5px] gap-2'>
        <button handleClick={handleAddClick} className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
          <Add color='#d1d5db' />
        </button>
        <button handleClick={handleRemoveClick} className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
          <Remove color='#d1d5db' />
        </button>
      </div>}
    </div>
  )
}

export default ActionMenu
