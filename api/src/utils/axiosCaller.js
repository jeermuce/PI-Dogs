require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

async function axiosCaller(type, value) {
    try {
        switch (type) {
            case "id":
                return await axios.get(
                    `https://api.thedogapi.com/v1/breeds/${value}?api_key=${API_KEY}`
                );
            case "name":
                return await axios.get(
                    `https://api.thedogapi.com/v1/breeds/search?q=${value}&api_key=${API_KEY}`
                );
            case "all":
                return await axios.get(
                    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
                );
            default:
                return "Invalid type";
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { axiosCaller };
