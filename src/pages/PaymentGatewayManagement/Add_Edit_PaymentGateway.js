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
import { get } from "lodash";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { uploadImage } from "../../utils/Functions";
import RSelect from "react-select";
// import './AddEditCategory.css'

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

const AddEdit_PaymentGateway = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;
  const [spinnerDisplay, setSpinnerDisplay] = useState(false);
  const fileRef = useRef(null);
  const [profileImagepath, setProfileImagepath] = useState("");
  const [captureMerchantFields, setMerchantFields] = useState([]);
  let merchantOptions = [
    { label: "merchantId", value: "merchantId" },
    { label: "publicKey", value: "publicKey" },
    { label: "privateKey", value: "privateKey" },
    { label: "stripePkTest", value: "stripePkTest" },
    { label: "stripeSkTest", value: "stripeSkTest" },
    { label: "paypalClientId", value: "paypalClientId" },
  ];
  //Validation Schema
  useEffect(() => {
    if (state === undefined || state === "") {
    } else {
      setMerchantFields(
        state?.fields.map((e) => ({
          label: e.key,
          value: e.key,
        }))
      );
    }
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required!"),
    //    desc: yup
    //    .string()
    //    .min(5, "too small!")
    //    .max(500, "Too Long String!")
    //    .required("Required!"),
  });

  // ADDING NEW CATEGORY

  const addNewPaymentGateway = async (values) => {
    try {
      console.log(values);

      const { data } = await axios.post("/admin/paymentGetway", {
        title: values.name,
        icon: values.file1,
        user_guide: [
          {
            position: 1,
            image: "https://happytaxi.s3.us-east-2.amazonaws.com/11391113082022.png",
            discription:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ],
        fields: values.captureFieldValues,
      });
      props.history.push({
        pathname: "/payment-gateway",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Category . update api

  const EditPaymentGateway = async (values) => {
    console.log(captureMerchantFields)
    console.log(values);
    try {
      const { data } = await axios.put(`/admin/paymentGetway/${state._id}`, {
        title: values.name || state.title,
        icon: values.file1 || state.icon,
        user_guide: state.user_guide,
        fields: values.captureFieldValues || state.fields,
      });
      props.history.push({
        pathname: "/payment-gateway",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(captureMerchantFields);

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
                            pathname: "/payment-gateway",
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
                      {!state ? `Add New Payment Gateway` : `Edit Payment Gateway`}
                    </h3>
                  </div>
                </Paper>

                {/* //new design */}

                {/* status end */}

                <Paper
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ margin: "2rem 0 2rem 0" }}>
                    <Formik
                      validationSchema={validationSchema}
                      initialValues={{
                        name: get(state, "title", ""),
                        captureFieldValues: get(state, "fields", []).map((v) => ({ key: v.key })),

                        file1: get(state, "icon", ""),
                        // description: get(state, "description", ""),
                      }}
                      onSubmit={(values) => {
                        console.log(values);
                        if (state && state !== "") {
                          EditPaymentGateway(values);
                        } else {
                          addNewPaymentGateway(values);
                        }
                      }}
                    >
                      {({ values, setFieldValue }) => (
                        <Form>
                          <div className="row my-5 align-items-center">
                            <div className="col-4">
                              <label className="labelAddCategory" style={{ fontSize: "18px", padding: "5px" }}>
                                {!state ? `Gateway Name` : `Gateway Name`} :
                              </label>
                            </div>
                            <div className="col-8 d-flex flex-column">
                              <Field
                                className=""
                                name="name"
                                type="text"
                                style={{
                                  width: "85%",
                                  height: "40px",
                                  borderRadius: "5px",
                                  border: "1px solid #c4c4c4",
                                  padding: "5px",
                                }}
                              />
                              <KErrorMessage name="name" />
                            </div>
                          </div>
                          <div className="row my-5 align-items-center">
                            <div
                              className="col-4"
                            // style={{ marginRight: "-50px" }}
                            >
                              <label className="" style={{ fontSize: "18px" }}>
                                Gateway Image :
                              </label>
                            </div>
                            <div className="col-4">
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
                                  setFieldValue("file1", data);
                                  setProfileImagepath(data);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  fileRef.current.click();
                                }}
                                style={{
                                  borderRadius: "5px",
                                  backgroundColor: "#0294b3",
                                  color: "white",
                                  border: "none",
                                  padding: "5px",
                                }}
                              >
                                Upload
                              </button>
                            </div>
                            <div className="col-4">
                              {
                                !state && profileImagepath === "" && (
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
                              {console.log(profileImagepath)}
                              {
                                //  !state&&profileImagepath==="" &&( <WallpaperIcon/>)

                                !state && profileImagepath !== "" && (
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
                                )
                              }
                              {state && values.file1 !== "" && (
                                <img src={values.file1} alt="..." style={{ width: "100px", height: "100px" }} />
                              )}
                              <KErrorMessage name="file1" />
                            </div>
                          </div>
                          <div className="row my-5 align-items-center">
                            <div className="col-4">
                              <label className="labelAddCategory" style={{ fontSize: "18px", padding: "5px" }}>
                                {!state ? `Gateway Fields` : `Gateway Fields`} :
                              </label>
                            </div>
                            <div className="col-8 d-flex flex-column">
                              {!state ? (
                                <>
                                  <RSelect
                                    isMulti
                                    value={captureMerchantFields}
                                    options={merchantOptions}
                                    onChange={(e) => {
                                      console.log(e);
                                      setMerchantFields(e);
                                      setFieldValue(
                                        "captureFieldValues",
                                        e?.map((v) => ({ key: v.value }))
                                      );
                                    }}
                                  />
                                  <KErrorMessage name="captureFieldValues" />
                                </>
                              ) : (
                                <>
                                  {/* ( */}
                                  <RSelect
                                    isMulti
                                    value={captureMerchantFields}
                                    options={merchantOptions}
                                    onChange={(e) => {
                                      console.log(e);
                                      setMerchantFields(e);
                                      setFieldValue(
                                        "captureFieldValues",
                                        e?.map((v) => ({ key: v.value }))
                                      );
                                    }}
                                  // isDisabled={true}
                                  />
                                  <KErrorMessage name="captureFieldValues" />
                                  {/* ) */}
                                </>
                              )}
                            </div>
                          </div>
                          <br /> <br />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="submit"
                              className="buttoncss"
                              style={{
                                borderRadius: "1.5rem",
                                border: "none",
                                fontSize: "1rem",
                                width: "15vw",
                                height: "5vh",
                                backgroundColor: "#0294b3",
                                color: "#fff",
                              }}
                            >
                              Save
                            </button>
                          </div>
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
};

export default AddEdit_PaymentGateway;
