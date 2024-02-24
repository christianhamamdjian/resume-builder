const faunadb = require('faunadb');
const { Create, Collection } = faunadb.query;

exports.handler = async (event, context) => {

  try {
    const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
    const data = JSON.parse(event.body);
    const result = await client.query(
      // Create(Collection(context.clientContext.user.app_metadata.roles[0] === 'Admin' ? 'admincvs' : 'cvs'), {
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