import React, { useContext } from 'react'
import { BuilderContext } from '../../App'
import { Right as SectionRight } from './Sections/Right_'
import { Left as SectionLeft } from './Sections/Left_'
import { styles } from '../../styles'

const PreviewScreen = () => {
  const ctx = useContext(BuilderContext)
  return (
    <div style={{ flexGrow: '1' }}>
      <div>
        {/* {({ loading }) => (loading ? 'Loading document...' : 'Download now!')} */}
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <ResumeTemplate builder={ctx} />
      </div>
    </div>
  )
}

const ResumeTemplate = ({ builder }) => (
  <>
    <div className="print_area" style={styles.document}>
      <div style={styles[`page${builder.template !== "" && builder.template}`]}>
        <BuilderContext.Provider value={builder}>
          <SectionLeft />
          <SectionRight />
        </BuilderContext.Provider>
      </div>
    </div>
    <button type="button" className="print-btn btn btn-primary" onClick={() => window.print()}>Print CV</button>
  </>
)

export default PreviewScreen
