import TextArea from './TextArea'
import TextInput from './TextInput'
import { useState } from 'react'
import { Hide } from './Icons/Hide'
import Show from './Icons/Show'
import MarkdownEditor from '../markdown-editor/MarkdownEditor'

const EmploymentItem = ({ data, index, handleChange, employmentInfo }) => {
  const [isToggled, setIsToggled] = useState(true)

  const handleStyleClick = (id, tag, index) => {
    const start = document.getElementById(`markdownTextarea-${id}${index}`).selectionStart;
    const end = document.getElementById(`markdownTextarea-${id}${index}`).selectionEnd;
    const newText =
      employmentInfo.items[index][id].substring(0, start) +
      `${tag}${employmentInfo.items[index][id].substring(start, end)}${tag}` +
      employmentInfo.items[index][id].substring(end);
    handleChange(newText, id, index)
    // console.log(newText, id, index)
  };

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
        id={'position'}
        index={index}
        placeholder='Postion Title - Company'
        style='pb-2'
        isDisabled={isToggled}
        name='position'
        defaultValue={data.position}
        handleChange={handleChange}
      />
      {!isToggled && (
        <div>
          <TextInput
            id={'date'}
            placeholder='Date From - To'
            style='pb-2'
            name='date'
            defaultValue={data.date}
            handleChange={handleChange}
          />
          <MarkdownEditor
            id={'description'}
            index={index}
            //markdown={markdowns['about'] || ''}
            markdown={data.description}
            //onInputChange={handleInputChange}
            onInputChange={handleChange}
            onStyleClick={handleStyleClick}
          />
          <MarkdownEditor
            id={'responsibilities'}
            index={index}
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
