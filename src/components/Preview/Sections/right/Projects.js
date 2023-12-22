import Divider from './Divider'

const Projects = ({ projects }) => {
  return (
    <div>
      {projects.display && (
        <div style={{ paddingTop: '20px' }}>
          <div
            style={{
              color: '#000',
              fontSize: '15',
            }}
          >
            {projects.header}
          </div>
          <Divider />
          {projects.items.map((project, index) => (
            <div key={index}>
              <div style={{ fontSize: '13', marginVertical: '4' }}>
                {project.name}
              </div>
              <div
                style={{ fontSize: '11', marginTop: '4', marginLeft: '15px' }}
              >
                {project.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
