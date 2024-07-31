import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get, isEmpty } from "lodash";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { uploadImage } from "../../utils/Functions";
import RSelect from "react-select";
import Input from "../../components/Input";
// import './AddEditCategory.css'
import { testValidator } from "../../utils/validators";
import {
  MainBox,
  InnerBox,
  CommonRow,
  CommonLabel,
  CommonBox,
  InputArea,
  ButtonBox,
  SubmitButton,
  UploadRow,
  UploadCommon,
} from "./TestElement";
import "./testimonial.css";
import Overlay from "../../components/Overlay";
const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    // marginTop: '5rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: "1rem 0rem",
  },
  table: {
    minWidth: 650,
  },
  textMiddle: {
    verticalAlign: "middle !important",
  },
  iconMargin: {
    margin: "0.5rem",
    color: "#696969",
    backgroundColor: "#fff",
  },
  iconcolor: {
    margin: "0.5rem",
    color: "#fff",
    backgroundColor: "#0294b3 !important",
  },
  headingButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
  },
  headingAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: "0 2rem 0 2rem"
    alignItems: "center",
    flexWrap: "wrap",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  addNewCategory: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  addNewCategoryHeading: {
    textAlign: "center",
    flex: 1,
    paddingBottom: "0 !important",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  MarginControl: {
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "0 !important",
    },
  },
  Marginbutton: {
    margin: "0.5rem",
  },
  container: {
    maxHeight: "58vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));

const AddEdit_Press = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;

  const fileRef = useRef(null);
  const [profileImagepath, setProfileImagepath] = useState(
    get(state, "image", "")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pressValues, setPressValues] = useState({
    clientName: get(state, "clientName", ""),
    image: get(state, "image", ""),
    description: get(state, "description", ""),
    location: get(state, "location", ""),
    _id: get(state, "_id", ""),
  });
  const SubmitTest = async (values) => {
    console.log(values);
    setIsLoading(true);
    let pressData = {
      clientName: values.clientName,
      image: values.image,
      description: values.description,
      location: values.location,
      _id: values._id,
    };
    if (values._id) {
      try {
        const { data } = await axios.post(
          "/admin/updateTestimonial",
          pressData
        );
        console.log(data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        props.history.push("/testimonial-management");
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error.data.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      try {
        const { data } = await axios.post("/admin/createTestimonial", {
          clientName: values.clientName,
          image: values.image,
          description: values.description,
          location: values.location,
        });
        console.log(data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.history.push("/testimonial-management");
      } catch (error) {
        toast.error(`${error.data.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.addNewCategory
                  )}
                >
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        if (window.confirm("Leave without saving changes?")) {
                          props.history.push({
                            pathname: "/testimonial-management",
                          });
                        }
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3
                      className={classNames(classes.MarginControl)}
                      style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}
                    >
                      {console.log(state)}
                      {!state ? `Add New Testimonial` : `Edit Testimonial`}
                    </h3>
                  </div>
                </Paper>
                <Formik
                  enableReinitialize
                  initialValues={pressValues}
                  validate={(vals) => testValidator(vals)}
                  validateOnChange
                  onSubmit={SubmitTest}
                >
                  {(formikBag) => {
                    return (
                      <Form className={classes.formStyleOnly}>
                        <MainBox>
                          <InnerBox>
                            <CommonRow>
                              <CommonLabel>Client Name:</CommonLabel>
                              <CommonBox>
                                {/* <Input type="text" className="form-control" placeholder="Title" /> */}
                                <Field name="clientName">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="text"
                                      value={formikBag.values.clientName}
                                      onChange={(e) => {
                                        formikBag.setFieldValue(
                                          "clientName",
                                          e.target.value
                                        );
                                      }}
                                      error={
                                        formikBag.touched.clientName &&
                                        formikBag.errors.clientName
                                          ? formikBag.errors.clientName
                                          : null
                                      }
                                      className="form-control"
                                      placeholder="Client Name"
                                    />
                                  )}
                                </Field>
                              </CommonBox>
                            </CommonRow>
                            <CommonRow>
                              <UploadRow>
                                <UploadCommon>
                                  <CommonLabel>Image :</CommonLabel>
                                </UploadCommon>
                                <UploadCommon className="col-4">
                                  <input
                                    ref={fileRef}
                                    name="file1"
                                    hidden
                                    type="file"
                                    accept="image/png, image/jpeg , image/jpg"
                                    onChange={async (e) => {
                                      // let data = await handleImageUpload(
                                      //   e.target.files[0]
                                      let data = await uploadImage(
                                        e.target.files[0]
                                      );
                                      // console.log(data);
                                      // console.log(e.target.files[0]);
                                      console.log(data);
                                      formikBag.setFieldValue("image", data);
                                      setProfileImagepath(data);
                                    }}
                                  />
                                  <SubmitButton
                                    type="button"
                                    onClick={() => {
                                      fileRef.current.click();
                                    }}
                                  >
                                    Upload
                                  </SubmitButton>
                                </UploadCommon>
                                <UploadCommon>
                                  {profileImagepath === "" && (
                                    <WallpaperIcon
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  )}
                                  {profileImagepath !== "" && (
                                    <img
                                      src={profileImagepath}
                                      alt="..."
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  )}
                                </UploadCommon>
                              </UploadRow>
                              <CommonBox>
                                {formikBag.errors.image &&
                                formikBag.touched.image ? (
                                  <p
                                    style={{
                                      paddingTop: 5,
                                      fontSize: 13,
                                      color: "red",
                                    }}
                                  >
                                    {formikBag.errors.image}
                                  </p>
                                ) : null}
                              </CommonBox>
                            </CommonRow>
                            <CommonRow>
                              <CommonLabel>
                                Description (
                                <spans
                                  style={{
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  Max 500 Characters
                                </spans>
                                ):
                              </CommonLabel>
                              <CommonBox>
                                <Field name="description">
                                  {({ field }) => (
                                    <InputArea
                                      {...field}
                                      type="text"
                                      value={formikBag.values.description}
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
                                      className="form-control"
                                      placeholder="Description"
                                    />
                                  )}
                                </Field>
                                {formikBag.errors.description &&
                                formikBag.touched.description ? (
                                  <p
                                    style={{
                                      paddingTop: 5,
                                      fontSize: 13,
                                      color: "red",
                                    }}
                                  >
                                    {formikBag.errors.description}
                                  </p>
                                ) : null}
                              </CommonBox>
                            </CommonRow>
                            <CommonRow>
                              <CommonLabel>Location:</CommonLabel>
                              <CommonBox>
                                {/* <Input type="text" className="form-control" placeholder="Optional" /> */}
                                <Field name="location">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="text"
                                      value={formikBag.values.location}
                                      onChange={(e) => {
                                        formikBag.setFieldValue(
                                          "location",
                                          e.target.value
                                        );
                                      }}
                                      error={
                                        formikBag.touched.location &&
                                        formikBag.errors.location
                                          ? formikBag.errors.location
                                          : null
                                      }
                                      className="form-control"
                                      placeholder="Location"
                                    />
                                  )}
                                </Field>
                              </CommonBox>
                            </CommonRow>
                            <ButtonBox>
                              <SubmitButton type="submit">Save</SubmitButton>
                            </ButtonBox>
                          </InnerBox>
                        </MainBox>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default AddEdit_Press;
