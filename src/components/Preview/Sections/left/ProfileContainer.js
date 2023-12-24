import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'

const ProfileImage = ({ url, display }) => (
  <>
    {display && (
      <img
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '90',
        }}
        src={url}
      />
    )}
  </>
)

export const ProfileContainer = ({ name, profession, url, display }) => {

  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20',
        marginBottom: display ? '20px' : '-65px',
        height: '150',
        fontFamily: 'Helvetica-Bold',
      }}
    >
      <ProfileImage url={url} display={display} />
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <p style={{ ...styles[`name_text${template}`] }}>{name}</p>
      </div>
      <p style={{ ...styles[`profession_text${template}`] }}>{profession}</p>
      <div
        style={{
          marginTop: '10px',
          width: '10%',
          height: '1px',
          backgroundColor: '#FFF',
          textAlign: 'center',
        }}
      />
    </div>
  )
}
