import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import getLocations from "../../services/searchLocation";
import getRentalPrices from "../../services/getRentalPrices";
import { useDebouncer } from "../global/useDebouncer";
import RentalProperty from "../../components/RentalProperty";

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
  city_label: "",
  state_code: "",
  city: "",
};

const initialValues = {
  city: "",
};

const userSchema = yup.object().shape({
  city_label: yup.string().required("required"),
});
const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<SearchLocations[]>([initialSearchLocations]);
  const [location, setLocation] = useState<SearchLocations>(initialSearchLocations)
  const [loading, setLoading] = useState(false);
  console.log("what is the query", query);
  const searchQuery = useDebouncer({ value: query, time: 2000 });

  const searchCharacter = async () => {
    setCity([initialSearchLocations]);
    setLoading(true);
    const data = await getLocations(searchQuery).then((response) => {
      response ? setCity(response) : setCity([initialSearchLocations]);
  });
    setLoading(false);
  };

  const isNonMobile = useMediaQuery("(min-width:600px");

  const handleFormSubmit = async (values: any) => {
    console.log("values", values, location);
    const rentals =  await getRentalPrices(location);
  };

  const handleChangeValue = async (event:any, city:SearchLocations) => {
    console.log('what are the values', event, city)
    console.log('what is the city right now', city)
    setLocation(city);

  }

  useEffect(() => {
    if (searchQuery || query.trim().length < 0) searchCharacter();
  }, [searchQuery, location]);

  return (
    <Box m="20px">
      <Formik
        initialValues={initialSearchLocations}
        onSubmit={(
            values:SearchLocations,
            { setSubmitting }: FormikHelpers<{city_label: string, city: string,state_code: string }>
          ) => {
            setTimeout(() => {
                handleFormSubmit(values)
            //   alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
              }}
            >
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(option) => option.city_label}
                options={city}
                onChange={handleChangeValue}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.city_label}
                  </Box>
                )}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter City"
                    onChange={(event) => setQuery(event.target.value)}
                    value={city}
                  />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Search City
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
        <Box>
            <RentalProperty/>
        </Box>
    </Box>
  );
};

export default SearchForm;
