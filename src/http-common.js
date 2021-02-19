import axios from "axios";

export default axios.create({
    baseUrl: "http://localhost:3000/",
    headers: {
        "Content-type": "application/json"
    }
})