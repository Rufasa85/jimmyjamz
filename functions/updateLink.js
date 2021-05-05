const axios = require("axios");
  require("dotenv").config();
  exports.handler = async event => {
      const {name,description, url,archived,id} = JSON.parse(event.body)
      console.log('event.body', event.body)
      const graphical = `
  mutation ($id:ID!, $name: String!, $url:String!, $description:String!, $archived:Boolean!){
      updateLink(id:$id,data:{name:$name url:$url, description:$description,archived:$archived}) {
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
                  name,
                  url,
                  description,
                  archived,
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