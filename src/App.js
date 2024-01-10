import React, { useState, useEffect, useContext } from 'react'
import api from './utils/api'
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/authContext";
export const BuilderContext = React.createContext({})

function App() {
  const { user } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)
  // const [force, setForce] = useState(0)
  const [infoState, setInfoState] = useState([])
  const [infoSelected, setInfoSelected] = useState([])
  const [cvSelected, setCvSelected] = useState(infoState[0] || [])
  const [imageUrl, setImageUrl] = useState("")
  const [template, setTemplate] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("")

  useEffect(() => {
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

  // useEffect(() => {
  //   const selected = cvSelected['data']
  //   const newInfoSelected = selected && selected['items']
  //   setInfoSelected(newInfoSelected ? newInfoSelected : infoSelected)
  //   setTemplate(newInfoSelected && newInfoSelected[0]["template"])
  // }, [cvSelected]);

  const deleteCv = (e) => {
    const cvId = e.target.dataset.id
    console.log(+cvId)
    const filteredCvs = infoState.filter((cv) => {
      const id = cv.ref["@ref"]["id"]
      return id !== cvId
    })
    setInfoState(filteredCvs)

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

  const updateInfo = (item) => {
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    const { ref } = cvSelected
    const cvId = ref["@ref"]["id"]
    const updatedItems = cvSelected['data']["items"].map(el => el.type === item.type ? item : el)
    const updatedCv = { ...cvSelected, data: { ...cvSelected['data'], items: updatedItems } }
    setInfoSelected(updatedCv['data']["items"])
    setTemplate("")
    if (cvId) {
      api.update(cvId, updatedCv['data']).then((response) => {
        console.log(`updated cv id ${cvId}`, response)
        //setInfoSelected(response['data']["items"])
        setTemplate("")
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
    // setForce(force + 1)
  }
  const handleSelectedCv = (e, id) => {
    e.preventDefault()
    infoState.filter((cv, i) => {
      if (+i === +id) {
        //console.log(cv['data']["items"])
        setInfoSelected(cv['data']["items"])
        setTemplate(cv['data']["items"][0]["template"])
        setBackgroundColor("")
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
                handleSelectedCv,
                deleteCv,
                handleImageUrl,
                imageUrl,
                template,
                handleTemplate,
                backgroundColor,
                setBackgroundColor
              }}
            ><Dashboard />
            </BuilderContext.Provider>
          } />}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter >
    </>)
}

export default App
