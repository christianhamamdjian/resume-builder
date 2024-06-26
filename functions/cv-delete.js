/* Import faunaDB sdk */
const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  const id = getId(event.path)
  console.log(`Function 'cv-delete' invoked. delete id: ${id}`)
  // return client.query(q.Delete(q.Ref(`classes/cvs/${id}`)))
  return client.query(q.Delete(q.Ref(context.clientContext.user.app_metadata.roles[0] === 'Admin' ? `classes/admincvs/${id}` : `classes/cvs/${id}`)))
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
