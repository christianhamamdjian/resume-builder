import { styles } from '../../../../styles'

const ProfileImage = ({ url, display }) => (
  <>
    {display && (
      <img
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '90',
        }}
        src={url}
      />
    )}
  </>
)

export const ProfileContainer = ({ name, profession, url, display }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20',
        marginBottom: display ? '20px' : '-65px',
        height: '150',
        fontFamily: 'Helvetica-Bold',
      }}
    >
      <ProfileImage url={url} display={display} />
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <div style={styles.name_text}>{name}</div>
      </div>
      <div style={styles.profession_text}>{profession}</div>
      <div
        style={{
          marginTop: '10px',
          width: '10%',
          height: '1px',
          backgroundColor: '#FFF',
          textAlign: 'center',
        }}
      />
    </div>
  )
}
