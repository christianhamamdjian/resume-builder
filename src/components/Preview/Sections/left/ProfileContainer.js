import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'

const ProfileImage = ({ url, display, textColor }) => {
  const ctx = useContext(BuilderContext)
  const info = ctx.getComponentData('info')

  return (
    <>
      {display && (
        <img
          // style={{
          //   width: '100px',
          //   height: '100px',
          //   border: '4px solid #ffffff',
          //   borderRadius: '50%',
          // }}
          style={{
            width: '280px',
            height: '200px',
            objectFit: "cover",
            border: `${ctx.currentCvBorderWidth !== "" ? ctx.currentCvBorderWidth : info.borderWidth}px solid #ffffff`,
            borderRadius: `${ctx.currentCvRoundCorners !== "" ? ctx.currentCvRoundCorners : info.roundCorners}%`,
          }}
          src={url}
        />
      )}
    </>)
}

export const ProfileContainer = ({ name, profession, url, display, textColor }) => {

  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div
      style={{
        ...styles[`profile_container${template}`],
        marginBottom: display ? '20px' : '-65px',
      }}
    >
      <ProfileImage url={url} display={display} />
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <p style={{ ...styles[`name_text${template}`], color: textColor }}>{name}</p>
      </div>
      <p style={{ ...styles[`profession_text${template}`], color: textColor }}>{profession}</p>
      <div
        style={{
          marginTop: '10px',
          width: '10%',
          height: '1px',
          //backgroundColor: '#FFF',
          backgroundColor: textColor,
          textAlign: 'center',
        }}
      />
    </div>
  )
}
