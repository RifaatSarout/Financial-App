import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState , useRef} from "react";
import { Box, Button,  Typography, useTheme, TextField, MenuItem  } from "@mui/material";
import { useAdminsContext } from "../../../hooks/useAdminsContext"
import { useAuthContext } from "../../../hooks/useAuthContext"
import axios from "axios"
import "./categoryf.css"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme"
import Autocomplete from '@mui/material/Autocomplete';

const CategoryForm = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext()
  const { dispatch } = useAdminsContext()
  const [error, setError] = useState(null)
  const[added,setAdded]=useState(null)
  const [isSidebar, setIsSidebar] = useState(true);
  const types = [
    {
      value: 'incomes',
      label: 'incomes',
    },
    {
      value: 'expenses',
      label: 'expenses',
    },
  ];
  
  const types1 = [
    {
      value: 'recurring',
      label: 'recurring',
    },
    {
      value: 'fixed',
      label: 'fixed',
    },
  ];

  const handleFormSubmit =async (values) => {

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('password_confirmation', values.password_confirmation);

    console.log("formdata",formData)
     try{ 
      const response = await axios({
       url:'http://localhost:8000/api/register', 
       method: 'POST',
       headers: {
         'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${user.token}`
      },
      data: formData
     })
  
 
    const json = await response.data
     if (response.status===201) {
       setAdded("uploaded successfully")
      dispatch({type: 'CREATE_ADMIN', payload: json.message.user})
       
     }
     else{
       setError(json.error)
     }
   }
   catch{
      
         setError("error")
         setAdded(null)
   }
  };

  return (
   <div className="form">
      <div className="form1">
       <Sidebar isSidebar={isSidebar}/>
       <Topbar setIsSidebar={setIsSidebar} />
    </div>
    <div className="form2">
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
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
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
          <TextField
             id="filled-select-type"
             select
             label="Select"
             defaultValue=""
             onBlur={handleBlur}
             onChange={handleChange}
             helperText="type"
             variant="filled"
             error={!!touched.name && !!errors.name}
          >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
    <div className="form3">
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
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
           <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title&& !!errors.title}
                helperText={touched.title && errors.title}
                
            />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description&& !!errors.description}
                helperText={touched.description && errors.description}
                
            />
          <TextField
             id="filled-select-type"
             select
             label="Select"
             defaultValue=""
             onBlur={handleBlur}
             onChange={handleChange}
             helperText="type"
             variant="filled"
          >
          {types1.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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

  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  password_confirmation: yup.string().required("required"),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default CategoryForm;
