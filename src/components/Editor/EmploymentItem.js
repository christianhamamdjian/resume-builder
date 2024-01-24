import TextArea from './TextArea'
import TextInput from './TextInput'
import { useState } from 'react'
import { Hide } from './Icons/Hide'
import Show from './Icons/Show'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'

const EmploymentItem = ({ data, index, handleChange, employmentInfo, handleStyleClick }) => {
  const [isToggled, setIsToggled] = useState(true)
  return (
    <div className='px-5 py-2'>
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

      <TextInput
        placeholder='Postion Title - Company'
        style='pb-2'
        isDisabled={isToggled}
        name='position'
        defaultValue={data.position}
        handleChange={(e) => handleChange(index, e)}
      />
      {!isToggled && (
        <div>
          <TextInput
            placeholder='Date From - To'
            style='pb-2'
            name='date'
            defaultValue={data.date}
            handleChange={(e) => handleChange(index, e)}
          />
          <MarkdownEditor
            id={'description'}
            //markdown={markdowns['about'] || ''}
            markdown={data.description}
            //onInputChange={handleInputChange}
            onInputChange={handleChange}
            onStyleClick={handleStyleClick}
          />
          <MarkdownEditor
            id={'responsibilities'}
            //markdown={markdowns['about'] || ''}
            markdown={data.responsibilities}
            //onInputChange={handleInputChange}
            onInputChange={handleChange}
            onStyleClick={handleStyleClick}
          />
          {/* <TextArea
            placeholder='Position Description'
            name='description'
            defaultValue={data.description}
            handleChange={(e) => handleChange(index, e)}
          />
          <TextArea
            placeholder='Responsibilities'
            name='responsibilities'
            defaultValue={data.responsibilities}
            handleChange={(e) => handleChange(index, e)}
          /> */}
        </div>
      )}
    </div>
  )
}

export default EmploymentItem
