import { env } from "../../../__env.js";

export default function setSettingEndpoint(endpoint) {
    return {
        async: true,
        crossDomain: true,
        url: `${env.RAPID_API_BASE_URL}${endpoint}?locale=frFR`,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": `${env.RAPID_API_KEY}`,
            "X-RapidAPI-Host": `${env.RAPID_API_HOST}`,
        },
    };
}
