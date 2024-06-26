const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  //console.log(id, data)
  console.log(`Function 'cv-update' invoked. update id: ${id}`)
  // return client.query(q.Update(q.Ref(`classes/cvs/${id}`), { data }))
  return client.query(q.Update(q.Ref(context.clientContext.user.app_metadata.roles[0] === 'Admin' ? `classes/admincvs/${id}` : `classes/cvs/${id}`), { data }))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
