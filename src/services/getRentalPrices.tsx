import axios from "axios";

const getRentalPrices = async (location: SearchLocations) => {
    const axios = require('axios');

    const { city, state_code } = location;

    const options = {
      method: 'GET',
      url: 'https://us-real-estate.p.rapidapi.com/v2/for-rent',
      params: {
        city,
        state_code
      },
      headers: {
        'X-RapidAPI-Key': '057d65a92bmsh48288fc53ec9bd8p11f49cjsnb1b5c7c8f681',
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    };

    try {
      return await axios.request(options).then((response:any) => {
        console.log("the response", response, response.data);
        const { home_search } = response.data;

        const cityData = home_search.results.map(
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

  export default getRentalPrices;