import Divider from './Divider'

const Projects = ({ projects }) => {
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
          {projects.items.map((project, index) => (
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
