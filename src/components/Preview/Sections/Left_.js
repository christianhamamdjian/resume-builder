import React, { useContext } from 'react'
import { ProfileContainer } from './left/ProfileContainer'
import { SVGItem } from './left/SVGItem'
import { styles } from '../../../styles'
import { SkillItem } from './left/SkillItem'
import { BuilderContext } from '../../../App'

const Socials = () => {
  const ctx = useContext(BuilderContext)
  return (
    <div style={styles.socials__container}>
      {ctx.getSocials().items.map((item, index) => {
        if (item.enabled)
          return (
            <SVGItem
              key={index}
              viewBox={item.viewBox}
              path={item.path}
              url={item.url}
            />
          )
      })}
    </div>
  )
}
const Wrapper = ({ heading, ...props }) => {
  return (
    <div style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <p
        style={{
          color: '#FFF',
          fontSize: '15',
          paddingBottom: '10',
        }}
      >
        {heading}
      </p>
      {props.children}
    </div>
  )
}
const EducationText = ({ text, date }) => (
  <div style={{ paddingBottom: '10' }} key={text}>
    <p style={{ color: '#fff', fontSize: '12' }}>{text}</p>
    <p style={{ color: '#fff', fontSize: '9', paddingTop: '3' }}>
      {date}
    </p>
  </div>
)

export const Left = () => {
  const ctx = useContext(BuilderContext)
  const education = ctx.getComponentData('Education')
  const skills = ctx.getComponentData('Skills')
  const profile = ctx.getComponentData('Profile')
  const contact = ctx.getComponentData('Contact')
  const certifications = ctx.getComponentData('Certifications')
  const template = ctx.template !== "" ? ctx.template : profile.template

  return (
    <>

      <div style={{ pageBreakInside: "avoid", padding: "2rem", ...styles[`section__left${template}`] }}>
        {/* <div style={{ zIndex: "-100", display: "block", position: "fixed", top: " 0 ", left: "0", height: "100%", width: "13rem", backgroundColor: "rgb(8, 76, 65)" }}></div > */}
        <ProfileContainer
          name={profile.name}
          profession={profile.profession}
          url={profile.profileImageURL}
          display={profile.display}
        />
        <>
          <Wrapper heading={education.header}>
            {education.items.map((item, index) => (
              <EducationText key={index} text={item.degree} date={item.date} />
            ))}
          </Wrapper>
          {skills.display && (
            <Wrapper heading={skills.header}>
              {skills.items.map((item, index) => (
                <SkillItem key={index} name={item.text} fillSkill={item.level} />
              ))}
            </Wrapper>
          )}
          {certifications.display && (
            <Wrapper heading={certifications.header}>
              {certifications.items.map((item, index) => (
                <EducationText key={index} text={item.name} date={item.date} />
              ))}
            </Wrapper>
          )}
          {contact.display && (
            <Wrapper heading={contact.header}>
              {contact.items.map((item, index) => (
                <p
                  key={index}
                  style={{ color: '#fff', fontSize: '12', marginBottom: '8px' }}
                >
                  {item.text}
                </p>
              ))}
            </Wrapper>
          )}
          <Socials />
        </>
      </div>
    </>
  )
}
