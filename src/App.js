
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
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState(user?.id)

  const [force, setForce] = useState(0)
  // const [infoState, setInfoState] = useState(savedData || cvs[1])
  const [infoState, setInfoState] = useState([])
  const [infoSelected, setInfoSelected] = useState([])
  const [cvSelected, setCvSelected] = useState([])
  useEffect(() => {
    setUserId(user?.id)
  }, [user])
  useEffect(() => {
    //const userId = netlifyIdentity.currentUser()
    // console.log(userId)
    // api.readAll(userId)
    //   .then((allCvs) => setInfoState(allCvs))
    //   .catch((e) => {
    //     console.log(`There was an error fetching cvs`, e)
    //   })
    const fetchCvs = async () => {
      const allCvs = await api.readAll(userId)
      setInfoState(allCvs)
    }
    fetchCvs()
    // }
  }, []);

  const deleteCv = (e) => {
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
    const data = infoSelected.filter((item) => item.type === type)
    return data ? data[0] : []
  }
  const getSocials = () => {
    const socials = infoSelected.filter(
      (item) => item.type === 'Socials'
    )
    return socials ? socials[0] : []
  }
  const updateInfo = (item) => {
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    // const cvId = infoSelected[0]['id']
    const { ref } = cvSelected
    const cvId = ref["@ref"]["id"]
    console.log(cvSelected)
    if (cvId) {
      api.update(cvId, cvSelected['data']).then((response) => {
        console.log(`updated cv id ${cvId} ${response}`)
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
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
                setInfoState,
                setInfoSelected,
                setCvSelected,
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
