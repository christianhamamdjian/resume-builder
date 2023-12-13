
// import { cvs } from './data'
import React, { useState, useEffect, useContext } from 'react'
import api from './utils/api'
// import isLocalHost from './utils/isLocalHost'
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/authContext";
export const BuilderContext = React.createContext({})

function App() {
  const { user } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)
  const [force, setForce] = useState(0)
  const [infoState, setInfoState] = useState([])
  const [infoSelected, setInfoSelected] = useState([])
  const [cvSelected, setCvSelected] = useState([])
  console.log(cvSelected)
  useEffect(() => {
    //console.log(user?.id)
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  useEffect(() => {
    //const userId = netlifyIdentity.currentUser()
    // console.log(userId)
    if (userId) {
      api.readAll()
        .then((allCvs) => {
          setInfoState(allCvs)
          setInfoSelected(allCvs[0]['data']["items"])
          setCvSelected(allCvs[0])
        })
        .catch((e) => {
          console.log(`There was an error fetching cvs`, e)
        })

      // const fetchCvs = async () => {
      //   const allCvs = await api.readAll(userId)
      //   setInfoState(allCvs)
      // }
      // fetchCvs()
    }
    // }
  }, [userId]);
  useEffect(() => {
    const selected = cvSelected['data']
    //console.log(selected && selected['items'])
    const newInfoSelected = selected && selected['items']
    //console.log(infoSelected)
    setInfoSelected(newInfoSelected ? newInfoSelected : infoSelected)
  }, [cvSelected]);
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
    // console.log(data)
    return data ? data[0] : []
  }
  const getSocials = () => {
    const socials = infoSelected.filter(
      (item) => item.type === 'Socials'
    )
    return socials ? socials[0] : []
  }
  // const updateInfo = (item) => {
  //   console.log(item)
  //   const targetIndex = infoSelected.findIndex(
  //     (elem) => elem.type === item.type
  //   )
  //   setInfoSelected(infoSelected.splice(targetIndex, 1, item))
  //   const cvId = infoSelected[0]['id']
  //   // const selected = infoSelected['ref']
  //   // const cvId = selected && selected["@ref"]["id"]
  //   // console.log(cvSelected['data'])
  //   if (cvId) {
  //     api.update(cvId, cvSelected['data']).then((response) => {
  //       // setInfoSelected(infoState[cvId]['data'])


  //       // const selected = cvSelected['data']
  //       // //console.log(selected && selected['items'])
  //       // const newInfoSelected = selected && selected['items']
  //       // //console.log(infoSelected)
  //       // setInfoSelected(newInfoSelected ? newInfoSelected : infoSelected)

  //       console.log(response)
  //     }).catch((e) => {
  //       console.log(`There was an error updating ${cvId}`, e)
  //     })
  //   }
  //   setForce(force + 1)
  // }
  const updateInfo = (item, currentCv) => {
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    // const cvId = infoSelected[0]['id']
    // const cvRef = cvSelected?.ref
    // const cvId = cvRef["@ref"]["id"]
    const { ref } = currentCv
    const cvId = ref["@ref"]["id"]
    if (cvId) {
      api.update(cvId, cvSelected['data']).then((response) => {
        console.log(`updated cv id ${cvId}`, response)
        setCvSelected(response)
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
    setForce(force + 1)
  }
  return (
    <>
      {/*   <div
      style={{
       display: 'flex',
       flexDirection: 'column',
      width: '100%',
      height: '100vh',
      }}
     >
      <div> */}
      {/* <BrowserRouter> */}
      <Navbar />
      <BuilderContext.Provider
        value={{
          getSocials,
          updateInfo,
          getComponentData,
          infoState,
          setInfoState,
          setInfoSelected,
          cvSelected,
          setCvSelected,
          deleteCv
          // saveToLocalStorage,
          // handleCvChange
        }}
      ><Dashboard />
      </BuilderContext.Provider>

      {/* <Routes> */}
      {/* <Route path='/' element={
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
            } /> */}
      {/* <Route path='cv/:id' element={<BuilderContext.Provider
              value={{
                getSocials,
                updateInfo,
                getComponentData,
                infoState,
                infoSelected,
                setInfoSelected,
                setCvSelected,
                // saveToLocalStorage,
                deleteCv
              }}
            >
              <SingleCv />
            </BuilderContext.Provider>} />*/}
      {/* <Route path="*" component={Error} />
      </Routes> */}
      {/* </BrowserRouter> */}
      {/* </div> 
    </div>*/}
    </>)
}

export default App
