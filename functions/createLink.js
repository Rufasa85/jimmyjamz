
  const axios = require("axios");
require("dotenv").config();
exports.handler = async event => {
    const {name,description, url} = JSON.parse(event.body)
    console.log('event.body', event.body)
    const graphical = `
mutation ($name: String!, $url:String!, $description:String!){
    createLink(data:{name:$name url:$url, description:$description}) {
      name
      _id
    }
  }
  `
    const res = await axios({
        url: "https://graphql.fauna.com/graphql",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.FAUNA_SECRET}`
        },
        data: {
            query: graphical,
            variables: {
                name,
                url,
                description
            }
        }
    })
    console.log(res.data);
    return {
        statusCode: 200,

        body: JSON.stringify(res.data)
    }

}