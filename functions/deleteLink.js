const axios = require("axios");
  require("dotenv").config();
  exports.handler = async event => {
      const {id} = JSON.parse(event.body)
      console.log('event.body', event.body)
      const graphical = `
  mutation ($id:ID!){
      deleteLink(id:$id) {
        name
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
                  id
              }
          }
      })
      console.log(res.data);
      return {
          statusCode: 200,
  
          body: JSON.stringify(res.data)
      }
  
  }