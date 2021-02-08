import axios from "axios";

export default axios.create({
    baseUrl: "http://localhost:3001/",
    headers: {
        "Content-type": "application/json"
    }
})