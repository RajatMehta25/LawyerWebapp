import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import { at, set, values } from 'lodash-es';
import { get } from "lodash";
import { find } from 'lodash'
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import './AddEditAttributes.css';
import axios from "../../axios";
import { arrayUnshift } from 'redux-form';




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
    color: "#696969",
    backgroundColor: "#fff"

  },
  iconcolor: {
    margin: '0.5rem',
    color: "#fff",
    backgroundColor: "#0294b3 !important"
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "10px"
  },
  headingAlignment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: "0 2rem 0 2rem"
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  addNewCategory: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  addNewCategoryHeading: {
    textAlign: "center",
    flex: 1,
    paddingBottom: "0 !important",
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection: 'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',

    }

  },
  MarginControl: {
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0 !important"
    }
  },
  Marginbutton: {
    margin: "0.5rem"
  },
  container: {
    maxHeight: '58vh',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },

}));


const AddEditAttributes = (props) => {



  const {
    location: { state },
  } = props;

  const classes = useStyles();
  console.log("props", props);

  console.log(state);

  //
  const [attributeData, setAttributeData] = useState([]);

  // data for post
  const [attributeDataPost, setAttributeDataPost] = useState([]);
  const [newdata, setnewdata] = useState([]);
  const [attributeDataPost2, setAttributeDataPost2] = useState([]);


  //Validation Schema

  const validationSchema = yup.object({
    fieldType: yup.string().required("This field is Required!"),
    //numberOfAtributes: yup.string().required("This field is Required"),
    title: yup.string().matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!").required("Name is Required!"),
    placeholder: yup.string().matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!").required("Placeholder is Required!"),
    // validation: yup.string().matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!").required("Validation Message is Required!"),
    // isRequired: yup.string().required("This field is Required!"),

  });





  const [object, setObject] = useState([]);
  const [object2, setObject2] = useState([]);

  useEffect(() => { getCategoriesContent() }, []);

  //get content
  const getCategoriesContent = async () => {
    try {
      const { data } = await axios.get("/admin/get_categories");
      console.log(data);
      setAttributeData(data.user)

      if (typeof (state) === 'string') {

        var var12 = data.user.filter(function (id) { return id._id === state })
        console.log(var12);
        var var13 = {
          category_id: var12[0]._id,
          fields: var12[0].fields,
          name: var12[0].name,
          desc: var12[0].desc,
          // isRequired: "false"
        }
        console.log(var13);
        setObject(var13)
      }
      else {
        var var19 = data.user.filter(function (id) { return id._id === state[2] })
        // console.log(var19);
        var var20 = {
          category_id: var19[0]._id,
          fields: var19[0].fields,
          name: var19[0].name,
          desc: var19[0].desc,
          // isRequired: "false"
        }
        // console.log(var20);
        setObject2(var20)


      }
    }
    catch (error) {
      console.log(error);
    }

  }
  console.log(attributeData);//shows ,all values
  console.log(object);//shows ,all values



  console.log(state);
  console.log(object)

  console.log(state[0]);
  console.log(object2);


  const addnew = async (values) => {
    if (typeof (state) === "string") {
      let var14 = {
        category_id: object.category_id,
        fields: [...object.fields, values],
        name: object.name,
        desc: object.desc,
      }
      console.log(object);
      // adding

      try {
        const { data } = await axios.post("/admin/update_category", var14);
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.history.push({
          pathname: "/EditCategoryAttributes",
          state: state
        });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      let obj = object2;
      console.log(obj);
      obj.fields[state[1]] = values;
      setObject2(obj)
      console.log(object2);
      try {
        const { data } = await axios.post("/admin/update_category", object2);
        console.log(object2);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.history.push({
          pathname: "/EditCategoryAttributes",
          state: state
        });

      } catch (error) {
        console.log(error);
      }

    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.addNewCategory)}>
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        if (window.confirm('Leave without saving changes?')) {
                          props.history.push({
                            pathname: "/EditCategoryAttributes",
                            state: state
                          });

                        }


                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)} > <h3 className={classNames(classes.MarginControl)} style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}>{console.log(state)}{typeof (state) === 'string' ? `Add New Attribute` : `Edit Attribute`}</h3></div>
                </Paper>
                <Paper style={{}}>
                  <div style={{ margin: "0rem 0 2rem 0" }}>
                    <Formik
                      validationSchema={validationSchema}
                      initialValues={{

                        fieldType: get(state[0], "fieldType", ""),
                        title: get(state[0], "title", ""),
                        placeholder: get(state[0], "placeholder", ""),
                        isRequired: get(state[0], "isRequired", ""),
                        validation: get(state[0], "validation", ""),

                      }}
                      onSubmit={(values) => {

                        // if (state&&state!=="")
                        // { 
                        //     Edit(values)
                        // }else {

                        addnew(values)

                        // }

                        console.log(values);
                      }}
                    >
                      {({ values }) => (
                        <div style={{}}>
                          <Form  >
                            <div className="customContainer" >
                              <div className="custom_div1">
                                <label className="labelAddAttribute" style={{ fontSize: "18px" }}>Type of Attribute:</label>
                                <Field className="fieldAddAttribute" name="fieldType" as="select">
                                  <option value="">Select</option>
                                  <option value="textarea">TextArea</option>
                                  <option value="dropdown">DropDown</option>
                                  <option value="checkBox">CheckBox</option>
                                </Field>
                                <KErrorMessage name="fieldType" />

                                {/* <br />  */}

                                <label className="labelAddAttribute" style={{ fontSize: "18px" }}>Name of Attribute:</label>
                                <Field className="fieldAddAttribute" name="title" type="text" placeholder="Name" />
                                <KErrorMessage name="title" />
                                {/* <br />  */}
                                <div><label className="labelAddAttribute" style={{ fontSize: "18px" }}>Placeholder:</label>
                                  <Field className="fieldAddAttribute" name="placeholder" type="text" placeholder="Placeholder" />
                                  <KErrorMessage name="placeholder" /></div>
                              </div>
                              <div className="custom_div2">

                                <label className="labelAddAttribute" style={{ fontSize: "18px" }}>CheckBox Required:</label>
                                <Field className="fieldAddAttribute" name="isRequired" as="select">
                                  <option value="">Select</option>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </Field>
                                <KErrorMessage name="isRequired" />

                                {/*           
            <label className="labelAddCategory" style={{fontSize:"20px"}}>CheckBox Required:</label>
            
            <label  style={{fontSize:"20px"}}>Yes: &emsp;</label>
            <Field   name="isRequired" value="true" type="radio" />&emsp;
            <label  style={{fontSize:"20px"}}>No: &emsp;</label>
            <Field  name="isRequired" value="false" type="radio" />
            <KErrorMessage name="isRequired" /> */}
                                {/* <br/> */}
                                {values.isRequired === "true" || values.isRequired === true
                                  ?
                                  <>
                                    <label className="labelAddAttribute" style={{ fontSize: "18px" }}>Validation Message:</label>
                                    <Field className="fieldAddAttribute" name="validation" type="text" />
                                    <KErrorMessage name="validation" />
                                  </>
                                  :
                                  ""}
                                <br /><br />
                              </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0 20px 0" }}><button type="submit" className="buttoncss" style={{ borderRadius: "1.5rem", border: "none", fontSize: "1rem", width: "15vw", height: "5vh", backgroundColor: "#0294b3", color: "#fff" }}>Save</button></div>
                          </Form>
                        </div>
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

export default AddEditAttributes;


