const faunadb = require('faunadb');
const q = faunadb.query

const clientQuery = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
});

module.exports = { clientQuery, q };