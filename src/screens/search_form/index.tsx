import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";

interface FormValues {
  data: [
    {
      city: string;
      state_code: string;
    }
  ];
}

interface SearchLocations {
  city_label: string;
  state_code: string;
  city: string;
}

const initialSearchLocations = {
    city_label: '',
    state_code: '',
    city: ''
  }
  
const initialValues = {
  city: "",
};

const userSchema = yup.object().shape({
  state: yup.string().required("required"),
});
const SearchForm = () => {
  const [city, setCity] = useState<SearchLocations[]>([initialSearchLocations]);
  let [value, setValue] = useState<string>("");

  const fetchData = async (input: string) => {
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
      const response = await axios.request(options).then((response) => {
        console.log("the response", response, response.data);
        const { data } = response.data as FormValues;

        const cityData: SearchLocations[] = data.map(
          (cityData: { city: string; state_code: string }) =>({
            city_label:`${cityData.city}, ${cityData.state_code}`,
            city: cityData.city,
            state_code: cityData.state_code

        }));
        console.log("what do we get for city data", cityData);
        return cityData;
      });
      console.log("waht is city", response);

      setCity(response);
    } catch (error) {
      console.error(error);
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px");

  const handleFormSubmit = (values: any) => {
    console.log("values", values);
  };

  const handleCitySearch = (values: any) => {
    value = values.target.value;
    fetchData(value);
    console.log("values", values.target, value);
  };

  const submitCitySearch = (values: any) => {
    value = values.target.value;
    console.log("values", values.target, value);
    setValue(value);
  };

  return (
    <Box m="20px">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr)"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.city_label}
                onChange={submitCitySearch}
                options={city}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.city_label} 
                    </Box>
                  )}
                onKeyUp={handleCitySearch}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Enter City" />
                )}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchForm;
