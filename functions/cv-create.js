// /* Import faunaDB sdk */
// const faunadb = require('faunadb')
// const q = faunadb.query

// /* export our lambda function as named "handler" export */
// exports.handler = async (event, context) => {
//   /* configure faunaDB Client with our secret */
//   const client = new faunadb.Client({
//     secret: process.env.FAUNADB_SERVER_SECRET
//   })
//   /* parse the string body into a useable JS object */
//   const data = JSON.parse(event.body)
//   console.log('Function `cv-create` invoked', data)
//   const cv = {
//     data: data
//   }
//   /* construct the fauna query */
//   return client.query(q.Create(q.Ref('classes/cvs'), cv))
//     .then((response) => {
//       console.log('success', response)
//       /* Success! return the response with statusCode 200 */
//       return {
//         statusCode: 200,
//         body: JSON.stringify(response)
//       }
//     }).catch((error) => {
//       console.log('error', error)
//       /* Error! return the error with statusCode 400 */
//       return {
//         statusCode: 400,
//         body: JSON.stringify(error)
//       }
//     })
// }


const faunadb = require('faunadb');
const { Create, Collection } = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

    const data = JSON.parse(event.body);
    const result = await client.query(
      Create(Collection('cvs'), {
        data: {
          items: data,
        },
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating CV' }),
    };
  }
};