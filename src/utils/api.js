/* Api methods to call /functions */

const create = (data) => {
  //console.log(data)
  return fetch('/.netlify/functions/cv-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

// const readAll = (userId) => {
//   return fetch(`/.netlify/functions/cv-read-all/${userId}`).then((response) => {
//     return response.json()
//   })
// }

const readAll = () => {
  return fetch(`/.netlify/functions/cv-read-all`).then((response) => {
    return response.json()
  })
}

const update = (cvId, data) => {
  return fetch(`/.netlify/functions/cv-update/${cvId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteCv = (cvId) => {
  return fetch(`/.netlify/functions/cv-delete/${cvId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteCv = (cvIds) => {
  return fetch(`/.netlify/functions/cv-delete-batch`, {
    body: JSON.stringify({
      ids: cvIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteCv,
  batchDelete: batchDeleteCv
}
