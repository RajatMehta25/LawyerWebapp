import React, { useState,useRef } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import classNames from 'classnames';
import { get, isEmpty } from "lodash";
// import { uploadImage } from "../../utils/Functions";
import axios from "../../axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import Input from "../../components/Input";
import {Loader} from "../../components/";
import TextArea from "../../components/TextArea";
import { TemplateValidator } from '../../utils/validators';
import './Add_Edit_Template.css';
import { Close } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    // marginTop: '3rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: '0.5rem 0rem',
  },
  textMiddle: {
    verticalAlign: 'middle !important',
  },
  iconMargin: {
    marginRight: '0.5rem',
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // container: {
  //   maxHeight: '65vh',
  // },
  rowPadding: {
    padding: '0.5rem 0rem',
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },
  paperHeight: {
    // height: "90vh",
  },
  paperTableHeight: {
    // height: "118%",
  },
  buttonCenter: {
    textAlign : "center"
  }
}));



const AddCategory = (props) => {
  const classes = useStyles();

  const {
    location: { state },
  } = props;


  const [submitted, setSubmitted] = useState(false);
  const [imagePath, setImagePath] = useState(get(state, "word_document", ""));
  const [isLoading,setIsloading] = useState(false);
  const [docValidation,setDocValidation] = useState(false);
  const fileRef = useRef(null);

  console.log(imagePath);

  const saveCategory = async (values) => {

    // if(imagePath === "") {
    //   alert("Upload Document is required")
    //   return false
    // }

    setIsloading(true)

    let requestData = {
      name: values.name,
      word_document: imagePath,
      description: values.description,
      service_details: values.service_details,
      price: values.price,
      sign_fee: values.sign_fee,
    };
    // console.log(requestData);

    let url = "/admin/add_template";
    if (!isEmpty(state)) {
      url = "/admin/update_template";
      requestData._id = state._id;
    }

    try {
      const { data } = await axios.post(url, requestData);
      props.history.push({
        pathname: "/template-management",
      });
      setIsloading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setIsloading(false)
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const newCategory = () => {
    setSubmitted(false);
  };

  const addOrEdit = () => {
    if (props.location.pathname === `/template-add`) {
      return `Add `;
    } else {
      return `Edit `;
    }
  };


  const uploadImage =  async  (file) => {
    setIsloading(true)
   var formData = new FormData();
   formData.append("media", file);
   try{
     const {data}  = await axios.post("/user/uploadImage",formData)
         setImagePath(data.path)
         setIsloading(false)
         return data.path
     }
     catch(error){
       setIsloading(false)
     }
   };


  return (
    <React.Fragment>
      <div className="page-content">
      <div className={classes.root}>
        <Paper>
          <div className={classes.paperPaddingRightLeft}>
            <div className={classNames("py-4", classes.paperHeight)}>
              <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingButton)}>
                <div>
                  <Button
                    variant="outlined"
                    aria-label="add"
                    className={classes.iconMargin}
                    onClick={() => {
                      if(window.confirm('Are you sure you want to leave this page?')){
                      props.history.push({
                        pathname: "/template-management",
                      });
                    }}
                  }
                  >
                    <ArrowBackIcon />
                  </Button>
                </div>
                <h2>
                  {addOrEdit()}
                  Template</h2>
                <div></div>
              </Paper>
              <Paper className={classes.paperTableHeight}>
                <Row className={classes.rowPadding}>
                  <Col xs={3}></Col>
                  <Col xs={6}>
                        <div>
                          <Formik
                            enableReinitialize
                            initialValues={{
                              name: get(state, "name", ""),
                              upload_docs : get(state, "word_document", ""),
                              price : get(state, "price", ""),
                              service_details : get(state, "service_details", ""),
                              description : get(state, "description", ""),
                              sign_fee : get(state, "sign_fee", ""),

                            }}
                            validate={(values) => TemplateValidator(values)}
                            validateOnChange
                            onSubmit={saveCategory}
                          >
                            {(formikBag) => {
                              return (
                                <Form>
                                  <Field name="name">
                                    {({ field }) => (
                                      <div className="form-group">
                                        <label htmlFor="name">
                                          Name
                                        </label>
                                        <Input
                                          {...field}
                                          type="text"
                                          className="form-control"
                                          value={formikBag.values.name}
                                          // required
                                          onChange={(e) => {
                                            console.log(formikBag);
                                            formikBag.setFieldValue(
                                              "name",
                                              e.target.value
                                            );
                                          }}
                                          error={
                                            formikBag.touched.name &&
                                              formikBag.errors.name
                                              ? formikBag.errors.name
                                              : null
                                          }
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  {imagePath !=="" && (
                                  <>
                                  <div>
                                    <Close className="text-danger float-right" onClick={()=>{setImagePath("");formikBag.setFieldValue("upload_docs","")}} style={{cursor:"pointer"}}/>
                                  <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${imagePath}`} width='100%' height='300px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>
                                    <div>
                                     <a href={`https://view.officeapps.live.com/op/embed.aspx?src=${imagePath}`} 
                                     rel="noopener noreferrer"
                                     target="_blank">Preview Document</a>
                                    </div>
                                    </div>
                                  </>
                                  )}
                                  <div className="form-group">
                                  {  imagePath===""?<label htmlFor="upload_docs">Upload Document</label>:""}
                                    <br/>
                                    
                                    <input
                                     ref={fileRef}
                                     hidden
                                      type="file"
                                      accept=".doc,.docx"
                                      className="form-control"
                                      name="upload_docs"
                                      id="upload_docs"
                                      onChange={async (e) => {
                                        console.log(formikBag);
                                        let data = await uploadImage(e.target.files[0]);
                                        formikBag.setFieldValue(
                                          "upload_docs",
                                          data
                                        );
                                        // setImagePath(data);
                                      }
                                      }
                                      error={
                                        formikBag.touched.upload_docs &&
                                          formikBag.errors.upload_docs
                                          ? formikBag.errors.upload_docs
                                          : null
                                      }
                                    />
                                 { imagePath===""?  <button
                            type="button"
                              onClick={() => {
                                fileRef.current.click();
                              }}
                              style={{
                                borderRadius: "5px",
                                backgroundColor: "#0294b3",
                                color: "white",
                                border:"none",
                                padding: "5px",
                              }}
                            >
                              Upload
                            </button>:null}
                            <div className="text-danger">{
                                        formikBag.touched.upload_docs &&
                                          formikBag.errors.upload_docs
                                          ? formikBag.errors.upload_docs
                                          : null
                                      }</div>
                                  </div>

                                  <Field name="service_details">
                                    {({ field }) => (
                                      <div className="form-group">
                                        <label htmlFor="service_details">
                                          Service Details
                                        </label>
                                        <Input
                                          {...field}
                                          type="text"
                                          className="form-control"
                                          value={formikBag.values.service_details}
                                          // required
                                          onChange={(e) => {
                                            console.log(formikBag);
                                            formikBag.setFieldValue(
                                              "service_details",
                                              e.target.value
                                            );
                                          }}
                                          error={
                                            formikBag.touched.service_details &&
                                              formikBag.errors.service_details
                                              ? formikBag.errors.service_details
                                              : null
                                          }
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  <Field name="price">
                                    {({ field }) => (
                                      <div className="form-group">
                                        <label htmlFor="price">
                                          Price
                                        </label>
                                        <Input
                                          {...field}
                                          type="number"
                                          className="form-control"
                                          value={formikBag.values.price}
                                          // required
                                          onChange={(e) => {
                                            console.log(formikBag);
                                            formikBag.setFieldValue(
                                              "price",
                                              e.target.value
                                            );
                                          }}
                                          error={
                                            formikBag.touched.price &&
                                              formikBag.errors.price
                                              ? formikBag.errors.price
                                              : null
                                          }
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  <Field name="sign_fee">
                                    {({ field }) => (
                                      <div className="form-group">
                                        <label htmlFor="sign_fee">
                                          Sign Fee
                                        </label>
                                        <Input
                                          {...field}
                                          type="number"
                                          className="form-control"
                                          value={formikBag.values.sign_fee}
                                          // required
                                          min="0"
                                          onChange={(e) => {
                                            console.log(formikBag);
                                            formikBag.setFieldValue(
                                              "sign_fee",
                                              e.target.value
                                            );
                                          }}
                                          error={
                                            formikBag.touched.sign_fee &&
                                              formikBag.errors.sign_fee
                                              ? formikBag.errors.sign_fee
                                              : null
                                          }
                                        />
                                      </div>
                                    )}
                                  </Field>

                                  <Field name="description">
                                          {({ field }) => (
                                              <div className="py-2">
                                                  <label>Description</label>
                                                  <TextArea
                                                      {...field}
                                                      type="text"
                                                      rows="3"
                                                      value={formikBag.values.description}
                                                      className="form-control"
                                                      onChange={(e) => {
                                                          formikBag.setFieldValue(
                                                            "description",
                                                            e.target.value
                                                          );
                                                        }}
                                                        error={
                                                          formikBag.touched.description &&
                                                            formikBag.errors.description
                                                            ? formikBag.errors.description
                                                            : null
                                                        }
                                                  />
                                              </div>
                                          )}
                                      </Field>

                                  <div
                                    className={classNames(
                                      "form-group",
                                      classes.buttonCenter, "mt-3"
                                    )}
                                  >
                                    <button
                                      type="submit"
                                      className="btn savebtn"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </Form>
                              )
                            }}
                          </Formik>
                        </div>
                 
                  </Col>
                  <Col xs={3}></Col>
                </Row>
              </Paper>
            </div>
          </div>
        </Paper>
      </div>
      {isLoading && (
        <Loader/>
        )}
        </div>
    </React.Fragment>
  );
};

export default AddCategory;
