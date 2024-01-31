import React, { useContext } from 'react'
import { BuilderContext } from '../../App'
import { Right as SectionRight } from './Sections/Right_'
import { Left as SectionLeft } from './Sections/Left_'
import Draft from '../../components/Editor/Draft'
import { styles } from '../../styles'

const PreviewScreen = () => {
  const ctx = useContext(BuilderContext)
  const info = ctx.getComponentData('info')
  const selectedTemplate = ctx.template
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate
  return (
    <div style={{ flexGrow: '1' }}>
      <div>
        {/* {({ loading }) => (loading ? 'Loading document...' : 'Download now!')} */}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: "grey",
          padding: "1rem"
        }}
      >
        <ResumeTemplate builder={ctx} template={template} />
      </div>
    </div >
  )
}

const ResumeTemplate = ({ builder, template }) => {
  const ctx = useContext(BuilderContext)
  const info = ctx.getComponentData('info')
  console.log(ctx.currentCvFontFamily, info && info.font)
  return (
    <>
      <div className="print_area" style={{ ...styles.document, backgroundColor: "#ffffff", boxShadow: "" }}>
        <div style={{ ...styles[`page${template}`], fontFamily: `${ctx.currentCvFontFamily !== "" ? ctx.currentCvFontFamily : info && info.font}` }}>
          <BuilderContext.Provider value={builder}>
            <SectionLeft />
            <SectionRight />
          </BuilderContext.Provider>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: ".2rem",
        width: "100%"
      }}>
        <button type="button" className="print-btn btn btn-primary" onClick={() => window.print()}>Print CV</button>
      </div>
      <Draft />
    </>
  )
}

export default PreviewScreen
