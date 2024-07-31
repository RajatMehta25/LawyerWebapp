import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";
import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import { at, set, values } from "lodash-es";
import { get } from "lodash";
import { find } from "lodash";
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import "./AddEditBlog.css";
import axios from "../../axios";
import { arrayUnshift } from "redux-form";
// import { CategoryBox, CatRow, CatLabel, ButtonBox, CatButton, CatTitle } from "./BlogElements";

import { uploadImage } from "../../utils/Functions";
import JoditEditor from "jodit-react";
import { blogValidator } from "../../utils/validators";
import FileInputNew from "../../components/FileInputNew";
import Input from "../../components/Input";
import Overlay from "../../components/Overlay";

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
  CommonDouble,
  CopyButton,
  InfoButton,
  InfoBox,
  InfoTitle,
  InfoImageBox,
  InfoImage,
} from "./BlogNewElement";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import LexicalEditor from "../../LexicalEditor/index";

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

const AddEditAttributes = (props) => {
  const {
    location: { state },
  } = props;


  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const classes = useStyles();
  console.log("props", props);

  console.log(state);
  const fileRef = useRef(null);
  const [profileImagepath, setProfileImagepath] = useState(get(state, "image", ""));
  //
  const [attributeData, setAttributeData] = useState([]);
  const [isInfo, setIsInfo] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [blogData, setBlogData] = useState({
    title: get(state, "title", ""),
    details_description: get(state, "details_description", null),
    image: get(state, "image", "") ? [get(state, "image", "")] : [],
    short_description: get(state, "short_description", ""),
    _id: get(state, "_id", ""),
  });

  const handleCat = async (values) => {
    setIsLoading(true);
    if (values._id) {
      try {
        const { data } = await axios.patch("/admin/update_blog", {
          blog_id: values._id,
          title: values.title,
          image: values.image[0],
          short_description: values.short_description,
          details_description: values.details_description,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        props.history.push({ pathname: `/Blog` });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        // setBlogOpen(false);
      }
    } else {
      try {
        const { data } = await axios.post("/admin/create_blog", {
          title: values.title,
          image: values.image[0],
          short_description: values.short_description,
          details_description: values.details_description,
        });
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        props.history.push({ pathname: `/Blog` });
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
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
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.addNewCategory)}>
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        if (window.confirm("Leave without saving changes?")) {
                          props.history.push({
                            pathname: "/Blog",
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
                      {!state ? `Add New Blog` : `Edit Blog`}
                    </h3>
                  </div>
                </Paper>
                <Paper style={{}}>
                  <div style={{ margin: "0rem 0 2rem 0" }}>
                    <Formik
                      enableReinitialize
                      initialValues={blogData}
                      validateOnChange
                      onSubmit={(values) => {
                        handleCat(values);
                      }}
                      validate={blogValidator}
                    >
                      {(formikBag) => {
                        return (
                          <Form className={classes.formStyleOnly}>
                            <MainBox>
                              <InnerBox>
                                <CommonRow style={{ width: "100%" }}>
                                  <CommonLabel>Title:</CommonLabel>
                                  <CommonBox>
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
                                            formikBag.touched.title && formikBag.errors.title ? formikBag.errors.title : null
                                          }
                                          className="form-control"
                                          placeholder="Title"
                                        />
                                      )}
                                    </Field>
                                  </CommonBox>
                                </CommonRow>
                                <div className="col-md-12">
                          <label>Image</label>
                          <Field name="image">
                            {({ field }) => (
                              <div className="py-2">
                                <FileInputNew
                                  id="facility_images"
                                  limit="1"
                                  dictionary="dictionary"
                                  images={formikBag.values.image}
                                  onDelete={(image) => {
                                    var images = [...formikBag.values.image];
                                    images.splice(images.indexOf(image), 1);
                                    formikBag.setFieldValue("image", images);
                                  }}
                                  type="text"
                                  label="upload_products_facility_photos"
                                  info="eg_img"
                                  onChange={async (e) => {
                                    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
                                    if (fileSize > 2) {
                                      alert("ex_2mb");
                                      // $(file).val(''); //for clearing with Jquery
                                    } else {
                                      setIsLoading(true);
                                      var image = await uploadImage(e.target.files[0]);
                                      var images = [...formikBag.values.image];
                                      console.log("images..........", images.path);
                                      images.push(image);
                                      formikBag.setFieldValue("image", images);

                                      setIsLoading(false);
                                    }
                                  }}
                                  error={formikBag.touched.image && formikBag.errors.image ? formikBag.errors.image : null}
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                                {/* <CommonRow style={{ width: "100%" }}>
                                  <UploadRow>
                                    <UploadCommon>
                                      <CommonLabel>Image :</CommonLabel>
                                      <CommonLabel style={{ color: "#c2c2c2" }}></CommonLabel>
                                    </UploadCommon>
                                    <UploadCommon className="col-4">
                                      <input
                                        ref={fileRef}
                                        name="file1"
                                        hidden
                                        type="file"
                                        accept="image/png, image/jpeg , image/jpg"
                                        onChange={async (e) => {
                                          let data = await uploadImage(e.target.files[0]);
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
                                        <div style={{ display: "flex", alignItems: "center" }}>
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
                                          <div style={{ display: "flex" }}>
                                            <CopyButton
                                              onClick={() => {
                                                navigator.clipboard.writeText(profileImagepath).then(
                                                  function () {
                                                    toast.success("Copied to clipboard.", {
                                                      position: toast.POSITION.TOP_RIGHT,
                                                    });
                                                  },
                                                  function (err) {
                                                    toast.error("Could not copy text.", {
                                                      position: toast.POSITION.TOP_RIGHT,
                                                    });
                                                  }
                                                );
                                                // alert("Copied")
                                              }}
                                            >
                                              <i class="ph-copy-simple-bold" style={{ fontSize: "1.3rem" }}></i>
                                            </CopyButton>
                                            <InfoButton onClick={() => setIsInfo(true)}>
                                              <i class="ph-info-bold"></i>
                                            </InfoButton>
                                          </div>
                                        </div>
                                      )}
                                    </UploadCommon>
                                  </UploadRow>
                                  <CommonBox>
                                    {formikBag.errors.image && formikBag.touched.image ? (
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
                                </CommonRow> */}
                                <CommonRow style={{ width: "100%" }}>
                                  <CommonLabel>Short Description:</CommonLabel>
                                  <CommonBox>
                                    <Field name="short_description">
                                      {({ field }) => (
                                        <InputArea
                                          {...field}
                                          type="text"
                                          value={formikBag.values.short_description}
                                          onChange={(e) => {
                                            formikBag.setFieldValue("short_description", e.target.value);
                                          }}
                                          error={
                                            formikBag.touched.short_description && formikBag.errors.short_description
                                              ? formikBag.errors.short_description
                                              : null
                                          }
                                          className="form-control"
                                          placeholder="Short Description"
                                        />
                                      )}
                                    </Field>
                                    {formikBag.errors.short_description && formikBag.touched.short_description ? (
                                      <p
                                        style={{
                                          paddingTop: 5,
                                          fontSize: 13,
                                          color: "red",
                                        }}
                                      >
                                        {formikBag.errors.short_description}
                                      </p>
                                    ) : null}
                                  </CommonBox>
                                </CommonRow>
                                <CommonRow style={{ width: "100%" }}>
                                  <CommonLabel>Detailed Description:</CommonLabel>

                                  <LexicalEditor
                                    initialEditorState={formikBag.values.details_description}
                                    onChange={(editorState, editorInstance) => {
                                      formikBag.setFieldValue("details_description", editorState);
                                    }}
                                  />
                                  {formikBag.errors.details_description ? (
                                    <p
                                      style={{
                                        paddingTop: 5,
                                        fontSize: 13,
                                        color: "red",
                                      }}
                                    >
                                      {formikBag.errors.details_description}
                                    </p>
                                  ) : null}
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
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default AddEditAttributes;
