import ResumeEdit from './components/Editor/ResumeEdit'
import PreviewScreen from './components/PDF/ResumeTemplate'
import { components } from './data'
import React, { useEffect } from 'react'
import api from './utils/api'
import isLocalHost from './utils/isLocalHost'
import Navbar from "./components/Navbar";
export const BuilderContext = React.createContext({})




function App() {
  const savedData = JSON.parse(localStorage.getItem('cvData'));

  const [force, setForce] = React.useState(0)
  const [infoState, setInfoState] = React.useState(savedData || { components })
  console.log(infoState)

  // useEffect(() => {
  //   // Load data from localStorage on component mount

  //   // if (savedData) {
  //   //   setInfoState(savedData);
  //   // }
  //   api.readAll().then((cvs) => {
  //     if (cvs.message === 'unauthorized') {
  //       if (isLocalHost()) {
  //         alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
  //       } else {
  //         alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
  //       }
  //       return false
  //     }

  //     console.log('all cvs', cvs)
  //     setInfoState({
  //       cvs: cvs
  //     })
  //   })
  // }, []);


  const getComponentData = (type) => {
    const data = infoState.components.filter((item) => item.type === type)
    return data ? data[0] : []
  }
  const getSocials = () => {
    const socials = infoState.components.filter(
      (item) => item.type === 'Socials'
    )
    return socials ? socials[0] : []
  }
  const updateInfo = (item) => {
    const targetIndex = infoState.components.findIndex(
      (elem) => elem.type === item.type
    )
    infoState.components.splice(targetIndex, 1, item)
    setForce(force + 1)
  }

  useEffect(() => {
    // Load data from localStorage on component mount

    if (savedData) {
      setInfoState(savedData);
    }
  }, []);
  const saveToLocalStorage = () => {
    // Save data to localStorage
    localStorage.setItem('cvData', JSON.stringify(infoState));
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
        }}
      >

        <BuilderContext.Provider
          value={{
            getSocials,
            updateInfo,
            getComponentData,
            saveToLocalStorage,
          }}
        >
          <ResumeEdit />
          <PreviewScreen />
        </BuilderContext.Provider>
      </div>
    </>
  )
}

export default App
