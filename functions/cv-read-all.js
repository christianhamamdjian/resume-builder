/* Import faunaDB sdk */
const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query


exports.handler = (event, context) => {
  console.log('Function `cv-read-all` invoked')
  const author = getId(event.path)
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  // return client.query(q.Paginate(q.Match(q.Ref('indexes/all_cvs'))))
  return client.query(q.Paginate(q.Match(q.Index('cvs_by_authId'), author)),
    q.Lambda('doc', q.Get(q.Var('doc')))
  )
    .then((response) => {
      const cvRefs = response.data
      console.log('Cv refs', cvRefs)
      console.log(`${cvRefs.length} cvs found`)
      // create new query out of cv refs. http://bit.ly/2LG3MLg
      const getAllCvDataQuery = cvRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllCvDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}


