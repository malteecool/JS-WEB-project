import axios from "axios";
const config = require("./config");


let api = axios.create({
    headers: {
        'Client-ID': config.TWITCH.clientID,
        'Authorization': config.TWITCH.authorization
    }
});

export default api;