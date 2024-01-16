import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import Divider from './Divider'

const Projects = ({ projects }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvProjects = ctx.currentCvProjects
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div style={{ pageBreakInside: "avoid" }}>
      {projects.display && (
        <div style={{ paddingTop: '20px' }}>
          <h3
            style={{
              color: '#000',
              fontSize: '1rem',
              fontWeight: "bold",
            }}
          >
            {projects.header}
          </h3>
          <Divider />
          {currentCvProjects !== null ? currentCvProjects.items.map((project, index) => (
            <div key={index}>
              <p style={{ fontSize: '13', marginVertical: '4' }}>
                {project.name}
              </p>
              <pre
                style={{ fontSize: '11', marginTop: '4', marginLeft: '15px' }}
              >
                {project.description}
              </pre>
            </div>
          )) : projects.items.map((project, index) => (
            <div key={index}>
              <p style={{ fontSize: '13', marginVertical: '4' }}>
                {project.name}
              </p>
              <pre
                style={{ fontSize: '11', marginTop: '4', marginLeft: '15px' }}
              >
                {project.description}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
