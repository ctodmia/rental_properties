import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import getLocations from '../../services/searchLocation';


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

export const useDebouncer = (props: {value:string, time:number}) => {
const {value, time } = props
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, time);
 
    return () => {
      clearTimeout(handler);
    };
  }, [value, time]);
 
  return debouncedValue;
}

