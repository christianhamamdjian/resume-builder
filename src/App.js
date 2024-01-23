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
  const [infoState, setInfoState] = useState([])
  const [infoSelected, setInfoSelected] = useState([])
  const [cvSelected, setCvSelected] = useState(infoState[0] || [])
  const [imageUrl, setImageUrl] = useState("")
  const [template, setTemplate] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("")
  const [currentCvProfile, setCurrentCvProfile] = useState(null)
  const [currentCvSkills, setCurrentCvSkills] = useState(null)
  const [currentCvProjects, setCurrentCvProjects] = useState(null)
  const [currentCvEmploymentInfo, setCurrentCvEmploymentInfo] = useState(null)
  const [currentCvSocials, setCurrentCvSocials] = useState(null)
  const [currentCvEducation, setCurrentCvEducation] = useState(null)
  const [currentCvKeySkills, setCurrentCvKeySkills] = useState(null)
  const [currentCvContact, setCurrentCvContact] = useState(null)
  const [currentCvCertifications, setCurrentCvCertifications] = useState(null)

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
    "Socials",
  ];

  const [leftContentOrder, setLeftContentOrder] = useState(initialLeftContent || []);


  // const [markdowns, setMarkdowns] = useState({});

  // const handleInputChange = (id, newMarkdown) => {
  //   setMarkdowns((prevMarkdowns) => ({
  //     ...prevMarkdowns,
  //     [id]: newMarkdown,
  //   }));
  // };

  // const handleStyleClick = (id, tag) => {
  //   const start = document.getElementById(`markdownTextarea-${id}`).selectionStart;
  //   const end = document.getElementById(`markdownTextarea-${id}`).selectionEnd;
  //   const newText =
  //     markdowns[id].substring(0, start) +
  //     `${tag}${markdowns[id].substring(start, end)}${tag}` +
  //     markdowns[id].substring(end);
  //   setMarkdowns((prevMarkdowns) => ({
  //     ...prevMarkdowns,
  //     [id]: newText,
  //   }));
  // };



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
          setRightContentOrder(allCvs[0]['data']["items"][1]['rightOrder'])
          setLeftContentOrder(allCvs[0]['data']["items"][1]['leftOrder'])
        })
        .catch((e) => {
          console.log(`There was an error fetching cvs`, e)
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
    setCurrentCvCertifications(null)
    infoState.filter((cv, i) => {
      if (+i === +id) {
        setInfoSelected(cv['data']["items"])
        setTemplate(cv['data']["items"][1]["template"])
        setBackgroundColor(cv['data']["items"][1]["backgroundColor"])
        setRightContentOrder(cv['data']["items"][1]['rightOrder'])
        setLeftContentOrder(cv['data']["items"][1]['leftOrder'])
        setCvSelected(cv)
      } else {
        return null
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
    console.log(updatedCv)
    setInfoSelected(updatedCv['data']["items"])
    setTemplate("")
    if (cvId) {
      api.update(cvId, updatedCv['data']).then((response) => {
        console.log(`updated cv id ${cvId}`, response)
        setTemplate("")
      }).catch((e) => {
        console.log(`There was an error updating ${cvId}`, e)
      })
    }
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
                currentCvSkills,
                setCurrentCvSkills,
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
                // markdowns,
                // handleInputChange,
                // handleStyleClick
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
