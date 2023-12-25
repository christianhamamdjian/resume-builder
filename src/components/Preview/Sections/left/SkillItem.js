import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'

export const SkillItem = ({ name, fillSkill }) => {
  let percent = fillSkill > 100 ? 100 : fillSkill
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  return (
    <div style={{ ...styles[`skill__item__container${template}`] }}>
      <h3 style={{ ...styles[`skill__item__text${template}`] }}>{name}</h3>
      <div style={{ ...styles[`skill__item${template}`] }}>
        <div style={{ ...styles[`skill__item__fill${template}`], width: `${percent}%` }}></div>
      </div>
    </div>
  )
}
