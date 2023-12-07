import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import getLocations from "../../services/searchLocation";
import { useDebouncer } from "../global/useDebouncer";

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
  state: yup.string().required("required"),
});
const SearchForm = () => {
  const [query, setQuery] = useState("");
//   const [listing, setListing] = useState("");
  const [city, setCity] = useState<SearchLocations[]>([initialSearchLocations]);
  const [loading, setLoading] = useState(false);
//   const controllerRef = useRef();
console.log('what is the query', query)
// if(query) {
    const searchQuery = useDebouncer({value: query, time:2000});
// }

const searchCharacter = async() => {
    setCity([initialSearchLocations])
    setLoading(true);
    const data = await getLocations(searchQuery).then((response) => response ? setCity(response) : setCity([initialSearchLocations]));
    setLoading(false)
}

  const isNonMobile = useMediaQuery("(min-width:600px");

  const handleFormSubmit = (values: any) => {
    console.log("values", values);
  };

  useEffect(() => {
    if(searchQuery || query.trim().length < 0) searchCharacter();
    
  }, [searchQuery])

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
                options={city}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.city_label}
                  </Box>
                )}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Enter City"  onChange={(event) => setQuery(event.target.value)} value={query} />
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
