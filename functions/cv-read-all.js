/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = (event, context) => {
  console.log('Function `cv-read-all` invoked')
  const author = context.clientContext.user.sub
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })
  // return client.query(q.Paginate(q.Match(q.Index('cvs_by_authId'), author)),
  //   q.Lambda('doc', q.Get(q.Var('doc')))
  // )
  return client.query(q.Paginate(q.Match(q.Index(context.clientContext.user.app_metadata.roles[0] === 'Admin' ? 'admincvs_by_authId' : 'cvs_by_authId'), author)),
    q.Lambda('doc', q.Get(q.Var('doc')))
  )
    .then((response) => {
      console.log(response)
      const cvRefs = response.data
      console.log('Response', response)
      console.log('Cv refs', cvRefs)
      console.log(`${cvRefs.length} cvs found`)
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


