import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { Formik, Form, Field} from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get } from "lodash";

// import './AddEditCategory.css'




const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: 'wrap',
      // marginTop: '5rem',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    paperHeading: {
        padding: '1rem 0rem',
    },
    table: {
        minWidth: 650,
    },
    textMiddle: {
        verticalAlign: 'middle !important',
    },
    iconMargin: {
      margin: '0.5rem',
      color:"#696969",
      backgroundColor: "#fff" 
      
    },
    iconcolor:{
      margin: '0.5rem',
      color:"#fff",
      backgroundColor: "#0294b3 !important"
    },
    headingButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: "10px"
    },
    headingAlignment:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // padding: "0 2rem 0 2rem"
      alignItems: 'center',
      flexWrap: 'wrap',
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        flexDirection:'column',
        width: '100%',
        gap: '1rem',
        justifyContent: 'center',
        textAlign: 'center',
      }
    },
    addNewCategory:{
display: 'flex',
alignItems: 'center',
flexWrap: 'wrap',
['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
  flexDirection:'column',
  width: '100%',
  gap: '1rem',
  justifyContent: 'center',
  textAlign: 'center',
}
    },
    addNewCategoryHeading:{
textAlign:"center",
flex:1,
paddingBottom:"0 !important",
['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
  flexDirection:'column',
  width: '100%',
  gap: '1rem',
  justifyContent: 'center',
  textAlign: 'center',

}

    },
    MarginControl:{
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0 !important"}
    },
    Marginbutton:{
      margin: "0.5rem" 
    },
    container: {
      maxHeight: '58vh',
    },
    paperPaddingRightLeft: {
      padding: '0rem 1rem',
      
    },
  }));
  

const AddEditServiceCategory = (props) => {


    const classes = useStyles();
   

//  data from previous page

const {
    location: { state },
  } = props;



//Validation Schema

const validationSchema = yup.object({
   
   name: yup.string().required("Name is Required!")
//    desc: yup
//    .string()
//    .min(5, "too small!")
//    .max(500, "Too Long String!")
//    .required("Required!"),
    
  
   
  });


  // ADDING NEW CATEGORY

  const addNewCategory = async(values) => {
try {
    console.log(values);

    const { data } = await axios.post("/admin/create_service_name", {serviceName:values.name});
    props.history.push({
        pathname: "/Service_Category_Management",
      });
    toast.success(data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  console.log(data);
 
} catch (error) {
    console.log(error)
}
    
}

  
// Edit Category . update api

const EditCategory = async(values) => {
    try {
        console.log(values);
    
        const { data } = await axios.post("/admin/update_service_name", {serviceNameId:state._id,serviceName:values.name});
        props.history.push({
            pathname: "/Service_Category_Management",
          });
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      console.log(data);
     
    } catch (error) {
        console.log(error)
    }
        
    }



  return (
    <React.Fragment>
      <div className="page-content">
    <div className={classes.root}>
      <Paper>
        <div className={classes.paperPaddingRightLeft}>
          <div className="py-4">
              <Paper elevation={0} className={classNames(classes.paperHeading,classes.addNewCategory )}>
              <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        if(window.confirm('Leave without saving changes?')){
                            props.history.push({
                                pathname: "/Service_Category_Management",
                                
                              });

                        }
                        
                        
                       
                        
                     
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                 <div className={classNames(classes.addNewCategoryHeading)} > <h3 className={classNames(classes.MarginControl)} style={{marginBottom:"-0.5rem",marginLeft:"-135px"}}>{console.log(state)}{ !state?`ADD NEW SERVICE CATEGORY`:`EDIT SERVICE CATEGORY`}</h3></div>
              
                
              </Paper>

               {/* //new design */}

            


           {/* status end */}
            

              <Paper style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
              <div style={{margin:"2rem 0 2rem 0"}}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
            
       
          name:   get(state, "serviceName", "")
        //   desc: get(state, "desc", ""),
        
       
        }}
        onSubmit={(values) => {
          console.log(values);
          if (state&&state!=="undefined") 
          { 
              EditCategory(values)
          }else {
            
              addNewCategory(values)
          }
        }}
      >
        {({ values }) => (
          <Form>
            
            <label className="labelAddCategory" style={{fontSize:"20px"}}>Name of Service Category:</label>
            <Field className="fieldAddCategory" name="name" type="text"   />
            <KErrorMessage name="name" />
            <br /> <br />
            {/* <label className="labelAddCategory" style={{fontSize:"20px"}}>Description of Category:</label>
            <Field className="fieldAddCategory custom_height" name="desc" as="textarea"  /> */}
            {/* <KErrorMessage name="desc" /> */}
            {/* <br /> <br /> */}
         
            <br/><br/>
            <div style={{display:"flex",justifyContent:"center"}}><button type="submit" className="buttoncss" style={{borderRadius:"1.5rem",border:"none",fontSize:"1rem",width:"15vw",height:"5vh",backgroundColor:"#0294b3",color:"#fff"}}>SAVE</button></div>
          </Form>
        )}
      </Formik>
    </div>
              </Paper>
          </div>
        </div>
      </Paper>
    </div>
    </div>
  </React.Fragment>

  );
}

export default AddEditServiceCategory;


