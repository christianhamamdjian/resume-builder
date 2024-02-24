/* Api methods to call /functions */
import netlifyIdentity from "netlify-identity-widget";

const create = (data) => {
  let token = netlifyIdentity.currentUser().token.access_token
  return fetch('/.netlify/functions/cv-create', {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = () => {
  let token = netlifyIdentity.currentUser().token.access_token
  return fetch(`/.netlify/functions/cv-read-all`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then((response) => {
    return response.json()
  })
}

const update = (cvId, data) => {
  let token = netlifyIdentity.currentUser().token.access_token
  return fetch(`/.netlify/functions/cv-update/${cvId}`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteCv = (cvId) => {
  let token = netlifyIdentity.currentUser().token.access_token
  return fetch(`/.netlify/functions/cv-delete/${cvId}`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteCv,
}
