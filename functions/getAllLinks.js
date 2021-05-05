const axios = require("axios");
require("dotenv").config();
exports.handler = async event => {
    const graphical = `
        query {
            allLinks {
                data {
                    name
                    _id
                    url
                    description
                    archived
                }
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
            query: graphical
        }
    })
    console.log(res.data);
    return {
        statusCode: 200,

        body: JSON.stringify(res.data)
    }

}