
// import { cvs } from './data'
import React, { useState, useEffect, useContext } from 'react'
import api from './utils/api'
// import isLocalHost from './utils/isLocalHost'
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
// import Home from "./components/Home";
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
  const [imageUrl, setImageUrl] = useState("")
  const [template, setTemplate] = useState("")
  console.log(cvSelected)
  // console.log(imageUrl)
  useEffect(() => {
    //console.log(user?.id)
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  useEffect(() => {
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
    }
  }, [userId]);
  useEffect(() => {
    const selected = cvSelected['data']
    const newInfoSelected = selected && selected['items']
    setInfoSelected(newInfoSelected ? newInfoSelected : infoSelected)
    setTemplate(newInfoSelected && newInfoSelected[0]["template"])
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
  const getComponentId = (id) => {
    const data = infoSelected.filter((item) => item.id === id)
    return data ? data[0] : []
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
  const handleImageUrl = (url) => {
    setImageUrl(url)
  }
  const handleTemplate = (templateId) => {
    setTemplate(templateId)
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
    console.log(currentCv)
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    const { ref } = cvSelected
    const cvId = ref["@ref"]["id"]
    setTemplate("")
    if (cvId) {
      api.update(cvId, cvSelected['data']).then((response) => {
        console.log(`updated cv id ${cvId}`, response)
        setCvSelected(response)
        setTemplate("")
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
    setForce(force + 1)
  }
  const setSelectedCv = (e, id) => {
    e.preventDefault()

    infoState.filter((cv, i) => {
      if (+i === +id) {
        setInfoSelected(cv['data']["items"])
        setCvSelected(cv)
      } else {
        return null
      }
    })
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <BuilderContext.Provider
          value={{
            getSocials,
            updateInfo,
            getComponentData,
            infoState,
            setInfoState,
            setInfoSelected,
            getComponentId,
            cvSelected,
            setCvSelected,
            setSelectedCv,
            deleteCv,
            handleImageUrl,
            imageUrl,
            template,
            handleTemplate
          }}
        ><Dashboard />
        </BuilderContext.Provider> */}

        <Routes>
          {user && <Route path='/' element={
            <BuilderContext.Provider
              value={{
                getSocials,
                updateInfo,
                getComponentData,
                infoState,
                setInfoState,
                setInfoSelected,
                getComponentId,
                cvSelected,
                setCvSelected,
                setSelectedCv,
                deleteCv,
                handleImageUrl,
                imageUrl,
                template,
                handleTemplate
              }}
            ><Dashboard />
            </BuilderContext.Provider>
          } />}
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
          <Route path="*" component={Error} />
        </Routes>
      </BrowserRouter >
    </>)
}

export default App
