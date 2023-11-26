
// import { cvs } from './data'
import React, { useState, useEffect, useContext } from 'react'
import api from './utils/api'
// import isLocalHost from './utils/isLocalHost'
import Navbar from "./components/Navbar";
import SingleCv from "./components/SingleCv";
import Home from "./components/Home";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/authContext";

export const BuilderContext = React.createContext({})



function App() {
  // const savedData = JSON.parse(localStorage.getItem('cvData'));
  const { user } = useContext(AuthContext);
  console.log(user?.id)
  const [userId, setUserId] = useState(user?.id)
  // Function to check if the accessed content in the database belongs to the current user.
  // exports.handler = async (event, context) => {
  //   const user = context.clientContext.user
  //   if (user && user.sub === 'your-admin-user-id') {
  //     // process the function
  //   } else {
  //     return: {
  //       statusCode: 401
  //       body: JSON.stringify('Unauthorised')
  //     }
  //   }
  // }
  const [force, setForce] = React.useState(0)
  // const [infoState, setInfoState] = React.useState(savedData || cvs[1])
  const [infoState, setInfoState] = React.useState([])
  const [infoSelected, setInfoSelected] = React.useState([])

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
  useEffect(() => {
    api.readAll(userId).then((allCvs) => setInfoState(allCvs))
    // const fetchCvs = async () => {
    //   const allCvs = await api.readAll(userId)
    //   setInfoState(allCvs)
    // }
    // fetchCvs()
  }, []);
  const getCvId = (cv) => {
    if (!cv.ref) {
      return null
    }
    return cv.ref['@ref'].id
  }

  const deleteCv = (e) => {
    // const { cvs } = this.state
    const cvId = e.target.dataset.id
    console.log(+cvId)
    const filteredCvs = infoState.filter((cv) => {
      const id = cv.ref["@ref"]["id"]
      return id !== cvId
    })
    setInfoState(filteredCvs)

    // Make API request to delete cv
    api.delete(cvId).then(() => {
      console.log(`deleted cv id ${cvId}`)
    }).catch((e) => {
      console.log(`There was an error removing ${cvId}`, e)
    })
  }
  const getComponentData = (type) => {
    // const data = infoState.filter((item) => item.type === type)
    const data = infoSelected.filter((item) => item.type === type)
    return data ? data[0] : []
  }
  const getSocials = () => {
    // const socials = infoState.filter(
    const socials = infoSelected.filter(
      (item) => item.type === 'Socials'
    )
    return socials ? socials[0] : []
  }
  const updateInfo = (item) => {
    // const targetIndex = infoState.findIndex(
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    // infoState.splice(targetIndex, 1, item)
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    setForce(force + 1)

  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <BuilderContext.Provider
              value={{
                getSocials,
                updateInfo,
                getComponentData,
                infoState,
                setInfoSelected,
                deleteCv
                // saveToLocalStorage,
                // handleCvChange
              }}
            ><Home />
            </BuilderContext.Provider>
          } />
          <Route path='cv/:id' element={<BuilderContext.Provider
            value={{
              getSocials,
              updateInfo,
              getComponentData,
              infoState,
              infoSelected,
              setInfoSelected,
              // saveToLocalStorage,
              deleteCv
            }}
          >
            <SingleCv />
          </BuilderContext.Provider>} />
          <Route path="*" component={Error} />
        </Routes>
      </BrowserRouter>

      {/*  */}
    </div>
  )
}

export default App
