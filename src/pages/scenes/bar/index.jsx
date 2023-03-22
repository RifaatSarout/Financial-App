import React from "react";

import  { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useCategoriesContext } from "../../../hooks/useCategoryContext"
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Box, Button,TextField, MenuItem  } from "@mui/material";


const BarSarah = ({Dashboard = false}) => {
  const {categories, dispatch} = useCategoriesContext();
  const [frequency, setFrequency] = React.useState('');
  const {user} = useAuthContext();

  const data = [
    {
      "name": "Page A",
      "pv": 2400
    },
    {
      "name": "Page B",
      "pv": 1398
    },
    {
      "name": "Page C",
      "pv": 9800
    },
    {
      "name": "Page D",
      "pv": 3908
    },
    {
      "name": "Page E",
      "pv": 1890,
 
    },
    {
      "name": "Page F",
      "pv": 2390,
    },
    {
      "name": "Page G",
      "pv":234,
    }
  ]
  

  const [state, setState] = useState({
    labels: [],
    amount: []
  });
  const handleChange= async(e) => {
    setFrequency(e.target.value);
    console.log(frequency)
    let labels = []
    let data = []
    const url = 'http://localhost:8000/api/categories/getNetProfit/' + '/' + frequency
    const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })  
        const json = await response.json();
    
 
  };

  /////

  
  return (
    <Box m="20px">
    <Header title="Bar Chart" subtitle="Simple Bar Chart" />
    <div style={{display:'flex',flexDirection:'row', gap:'5rem',}} >
    <Box height="75vh" >
     <BarChart width={1000} height={730} data={data}>
     <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Legend />
       <Bar dataKey="pv" fill="#8884d8" />
     </BarChart>
    </Box>
  <div style={{}} >
    <FormControl width="100wh">
                <InputLabel id="frequency">frequency</InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="frequency"
                    id="frequency"
                    label="frequency"
                    onChange={handleChange}
                    name="frequency"
                 >
                  <MenuItem value={'week'}>Week</MenuItem>
                  <MenuItem value={'month'}>Month</MenuItem>
                  <MenuItem value={'year'}>Year</MenuItem>
                 </Select>
              </FormControl>
    </div>
    </div>
  </Box>
 
);
}

    



export default BarSarah;
