import React, { useState, useEffect, useContext } from 'react'
import api from './utils/api'
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ServerError from "./components/ServerError";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/authContext";
import Loading from "./components/Loading";
export const BuilderContext = React.createContext({})

function App() {
  const { user } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)
  const [infoState, setInfoState] = useState([])
  const [infoSelected, setInfoSelected] = useState([])
  const [cvSelected, setCvSelected] = useState(infoState[0] || [])
  const [imageUrl, setImageUrl] = useState("")
  const [template, setTemplate] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("")
  const [currentCvInfo, setCurrentCvInfo] = useState(null)
  const [currentCvProfile, setCurrentCvProfile] = useState(null)
  const [currentCvSkills, setCurrentCvSkills] = useState(null)
  const [currentCvAbout, setCurrentCvAbout] = useState(null)
  const [currentCvProjects, setCurrentCvProjects] = useState(null)
  const [currentCvEmploymentInfo, setCurrentCvEmploymentInfo] = useState(null)
  const [currentCvSocials, setCurrentCvSocials] = useState(null)
  const [currentCvEducation, setCurrentCvEducation] = useState(null)
  const [currentCvKeySkills, setCurrentCvKeySkills] = useState(null)
  const [currentCvContact, setCurrentCvContact] = useState(null)
  const [currentCvCertifications, setCurrentCvCertifications] = useState(null)
  const [currentCvLanguages, setCurrentCvLanguages] = useState(null)
  const [currentCvFontFamily, setCurrentCvFontFamily] = useState("")
  const [currentCvRoundCorners, setCurrentCvRoundCorners] = useState("")
  const [currentCvBorderWidth, setCurrentCvBorderWidth] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingAbout, setLoadingAbout] = useState(false)
  const [loadingEmployment, setLoadingEmployment] = useState(false)
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [loadingKeySkills, setLoadingKeySkills] = useState(false)
  const [loadingCvInfo, setLoadingCvInfo] = useState(false)
  const [loadingProfile, setLoadinProfile] = useState(false)
  const [loadingSkills, setLoadingSkills] = useState(false)
  const [loadingContact, setLoadingKeyContact] = useState(false)
  const [loadingCertifications, setLoadingCertifications] = useState(false)
  const [loadingLanguages, setLoadingLanguages] = useState(false)
  const [loadingSocials, setLoadingSocials] = useState(false)
  const [loadingEducation, setLoadingEducation] = useState(false)
  const [loadingCvList, setLoadingCvList] = useState(false)
  const [serverError, setServerError] = useState(false)

  const initialRightContent = [
    "About",
    "Employment History",
    "Key Skills",
    "Projects",
  ];

  const [rightContentOrder, setRightContentOrder] = useState(initialRightContent || []);

  const initialLeftContent = [
    "Education",
    "Skills",
    "Certifications",
    "Contact",
    "Languages",
    "Socials",
  ];

  const [leftContentOrder, setLeftContentOrder] = useState(initialLeftContent || []);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      setLoading(true)
      api.readAll()
        .then((allCvs) => {
          setInfoState(allCvs)
          setInfoSelected(allCvs[0]['data']["items"])
          setCvSelected(allCvs[0])
          setRightContentOrder(allCvs[0]['data']["items"][1]['rightOrder'])
          setLeftContentOrder(allCvs[0]['data']["items"][1]['leftOrder'])
          setLoading(false)
        })
        .catch((e) => {
          console.log(`There was an error fetching cvs`, e)
          setLoading(false)
        })
    }
  }, [userId]);

  const deleteCv = (e) => {
    const cvId = e.target.dataset.id
    console.log(+cvId)
    const filteredCvs = infoState.filter((cv) => {
      const id = cv.ref["@ref"]["id"]
      return id !== cvId
    })
    setInfoState(filteredCvs)
    setLoadingCvList(true)
    api.delete(cvId).then(() => {
      console.log(`deleted cv id ${cvId}`)
      setLoadingCvList(false)
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

  const handleSelectedCv = (e, id) => {
    e.preventDefault()
    setBackgroundColor("")
    setCurrentCvProfile(null)
    setCurrentCvSkills(null)
    setCurrentCvProjects(null)
    setCurrentCvEmploymentInfo(null)
    setCurrentCvSocials(null)
    setCurrentCvEducation(null)
    setCurrentCvKeySkills(null)
    setCurrentCvContact(null)
    setCurrentCvLanguages(null)
    setCurrentCvCertifications(null)
    infoState.forEach((cv, i) => {
      if (+i === +id) {
        setInfoSelected(cv['data']["items"])
        setTemplate(cv['data']["items"][1]["template"])
        setBackgroundColor(cv['data']["items"][1]["backgroundColor"])
        setRightContentOrder(cv['data']["items"][1]['rightOrder'])
        setLeftContentOrder(cv['data']["items"][1]['leftOrder'])
        setCvSelected(cv)
      }
    })
  }

  const moveRightContentUp = (index) => {
    if (index > 0) {
      const updatedContent = [...rightContentOrder];
      const temp = updatedContent[index];
      updatedContent[index] = updatedContent[index - 1];
      updatedContent[index - 1] = temp;
      setRightContentOrder(updatedContent);
    }
  };

  const moveRightContentDown = (index) => {
    if (index < rightContentOrder.length - 1) {
      const updatedContent = [...rightContentOrder];
      const temp = updatedContent[index];
      updatedContent[index] = updatedContent[index + 1];
      updatedContent[index + 1] = temp;
      setRightContentOrder(updatedContent);
    }
  };
  const moveLeftContentUp = (index) => {
    if (index > 0) {
      const updatedContent = [...leftContentOrder];
      const temp = updatedContent[index];
      updatedContent[index] = updatedContent[index - 1];
      updatedContent[index - 1] = temp;
      setLeftContentOrder(updatedContent);
    }
  };

  const moveLeftContentDown = (index) => {
    if (index < leftContentOrder.length - 1) {
      const updatedContent = [...leftContentOrder];
      const temp = updatedContent[index];
      updatedContent[index] = updatedContent[index + 1];
      updatedContent[index + 1] = temp;
      setLeftContentOrder(updatedContent);
    }
  };

  const updateInfo = (item) => {
    const targetIndex = infoSelected.findIndex(
      (elem) => elem.type === item.type
    )
    setInfoSelected(infoSelected.splice(targetIndex, 1, item))
    const { ref } = cvSelected
    const cvId = ref["@ref"]["id"]
    const updatedItems = cvSelected['data']["items"].map(el => {
      if (el.type === "info" && el.type === item.type) {
        return { ...item, rightOrder: rightContentOrder, leftOrder: leftContentOrder }
      }
      if (el.type === "info") {
        return { ...el, rightOrder: rightContentOrder, leftOrder: leftContentOrder }
      }
      if (el.type === item.type) {
        return item
      }
      return el
    })
    const updatedCv = { ...cvSelected, data: { ...cvSelected['data'], items: updatedItems } }
    setInfoSelected(updatedCv['data']["items"])
    setTemplate("")
    if (cvId) {
      console.log(item.type)
      item.type === "About" && setLoadingAbout(true)
      item.type === "Employment" && setLoadingEmployment(true)
      item.type === "Projects" && setLoadingProjects(true)
      item.type === "KeySkills" && setLoadingKeySkills(true)
      item.type === "info" && setLoadingCvInfo(true)
      item.type === "Profile" && setLoadinProfile(true)
      item.type === "Education" && setLoadingEducation(true)
      item.type === "Skills" && setLoadingSkills(true)
      item.type === "Contact" && setLoadingKeyContact(true)
      item.type === "Certifications" && setLoadingCertifications(true)
      item.type === "Languages" && setLoadingLanguages(true)
      item.type === "Socials" && setLoadingSocials(true)
      // setLoading(true)
      api.update(cvId, updatedCv['data']).then((response) => {
        console.log(`updated cv id ${cvId}`, response)
        setTemplate("")
        item.type === "About" && setLoadingAbout(false)
        item.type === "Employment" && setLoadingEmployment(false)
        item.type === "Projects" && setLoadingProjects(false)
        item.type === "KeySkills" && setLoadingKeySkills(false)
        item.type === "info" && setLoadingCvInfo(false)
        item.type === "Profile" && setLoadinProfile(false)
        item.type === "Education" && setLoadingEducation(false)
        item.type === "Skills" && setLoadingSkills(false)
        item.type === "Contact" && setLoadingKeyContact(false)
        item.type === "Certifications" && setLoadingCertifications(false)
        item.type === "Languages" && setLoadingLanguages(false)
        item.type === "Socials" && setLoadingSocials(false)
        // setLoading(false)
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
  }
  const duplicateCv = (e, cvCopy) => {
    console.log(cvCopy['data']["items"])
    const oldTitle = cvCopy['data']["items"][1]['title']
    const newCopy = cvCopy['data']["items"].map((item, index) => {
      if (index === 1) {
        return { ...item, title: `${oldTitle} copy` }
      }
      return item
    })
    setLoadingCvList(true)
    api.create(newCopy).then((response) => {
      console.log("New Cv was created successfully!")
      setInfoState([...infoState, response])
      setCvSelected(response)
      setLoadingCvList(false)
    })
  }
  if (loading) {
    return <Loading />
  }
  if (serverError) {
    return <ServerError />
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
                setBackgroundColor,
                currentCvProfile,
                setCurrentCvProfile,
                rightContentOrder,
                leftContentOrder,
                moveRightContentUp,
                moveRightContentDown,
                moveLeftContentUp,
                moveLeftContentDown,
                initialRightContent,
                initialLeftContent,
                currentCvInfo,
                setCurrentCvInfo,
                currentCvSkills,
                setCurrentCvSkills,
                currentCvAbout,
                setCurrentCvAbout,
                currentCvProjects,
                setCurrentCvProjects,
                currentCvEmploymentInfo,
                setCurrentCvEmploymentInfo,
                currentCvSocials,
                setCurrentCvSocials,
                currentCvEducation,
                setCurrentCvEducation,
                currentCvKeySkills,
                setCurrentCvKeySkills,
                currentCvContact,
                setCurrentCvContact,
                currentCvCertifications,
                setCurrentCvCertifications,
                currentCvLanguages,
                setCurrentCvLanguages,
                currentCvFontFamily,
                setCurrentCvFontFamily,
                currentCvRoundCorners,
                setCurrentCvRoundCorners,
                currentCvBorderWidth,
                setCurrentCvBorderWidth,
                duplicateCv,
                loadingAbout,
                loadingEmployment,
                loadingProjects,
                loadingKeySkills,
                loadingCvInfo,
                loadingProfile,
                loadingEducation,
                loadingSkills,
                loadingContact,
                loadingCertifications,
                loadingLanguages,
                loadingSocials,
                loadingCvList,
                setLoadingCvList
              }}
            ><Dashboard />
            </BuilderContext.Provider>
          } />}
          <Route path="*" element={<ServerError />} />
        </Routes>
      </BrowserRouter >
    </>)
}

export default App
