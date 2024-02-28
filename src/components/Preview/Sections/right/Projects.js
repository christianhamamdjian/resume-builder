import React, { useContext } from 'react'
import { BuilderContext } from '../../../../App'
import { styles } from '../../../../styles'
import MarkdownPreview from '../../../markdown-editor/MarkdownPreview'

import Divider from './Divider'

const Projects = ({ projects, title }) => {
  const ctx = useContext(BuilderContext)
  const selectedTemplate = ctx.template
  const info = ctx.getComponentData('info')
  const currentCvProjects = ctx.currentCvProjects
  const template = !selectedTemplate ? info && info['template'] : selectedTemplate

  return (
    <div style={{ pageBreakInside: "avoid" }}>

      {currentCvProjects !== null && currentCvProjects.display &&
        <div style={{ paddingTop: '20px' }}>
          <h3
            style={{
              color: '#000',
              fontSize: '1rem',
              fontWeight: "bold",
            }}
          >
            {currentCvProjects['title']}
          </h3>
          <Divider />
          {currentCvProjects.items.map((project, index) => (
            <div key={index}>
              <p className="mt-6" style={{ fontSize: '13', marginVertical: '4' }}>
                <em>{project.name}</em>
              </p>
              <MarkdownPreview markdown={project.description} />
            </div>
          ))
          }
        </div>
      }
      {currentCvProjects === null && projects.display && (
        <div style={{ paddingTop: '20px' }}>
          <h3
            style={{
              color: '#000',
              fontSize: '1rem',
              fontWeight: "bold",
            }}
          >
            {title}
          </h3>
          <Divider />
          {projects.items.map((project, index) => (
            <div key={index}>
              <p className="mt-6" style={{ fontSize: '13', marginVertical: '4' }}>
                <em>{project.name}</em>
              </p>
              <MarkdownPreview markdown={project.description} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
