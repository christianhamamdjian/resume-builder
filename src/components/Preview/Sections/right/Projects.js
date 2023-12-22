import Divider from './Divider'

const Projects = ({ projects }) => {
  return (
    <div style={{ pageBreakInside: "avoid" }}>
      {projects.display && (
        <div style={{ paddingTop: '20px' }}>
          <p
            style={{
              color: '#000',
              fontSize: '15',
            }}
          >
            {projects.header}
          </p>
          <Divider />
          {projects.items.map((project, index) => (
            <div key={index}>
              <p style={{ fontSize: '13', marginVertical: '4' }}>
                {project.name}
              </p>
              <p
                style={{ fontSize: '11', marginTop: '4', marginLeft: '15px' }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
