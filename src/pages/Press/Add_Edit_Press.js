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
import Input from "../../components/Input"
// import './AddEditCategory.css'
import { pressValidator } from "../../utils/validators"
import { MainBox, InnerBox, CommonRow, CommonLabel, CommonBox, InputArea, ButtonBox, SubmitButton, UploadRow, UploadCommon, CommonDouble, CopyButton, InfoButton, InfoBox, InfoTitle, InfoImageBox, InfoImage } from "./PressElement"
import "./press.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JoditEditor from "jodit-react";
import { Modal } from '../../components/Modal/Modal';
import stepsImage from "../../assets/images/steps.png"
import Overlay from "../../components/Overlay";
import "./press.css"
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

  const [dropOptions, setDropOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isInfo, setIsInfo] = useState(false)
  const fileRef = useRef(null);
  const dateCal = () => {
    console.log("helo")
    let arr = [];
    for (var input = 2020; input <= 2030; input++) {
      arr[arr.length] = { label: input.toString(), value: input.toString() };
    }
    setDropOptions(arr);
  }
  const [profileImagepath, setProfileImagepath] = useState(get(state, "image", ""));
  const [pressValues, setPressValues] = useState({
    yearDate: get(state, "year", new Date()),
    title: get(state, "title", ""),
    image: get(state, "image", ""),
    description: get(state, "description", ""),
    link: get(state, "link", ""),
    _id: get(state, "_id", "")
  })
  const SubmitPress = async (values) => {
    console.log(values);
    setIsLoading(true)
    let pressData = {
      title: values.title,
      image: values.image,
      description: values.description,
      year: values.yearDate,
      link: values.link,
      _id: values._id
    }
    if (values._id) {
      try {
        const { data } = await axios.post("/admin/updatePress", pressData)
        console.log(data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false)
        props.history.push("/press-management");
      } catch (error) {
        setIsLoading(false)
        toast.error(`${error.data.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    else {
      try {
        const { data } = await axios.post("/admin/createPress", {
          title: values.title,
          image: values.image,
          description: values.description,
          year: values.yearDate,
          link: values.link,
        })
        console.log(data);
        setIsLoading(false)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.history.push("/press-management");
      } catch (error) {
        setIsLoading(false)
        toast.error(`${error.data.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }

  useEffect(() => {
    dateCal()
  }, [])

  const [startDate, setStartDate] = useState();
  console.log(startDate)
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
                        if (window.confirm("Leave without saving changes?")) {
                          props.history.push({
                            pathname: "/press-management",
                          });
                        }
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3 className={classNames(classes.MarginControl)} style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}>
                      {console.log(state)}
                      {!state ? `Add New Press` : `Edit Press`}
                    </h3>
                  </div>
                </Paper>
                <Formik
                  enableReinitialize
                  initialValues={pressValues}
                  validate={vals => pressValidator(vals)}
                  validateOnChange
                  onSubmit={SubmitPress}
                >
                  {(formikBag) => {
                    return (
                      <Form className={classes.formStyleOnly}>
                        <MainBox>
                          <InnerBox>
                            <CommonDouble>
                              <CommonRow>
                                <CommonLabel>Date:</CommonLabel>
                                <CommonBox>
                                  <Field name="yearDate">
                                    {({ field }) => (
                                      <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        selected={new Date(formikBag.values.yearDate)}
                                        onChange={(date) => formikBag.setFieldValue("yearDate", date)}
                                        className="form-control"
                                        placeholderText="Select Date"
                                        minDate={new Date()}

                                      />
                                    )}
                                  </Field>
                                  {formikBag.errors.yearDate && formikBag.touched.yearDate ? (
                                    <p
                                      style={{
                                        paddingTop: 5,
                                        fontSize: 13,
                                        color: "red",
                                      }}
                                    >
                                      {formikBag.errors.yearDate}
                                    </p>
                                  ) : null}
                                </CommonBox>
                              </CommonRow>
                              <CommonRow>
                                <CommonLabel>Title:</CommonLabel>
                                <CommonBox>
                                  {/* <Input type="text" className="form-control" placeholder="Title" /> */}
                                  <Field name="title">
                                    {({ field }) => (
                                      <Input
                                        {...field}
                                        type="text"
                                        value={formikBag.values.title}
                                        onChange={(e) => {
                                          formikBag.setFieldValue("title", e.target.value);
                                        }}
                                        error={
                                          formikBag.touched.title &&
                                            formikBag.errors.title
                                            ? formikBag.errors.title
                                            : null
                                        }
                                        className="form-control"
                                        placeholder="Title"
                                      />
                                    )}
                                  </Field>
                                </CommonBox>
                              </CommonRow>
                            </CommonDouble>
                            <CommonDouble>
                              <CommonRow>
                                <UploadRow>
                                  <UploadCommon
                                  >
                                    <CommonLabel>
                                      Image :
                                    </CommonLabel>
                                    <CommonLabel style={{ color: "#c2c2c2" }}>
                                      {/* <button onClick={() =>  navigator.clipboard.writeText(profileImagepath)}>Copy</button> */}
                                      Optional
                                    </CommonLabel>
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
                                        let data = await uploadImage(e.target.files[0]);
                                        // console.log(data);
                                        // console.log(e.target.files[0]);
                                        console.log(data);
                                        formikBag.setFieldValue("image", data);
                                        setProfileImagepath(data)
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
                                    {
                                      profileImagepath === "" && (
                                        <WallpaperIcon
                                          style={{
                                            height: "100px",
                                            width: "100px",
                                            objectFit: "cover",
                                            borderRadius: "5px"
                                          }}
                                        />
                                      )
                                    }
                                    {
                                      profileImagepath !== "" && (
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                          <img
                                            src={profileImagepath}
                                            alt="..."
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              objectFit: "cover",
                                              borderRadius: "5px"
                                            }}
                                          />
                                          <div style={{ display: "flex" }}>
                                            <CopyButton onClick={() => {
                                              navigator.clipboard.writeText(profileImagepath).then(function () {
                                                toast.success("Copied to clipboard.", {
                                                  position: toast.POSITION.TOP_RIGHT,
                                                });
                                              }, function (err) {
                                                toast.error("Could not copy text.", {
                                                  position: toast.POSITION.TOP_RIGHT,
                                                });
                                              });;
                                              // alert("Copied")
                                            }}>
                                              <i class="ph-copy-simple-bold" style={{ fontSize: "1.3rem" }}></i>
                                            </CopyButton>
                                            <InfoButton onClick={() => setIsInfo(true)}>
                                              <i class="ph-info-bold"></i>
                                            </InfoButton>
                                          </div>
                                        </div>
                                      )
                                    }
                                  </UploadCommon>
                                </UploadRow>
                              </CommonRow>
                              <CommonRow>
                                <CommonLabel>Link:</CommonLabel>
                                <CommonBox>
                                  {/* <Input type="text" className="form-control" placeholder="Optional" /> */}
                                  <Field name="link">
                                    {({ field }) => (
                                      <Input
                                        {...field}
                                        type="text"
                                        value={formikBag.values.link}
                                        onChange={(e) => {
                                          formikBag.setFieldValue("link", e.target.value);
                                        }}
                                        // error={
                                        //   formikBag.touched.link &&
                                        //     formikBag.errors.link
                                        //     ? formikBag.errors.link
                                        //     : null
                                        // }
                                        className="form-control"
                                        placeholder="Optional"
                                      />
                                    )}
                                  </Field>
                                </CommonBox>
                              </CommonRow>
                            </CommonDouble>
                            <CommonRow style={{ width: "100%" }}>
                              <CommonLabel>Description:</CommonLabel>
                              <CommonBox className="customLineHeight" >
                                <Field name="description">
                                  {({ field }) => (
                                    <JoditEditor
                                      value={formikBag.values.description}
                                      onChange={(newContent) => {
                                        // SettingData(newContent);
                                        formikBag.setFieldValue("description", newContent);
                                      }}
                                    />
                                  )}
                                </Field>
                                {formikBag.errors.description && formikBag.touched.description ? (
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
      <Modal
        className="update_profile"
        isOpen={isInfo}
        onClose={() => {
          setIsInfo(false)
        }}
        // fullWidth
        maxWidth='300px'
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setIsInfo(false)
              }}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
        }
        content={
          <>
        <InfoBox>
          {/* <InfoTitle>Information</InfoTitle> */}
          <InfoImageBox>
            <InfoImage src={stepsImage}/>
          </InfoImageBox>
        </InfoBox>
          </>
        }
      />
		  {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default AddEdit_Press;
