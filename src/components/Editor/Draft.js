import { useState, useEffect, useContext } from 'react'
import { BuilderContext } from '../../App'
import ActionMenu from './ActionMenu'
import TextArea from './TextArea'

const Draft = () => {
  const ctx = useContext(BuilderContext)
  const [draft, setDraft] = useState([])

  const currentCv = ctx.cvSelected

  useEffect(() => {
    const newDraft = ctx.getComponentData('Draft')
    setDraft(newDraft)
  }, [])

  useEffect(() => {
    const newDraft = ctx.getComponentData('Draft')
    setDraft(newDraft)
  }, [currentCv])


  const handleChange = (e) => {
    setDraft({ ...draft, text: e.target.value })
  }

  const handleSaveClick = () => ctx.updateInfo(draft && draft, currentCv)
  return (
    <div style={{
      marginTop: ".2rem", width: "100%", height: "30rem"
    }}>
      <TextArea
        placeholder='Draft...'
        style='mt-8'
        label='Draft'
        defaultValue={draft && draft.text}
        handleChange={(e) => {
          handleChange(e)
        }}
      />
      <div className='flex justify-end'>
        <ActionMenu
          handleSaveClick={handleSaveClick}
          onlySave={true}
        />
      </div>
    </div >
  )
}

export default Draft
