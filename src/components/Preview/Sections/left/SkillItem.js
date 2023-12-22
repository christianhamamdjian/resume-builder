import { styles } from '../../../../styles'

export const SkillItem = ({ name, fillSkill }) => {
  let percent = fillSkill > 100 ? 100 : fillSkill
  return (
    <div style={styles.skill__item__container}>
      <p style={styles.skill__item__text}>{name}</p>
      <div style={styles.skill__item}>
        <div
        // style={[styles.skill__item__fill, { width: `${percent}%` }]}
        ></div>
      </div>
    </div>
  )
}
