import React, { useContext } from 'react'
import { ProfileContainer } from './left/ProfileContainer'
import { SVGItem } from './left/SVGItem'
import { styles } from '../../../styles'
import { SkillItem } from './left/SkillItem'
import { BuilderContext } from '../../../App'

const Socials = ({ template }) => {
  const ctx = useContext(BuilderContext)
  console.log(template)
  return (
    <div style={{ ...styles[`socials__container${template}`] }}>
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
      <h3
        style={{
          color: '#FFF',
          fontSize: '15',
          fontWeight: "bold",
          paddingBottom: '10',
        }}
      >
        {heading}
      </h3>
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
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const education = ctx.getComponentData('Education')
  const skills = ctx.getComponentData('Skills')
  const profile = ctx.getComponentData('Profile')
  const contact = ctx.getComponentData('Contact')
  const certifications = ctx.getComponentData('Certifications')
  // const template = ctx.template !== "" ? ctx.template : info && info['template']
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  console.log(template)
  return (
    <>

      <div style={{ pageBreakInside: "avoid", padding: "2rem", ...styles[`section__left${template}`] }}>
        <ProfileContainer
          name={profile && profile.name}
          profession={profile && profile.profession}
          url={profile && profile.profileImageURL}
          display={profile && profile.display}
        />
        <>
          <Wrapper heading={education && education.header}>
            {education && education.items.map((item, index) => (
              <EducationText key={index} text={item.degree} date={item.date} />
            ))}
          </Wrapper>
          {skills && skills.display && (
            <Wrapper heading={skills && skills.header}>
              {skills && skills.items.map((item, index) => (
                <SkillItem key={index} name={item.text} fillSkill={item.level} />
              ))}
            </Wrapper>
          )}
          {certifications.display && (
            <Wrapper heading={certifications && certifications.header}>
              {certifications && certifications.items.map((item, index) => (
                <EducationText key={index} text={item.name} date={item.date} />
              ))}
            </Wrapper>
          )}
          {contact.display && (
            <Wrapper heading={contact && contact.header}>
              {contact && contact.items.map((item, index) => (
                <p
                  key={index}
                  style={{ color: '#fff', fontSize: '12', marginBottom: '8px' }}
                >
                  {item.text}
                </p>
              ))}
            </Wrapper>
          )}
          <Socials template={template} />
        </>
      </div>
    </>
  )
}
