const coordinates = { lat: "40.4241018", lon: "-79.9246422" };
const apiKey = "73942b758339556cafe1244482aadb49";

const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.chrydan-wtwr.jumpingcrab.com"
  : "http://localhost:3001";

const weatherConditionImages = {
    day: {
        default: {
            name: "default",
            image: new URL("../assets/day/defaultday.svg", import.meta.url).href,
        },
        Clear: {
            name: "clearday",
            image: new URL("../assets/day/clearday.svg", import.meta.url).href,
        },
        Clouds: {
            name: "cloudyday",
            image: new URL("../assets/day/cloudyday.svg", import.meta.url).href,
        },
        Fog: {
            name: "fogday",
            image: new URL("../assets/day/fogday.svg", import.meta.url).href,
        },
        Snow: {
            name: "snowday",
            image: new URL("../assets/day/snowday.svg", import.meta.url).href,
        },
        Storm: {
            name: "stormday",
            image: new URL("../assets/day/stormday.svg", import.meta.url).href,
        },
        Rain: {
            name: "rainday",
            image: new URL("../assets/day/rainday.svg", import.meta.url).href,
        },
    },
    night:{
        default: {
            name: "default",
            image: new URL("../assets/night/defaultnight.svg", import.meta.url).href,
        },

        Clear: {
            name: "clearnight",
            image: new URL("../assets/night/clearnight.svg", import.meta.url).href,
        },
        Clouds: {
            name: "cloudynight",
            image: new URL("../assets/night/cloudynight.svg", import.meta.url).href,
        },
        Fog: {
            name: "fognight",
            image: new URL("../assets/night/fognight.svg", import.meta.url).href,
        },
        Snow: {
            name: "snownight",
            image: new URL("../assets/night/snownight.svg", import.meta.url).href,
        },
        Storm: {
            name: "stormnight",
            image: new URL("../assets/night/stormnight.svg", import.meta.url).href,
        },
        Rain: {
            name: "rainnight",
            image: new URL("../assets/night/rainnight.svg", import.meta.url).href,
        },
    },
};

export {coordinates, apiKey, weatherConditionImages, baseUrl};