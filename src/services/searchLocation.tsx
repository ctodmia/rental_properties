import axios from "axios";

const getLocations = async (input: string) => {
    const options = {
      method: "GET",
      url: "https://us-real-estate.p.rapidapi.com/location/suggest",
      params: { input: input },
      headers: {
        "X-RapidAPI-Key": "057d65a92bmsh48288fc53ec9bd8p11f49cjsnb1b5c7c8f681",
        "X-RapidAPI-Host": "us-real-estate.p.rapidapi.com",
      },
    };

    try {
      return await axios.request(options).then((response) => {
        console.log("the response", response, response.data);
        const { data } = response.data;

        const cityData: SearchLocations[] = data.map(
          (cityData: { city: string; state_code: string }) =>({
            city_label:`${cityData.city}, ${cityData.state_code}`,
            city: cityData.city,
            state_code: cityData.state_code

        }));
        console.log("what do we get for city data", cityData);
        return cityData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  export default getLocations;