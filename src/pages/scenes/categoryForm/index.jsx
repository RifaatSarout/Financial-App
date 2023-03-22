import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState} from "react";
import { Box, Button,TextField, MenuItem  } from "@mui/material";
import { useCategoriesContext } from "../../../hooks/useCategoryContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import InputLabel from '@mui/material/InputLabel'
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./categoryf.css"

const CategoryForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext()
  const { dispatch } = useCategoriesContext()
  const [error, setError] = useState(null)
  const[added,setAdded]=useState(null)
  const [isSidebar, setIsSidebar] = useState(true);
  const [emptyFields, setEmptyFields] = useState([])

  const handleFormSubmit =async (values) => {

    if (!user) {
      setError('You must be logged in')
      return
    }
    const created_by = user.user.id;
    const category = {name:values.name,type:values.type,created_by}
    const body =JSON.stringify(category)
     const response = await fetch('http://localhost:8000/api/categories', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      values.name=""
      values.type=""
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CATEGORY', payload: json})
    }
    
    
  };

  return (
   <div className="formCategory">
      <div className="formCategory1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="formCategory2">
    <Box m="20px">
      <div className="mosh">
        <Header title="Add Category" subtitle="" />
      </div>
     <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="1rem"
              gridTemplateColumns="repeat(1, minmax(0, 2fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
           <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                
            />
       <FormControl>
        <InputLabel id="type">Type</InputLabel>
        <Select
          fullWidth
          variant="filled"
          labelId="type"
          id="type"
          value={values.type}
          label="Type"
          onChange={handleChange}
          name="type"
          onBlur={handleBlur}
        >
          <MenuItem value={'expenses'}>Expenses</MenuItem>
          <MenuItem value={'incomes'}>Incomes</MenuItem>
        </Select>
      </FormControl>

         
       </Box>
        <Box ml="32.5rem" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </div>
    </div>
  
  );
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),

});
const initialValues = {
  name: "",
  type:""
};

export default CategoryForm;
