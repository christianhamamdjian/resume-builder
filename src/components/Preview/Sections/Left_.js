import React, { useState, useEffect, useContext } from 'react'
import { ProfileContainer } from './left/ProfileContainer'
import { SVGItem } from './left/SVGItem'
import { styles } from '../../../styles'
import { SkillItem } from './left/SkillItem'
import { BuilderContext } from '../../../App'
import '../../../index.css'

const Socials = ({ template }) => {
  const ctx = useContext(BuilderContext)

  return (
    <div style={{ ...styles[`socials__container${template}`] }}>
      {ctx.getSocials().items.map((item, index) => {
        if (item.enabled)
          return (
            <SVGItem
              key={index}
              textColor={`${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`}
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
  const ctx = useContext(BuilderContext)
  return (
    <div style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <h3
        style={{
          color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`,
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
const EducationText = ({ text, date }) => {
  const ctx = useContext(BuilderContext)
  console.log(ctx.backgroundColor)
  return (
    <div style={{ paddingBottom: '10' }} key={text}>
      <p style={{ color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`, fontSize: '12' }}>{text}</p>
      <p style={{ color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`, fontSize: '9', paddingTop: '3' }}>
        {date}
      </p>
    </div>)
}

export const Left = () => {
  const ctx = useContext(BuilderContext)
  const leftContentOrder = ctx.leftContentOrder
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const education = ctx.getComponentData('Education')
  const currentCvEducation = ctx.currentCvEducation
  const skills = ctx.getComponentData('Skills')
  const currentCvSkills = ctx.currentCvSkills
  const getProfile = ctx.getComponentData('Profile')
  const currentCvProfile = ctx.currentCvProfile
  const contact = ctx.getComponentData('Contact')
  const currentCvContact = ctx.currentCvContact
  const certifications = ctx.getComponentData('Certifications')
  const currentCvCertifications = ctx.currentCvCertifications
  const currentCvSocials = ctx.currentCvSocials
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const newProfile = getProfile
    setProfile(newProfile)
  }, [getProfile])

  return (
    <>
      <div
        className="section__left-back"
        style={{ backgroundColor: `${ctx.backgroundColor !== "" ? ctx.backgroundColor : info.backgroundColor}` }}
      ></div>
      <div
        style={{
          pageBreakInside: "avoid", padding: "2rem", ...styles[`section__left${template}`], backgroundColor: `${ctx.backgroundColor !== "" ? ctx.backgroundColor : info.backgroundColor}`, color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`
        }}
      >
        <ProfileContainer
          name={currentCvProfile !== null ? currentCvProfile.name : profile.name}
          profession={currentCvProfile !== null ? currentCvProfile.profession : profile.profession}
          url={currentCvProfile !== null ? currentCvProfile.profileImageURL : profile.profileImageURL}
          display={currentCvProfile !== null ? currentCvProfile.display : profile.display}
          textColor={`${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`}
        />

        {leftContentOrder && leftContentOrder.map((item, index) => {
          if (item === "Education") {
            return (<Wrapper key={index} heading={education && education.header}>
              {currentCvEducation !== null ? currentCvEducation.items.map((item, index) => (
                <EducationText key={index} text={item.degree} date={item.date} />
              ))
                : education && education.items.map((item, index) => (
                  <EducationText key={index} text={item.degree} date={item.date} />
                ))}
            </Wrapper>)
          }
          if (item === "Skills") {
            return (skills && skills.display && (
              <Wrapper key={index} heading={skills && skills.header}>
                {/* {skills && skills.items.map((item, index) => (
                  <SkillItem key={index} name={item.text} fillSkill={item.level} />
                ))} */}
                {currentCvSkills !== null ? currentCvSkills.items.map((item, index) => (
                  <SkillItem key={index} name={item.text} textColor={`${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`} fillSkill={item.level} />
                ))
                  : skills && skills.items.map((item, index) => (
                    <SkillItem key={index} name={item.text} textColor={`${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`} fillSkill={item.level} />
                  ))}
              </Wrapper>
            ))
          }
          if (item === "Certifications") {
            return (certifications.display && (
              <Wrapper key={index} heading={certifications && certifications.header}>
                {currentCvCertifications !== null ? currentCvCertifications.items.map((item, index) => (
                  <EducationText key={index} text={item.name} date={item.date} />
                ))
                  : certifications.items.map((item, index) => (
                    <EducationText key={index} text={item.name} date={item.date} />
                  ))}
              </Wrapper>
            ))
          }
          if (item === "Contact") {
            return (contact.display && (
              <Wrapper key={index} heading={contact && contact.header}>
                {currentCvContact !== null ? currentCvContact.items.map((item, index) => (
                  <p
                    key={index}
                    style={{ color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`, fontSize: '12', marginBottom: '8px' }}
                  >
                    {item.text}
                  </p>
                ))
                  : contact.items.map((item, index) => (
                    <p
                      key={index}
                      style={{ color: `${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`, fontSize: '12', marginBottom: '8px' }}
                    >
                      {item.text}
                    </p>
                  ))}
              </Wrapper>
            ))
          }
          if (item === "Socials") {
            return (<Socials key={index} textColor={`${ctx.backgroundColor !== "#ffffff" ? "#ffffff" : "#000000"}`} template={template} />)
          }
        })
        }
      </div>
    </>
  )
}
