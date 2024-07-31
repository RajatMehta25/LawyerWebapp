import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, Tooltip } from "@material-ui/core";
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
import { ButtonBox, SubmitButton } from "../Press/PressElement";
import Cookies from "js-cookie";
// import { handleImageUpload } from "../../services/upload-files-service";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import { Description } from "@material-ui/icons";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
// import startsWith from "lodash.startswith";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import { subAdminEmailValidator } from "../../utils/validators";
// import ReverseMd5 from "reverse-md5";
// import useNewHook from "../../services/NewHook";

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

const AddEdit_SubAdmin = (props) => {
  const classes = useStyles();

  //  data from previous page

  useEffect(() => {
    // getactivemenuitem();
  }, []);
  const {
    location: { state },
  } = props;
  console.log(props);

  const Panes = [
    // { panelName: "Dashboard" },

    { panelName: "Subscribed User Listing" },

    { panelName: "Account Management" },
    { panelName: "Question Category Management" },
    { panelName: "Subscription Management" },
    // { panelName: "SubAdmin Management" },
    { panelName: "Blog Management" },
    { panelName: "Notification Management" },
    { panelName: "Member Price Management" },
    { panelName: "Press Management" },
    { panelName: "Testimonial Management" },
    { panelName: "FAQ Management" },
    { panelName: "Content Management" },
    { panelName: "Accounting" },
    { panelName: "Support" },
  ];
  const [panesData, setPanesData] = useState(Panes);
  const [PanesDataFinal, setPanesDataFinal] = useState([]);
  var FinalData;

  const token = Cookies.get("admin_access_token");
  //Validation Schema

  // Edit Category . update api

  // handle checkbox click
  const handleCheckboxClick = (e) => {
    console.log(e.target);
    const { name, checked } = e.target;
    // console.log(id);

    console.log(name);

    if (name === "ALL") {
      let tempuser = panesData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(tempuser);
      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      setPanesDataFinal(FinalData);
      //   var SubAdminPanesDataID=SubAdminPanesData.map(user=>user._id);
    } else {
      let tempuser = panesData.map((user) => (user.panelName === name ? { ...user, isChecked: checked } : user));

      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      setPanesDataFinal(FinalData);

      console.log(FinalData);
      console.log(SubAdminPanesData);
    }
  };

  //handle state checkbox click
  // handle checkbox click
  useEffect(() => {
    state && getcheckboxdata();
  }, []);

  const getcheckboxdata = () => {
    let checkbox0 = state.access.map((user) => {
      return { panelName: user, isChecked: true };
    });

    let merged = [...checkbox0, ...Panes.filter((user) => !state.access.includes(user.panelName))];
    setPanesDataFinal(state.access);

    // let checkbox1=checkbox0.concat(Panes)
    // console.log(checkbox1);

    console.log(merged);
    setPanesData(merged);
  };
  //  var data1;
  const handleSateCheckboxClick = (e) => {
    console.log(e.target);
    const { name, checked, value } = e.target;
    // console.log(id);
    console.log(value);
    console.log(checked);
    console.log(name);

    if (name === "ALL") {
      let tempuser = panesData.map((user) => {
        return { ...user, isChecked: checked };
      });
      console.log(tempuser);
      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);

      setPanesDataFinal(FinalData);
    } else {
      let tempuser = panesData.map((user) => (user.panelName === name ? { ...user, isChecked: checked } : user));

      setPanesData(tempuser);
      let SubAdminPanesData = tempuser.filter((user) => user?.isChecked === true);
      console.log(SubAdminPanesData);
      FinalData = SubAdminPanesData.map((user) => user?.panelName);
      console.log(FinalData);
      setPanesDataFinal(FinalData);

      console.log();
      console.log(SubAdminPanesData);
    }
  };

  // ADDING NEW SUB-ADMIN

  const addNewSubAdmin = async (values) => {
    try {
      console.log(values);

      console.log(PanesDataFinal);
      const { data } = await axios.post("/admin/createSubAdmin", {
        email: values.email,

        access: PanesDataFinal,
      });
      props.history.push({
        pathname: "/SubAdmin_Management",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //Edit SubAdmin
  console.log(PanesDataFinal);
  const EditSubAdmin = async (values) => {
    try {
      console.log(values);

      console.log(PanesDataFinal);
      const { data } = await axios.post("/admin/updateSubAdmin", {
        subAdminId: values._id,

        email: values.email,

        // subAdmin_id: values.sub_admin_id || state.subAdmin_id,

        access: PanesDataFinal,
      });
      props.history.push({
        pathname: "/SubAdmin_Management",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const decodepass = async (pass) => {};
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
                            pathname: "/SubAdmin_Management",
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
                      {!state ? `ADD NEW SUB-ADMIN` : `EDIT SUB-ADMIN`}
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
                    enableReinitialize
                      validate={subAdminEmailValidator}
                      initialValues={{
                        email: get(state, "email", ""),
                        _id: get(state, "_id", ""),
                      }}
                      onSubmit={(values) => {
                        console.log(values);
                        if (state && state !== "") {
                          if (PanesDataFinal.length < 1) {
                            alert("Please Select atleast one Panel");
                          } else {
                            EditSubAdmin(values);
                          }
                        } else if (PanesDataFinal.length < 1) {
                          alert("Please Select atleast one Panel");
                        } else {
                          addNewSubAdmin(values);
                        }
                      }}
                    >
                      {({ values, setFieldValue }) => (
                        <Form>
                          <Paper elevation={0} className="px-5">
                            <br />
                            <br />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                gap: "1.5%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-evenly",
                                  gap: "0.5%",
                                  alignItems: "baseline",
                                }}
                              >
                                {/* <br /> */}
                                <label className="" style={{}}>
                                  Email:
                                </label>

                                <Field
                                  className=""
                                  name="email"
                                  type="email"
                                  autoComplete="off"
                                  style={{
                                    width: 300,
                                    height: 35,
                                    borderRadius: 5,
                                    borderColor: "#d3d3d3",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    paddingInlineStart: 10,
                                  }}
                                  disabled={!state ? false : true}
                                />

                                <KErrorMessage name="email" />
                                <br />
                                {/* <br /> */}
                              </div>
                            </div>
                          </Paper>
                          {/* <br />
                          <br /> */}
                          <Paper elevation={0}>
                            <br />
                            <br />
                            <label
                              style={{
                                fontSize: "20px",
                                display: "block",
                                textAlign: "center",
                              }}
                            >
                              Access for Panels :
                            </label>
                            <br />
                            <div
                              style={{
                                // display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:"10%",margin:"5px 20px 5px 20px"
                                display: "grid",
                                gridTemplateColumns: "auto auto auto",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  marginRight: 20,
                                  marginLeft: 20,
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  // className="checkedcolor"

                                  color="primary"
                                  name="ALL"
                                  checked={panesData.filter((user) => user?.isChecked !== true).length < 1}
                                  onChange={handleCheckboxClick}
                                />

                                <label style={{ marginBottom: 0 }}>Select All</label>
                              </div>
                              {!state
                                ? panesData.map((pane, index) => (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginRight: 20,
                                          marginLeft: 20,
                                          alignItems: "center",
                                        }}
                                      >
                                        <Checkbox
                                          key={index}
                                          // className="checkedcolor"
                                          color="primary"
                                          name={pane.panelName}
                                          checked={pane?.isChecked || false}
                                          onChange={handleCheckboxClick}
                                        />
                                        <label style={{ display: "block", marginBottom: 0 }} key={index + 1}>
                                          {pane.panelName}
                                        </label>
                                      </div>
                                    </>
                                  ))
                                : panesData.map((pane, index) => (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginRight: 20,
                                          marginLeft: 20,
                                          alignItems: "center",
                                        }}
                                      >
                                        <Checkbox
                                          key={index}
                                          color="primary"
                                          name={pane.panelName}
                                          checked={pane?.isChecked || false}
                                          onChange={handleSateCheckboxClick}
                                          value={pane.panelName}
                                        />
                                        <label style={{ display: "block", marginBottom: 0 }} key={index + 1}>
                                          {pane.panelName}
                                        </label>
                                      </div>
                                    </>
                                  ))}
                            </div>
                            <br />
                            <br />
                          </Paper>
                          {/* <KErrorMessage  /> */}
                          <br />
                          <br />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ButtonBox>
                              <SubmitButton type="submit">Save</SubmitButton>
                            </ButtonBox>
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

export default AddEdit_SubAdmin;
