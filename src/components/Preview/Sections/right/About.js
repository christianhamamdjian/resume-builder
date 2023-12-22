import { styles } from '../../../../styles'
import Divider from './Divider'

const About = ({ text }) => (
  <div>
    <p
      style={{
        color: '#000',
        fontSize: '15',
      }}
    >
      Professional Summary
    </p>
    <Divider />
    <p style={styles.main__text}>{text}</p>
  </div>
)
export default About
