import { styles } from '../../../../styles'
import Divider from './Divider'

const About = ({ text }) => (
  <div>
    <div
      style={{
        color: '#000',
        fontSize: '15',
      }}
    >
      Professional Summary
    </div>
    <Divider />
    <div style={styles.main__text}>{text}</div>
  </div>
)
export default About
