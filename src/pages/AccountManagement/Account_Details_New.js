import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import classNames from "classnames";
import axios from "../../axios";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { get, isEmpty } from "lodash";

import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Field, Form } from "formik";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Account_Management.css";
import { GolfCourseRounded } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
// import { Formik, Field, Form } from "formik";
import {
  DisBox,
  DisRow,
  FirstBox,
  SecondBox,
  SubmitBox,
  DisApproveTitle,
  TextLabel,
  AppButton,
  DisRowIn,
  CrossRow,
  CrossBox,
  CrossIcon,
  DetailBox,
  BoxOne,
  ImageBox,
  DetailImage,
  UserNameBox,
  BoxTwo,
} from "./AccountElement";
import { Checkbox } from "@material-ui/core";
import Label from "reactstrap/lib/Label";
import { disAppValidator } from "../../utils/validators";
import no_Profile from "../../assets/images/local_profile.jpg";
import no_firm_logo from "../../assets/images/companies/placeholder-logo.png";

import Overlay from "../../components/Overlay";
const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    // marginTop: "3rem",
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: "1rem 0.5rem",
  },
  textMiddle: {
    verticalAlign: "middle !important",
  },
  iconMargin: {
    marginRight: "0.5rem",
  },
  headingButton: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    maxHeight: "62vh",
  },
  rowPadding: {
    padding: "2rem 2rem",
  },
  headingCenter: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisplay: {
    display: "flex",
  },
  anchorColor: {
    color: "#ffffff",
  },
  headingSeller: {
    backgroundColor: "#0294B3",
    color: "#ffffff",
    padding: "0.4rem",
    borderRadius: "0.2rem",
    width: "100%",
  },
  paperMargin: {
    marginBottom: "2rem",
  },
  buttonColorApprove: {
    backgroundColor: "#0288d1",
  },
  paperWidth: {
    width: "100%",
  },
  accordianMargin: {
    marginBottom: "1rem",
  },
  paddingStoreImage: {
    paddingTop: "1rem",
    paddingBottom: "2rem",
  },
  resistrationDisplay: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  searchPending: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searchHeight: {
    height: "2.3rem",
    marginRight: "0.7rem",
    width: "39%",
  },
  searchHeightPending: {
    height: "2.3rem",
    marginRight: "0.7rem",
    // width: "39%"
  },
  headingSellerDetails: {
    display: "flex",
  },
  headingAlign: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0rem",
  },
  marginZero: {
    margin: "0",
  },
  paddingButton: {
    marginRight: "0.5rem",
  },
  accordianHeading: {
    display: "flex",
    justifyContent: "center",
  },
  imageUpperMargin: {
    marginTop: "1.5rem",
  },
  marginHeading: {
    marginBottom: "1.5rem",
  },
  checkedCenter: {
    textAlign: "center",
  },
}));

const AddDetails = (props) => {
  const classes = useStyles();

  const [toggle, setToggle] = useState(false);
  const [ApproveDisapproveButton, setApproveDisapproveButton] = useState(true);
  const [open, setOpen] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportValue, setReportedValue] = useState({
    first_Name: "",
    last_Name: "",
    user_email: "",
    mobile_Number: "",
    user_business_logo: "",
    user_firm_name: "",
    first_Name_check: false,
    last_Name_check: false,
    user_email_check: false,
    mobile_Number_check: false,
    user_business_logo_check: false,
    user_firm_name_check: false,
  });
  const {
    location: { state },
  } = props;
  console.log(state);
  // console.log(props);

  useEffect(() => {
    if (
      state.userType.title === "Agent Representative" ||
      state.userType.title === "Management Company Representative"
    ) {
      setToggle(true);
    }
  }, [state]);

  console.log(props.location.state._id);

  // const saveCategorydisApprove = async (e) => {
  //   // let approveStatus = e;
  //   // let requestData = {
  //   //   _id: props.location.state_id,
  //   //   isapproved: 2,
  //   // };

  //   let url = "/admin/new_approve_dissapprove_user";

  //   try {
  //     // const { data } = await axios.post(url, requestData);
  //     const { data } = await axios.post(url, { _id: props.location.state._id, isapproved: 2 });
  //     props.history.push({
  //       pathname: "/account-managment-new",
  //       state7: state.userType._id,
  //     });
  //     toast.success(data.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveCategoryApprove = async (e) => {
    // let approveStatus = e;
    // let requestData = {
    // _id: props.location.state_id,
    // isapproved: 1,
    // };
    setIsLoading(true);
    let url = "/admin/new_approve_dissapprove_user";

    try {
      const { data } = await axios.post(url, {
        _id: props.location.state._id,
        isapproved: 1,
      });
      props.history.push({
        pathname: "/account-managment-new",
        state7: state.userType._id,
      });
      setIsLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  const buttonCheck = (id) => {
    switch (id.userType._id) {
      case "61b0df509d05e9e75bdf4fc3":
        setApproveDisapproveButton(false);
        break;
      case "61b0df509d05e9e75bdf4fc7":
        setApproveDisapproveButton(false);
        break;
      case "61b0df509d05e9e75bdf4fc8":
        setApproveDisapproveButton(false);
        break;

      default:
        setApproveDisapproveButton(false);
        break;
    }
    // console.log(id.userType._id);
  };

  useEffect(() => {
    buttonCheck(state);
  }, [state]);

  const colorApproveButton = (value) => {
    if (value === 1) {
      return "green";
    } else if (value === 0) {
      return "yellow";
    } else if (value === 2) {
      return "green";
    }
  };
  const TextcolorApproveButton = (value) => {
    if (value === 1) {
      return "white";
    } else if (value === 0) {
      return "black";
    } else if (value === 2) {
      return "white";
    }
  };
  const colorDisapproveButton = (value) => {
    if (value === 1) {
      return "#0294b3";
    } else if (value === 0) {
      return "yellow";
    } else if (value === 2) {
      return "red";
    }
  };
  const TextcolorDisapproveButton = (value) => {
    if (value === 1) {
      return "white";
    } else if (value === 0) {
      return "black";
    } else if (value === 2) {
      return "white";
    }
  };
  // Disapprove
  const handleDisapprove = async (values) => {
    console.log("hi");
    console.log(values);
    setIsLoading(true);
    const formValues = {
      _id: state._id,
      isapproved: 2,
      error_first_Name:
        values.first_Name_check == true
          ? { error: true, errorMessage: values.first_Name }
          : undefined,
      error_last_Name:
        values.last_Name_check == true
          ? { error: true, errorMessage: values.last_Name }
          : undefined,
      error_user_email:
        values.user_email_check == true
          ? { error: true, errorMessage: values.user_email }
          : undefined,
      error_mobile_Number:
        values.mobile_Number_check == true
          ? { error: true, errorMessage: values.mobile_Number }
          : undefined,
      error_user_business_logo:
        values.user_business_logo_check == true
          ? { error: true, errorMessage: values.user_business_logo }
          : undefined,
      error_user_firm_name:
        values.user_firm_name_check == true
          ? { error: true, errorMessage: values.user_firm_name }
          : undefined,
    };
    console.log(formValues);
    if (
      !values.first_Name_check &&
      !values.last_Name_check &&
      !values.user_email_check &&
      !values.mobile_Number_check &&
      !values.user_business_logo_check &&
      !values.user_firm_name_check
    ) {
      return alert("Please select at least one checkbox");
    } else {
      try {
        const { data } = await axios.post(
          "/admin/new_approve_dissapprove_user",
          formValues
        );
        console.log(data);
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        props.history.push({
          pathname: "/account-managment-new",
          state7: state.userType._id,
        });
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error.data.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  // PopUp
  const handleClose = () => {
    setOpen("");
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className="container">
              <div className={classNames("py-4", classes.paperHeight)}>
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingButton
                  )}
                >
                  <div className={classes.resistrationDisplay}>
                    <div className={classes.headingSellerDetails}>
                      <Button
                        variant="outlined"
                        aria-label="add"
                        className={classes.iconMargin}
                        onClick={() => {
                          props.history.push({
                            pathname: "/account-managment-new",
                            state7: state.userType._id,
                          });
                        }}
                      >
                        <ArrowBackIcon />
                      </Button>
                    </div>
                    <h2 className={classes.headingCenter}>User Details</h2>

                    <div className={classes.searchPending}>
                      {ApproveDisapproveButton ? (
                        <div
                          className={classNames(
                            "form-group",
                            classes.headingCenter,
                            classes.marginZero
                          )}
                        >
                          {/* <div className={classes.paddingButton}>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              style={{
                                backgroundColor: "green",
                                border: "none",
                                // cursor: "not-allowed",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              onClick={() => {
                                // saveCategorydisApprove();
                                setOpen(true)
                              }}
                              style={{
                                backgroundColor: "#0294b3",
                                border: "none",
                              }}
                            >
                              Disapprove
                            </button>
                          </div> */}
                        </div>
                      ) : state.userType.title === "Lawyer" &&
                        state.isProfileComplete &&
                        state.isapproved == 0 ? (
                        <div
                          className={classNames(
                            "form-group",
                            classes.headingCenter,
                            classes.marginZero
                          )}
                        >
                          <div className={classes.paddingButton}>
                            <button
                              className={classNames(
                                "btn btn-success",
                                classes.buttonColorApprove
                              )}
                              style={{
                                backgroundColor: colorApproveButton(
                                  state.isapproved
                                ),
                                color: TextcolorApproveButton(state.isapproved),
                                border: "none",
                                // cursor: "not-allowed",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                              // disabled={true}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames(
                                "btn btn-success",
                                classes.buttonColorApprove
                              )}
                              onClick={() => {
                                // saveCategorydisApprove();
                                setOpen(true);
                              }}
                              style={{
                                backgroundColor: colorDisapproveButton(
                                  state.isapproved
                                ),
                                color: TextcolorDisapproveButton(
                                  state.isapproved
                                ),
                                border: "none",
                                // cursor: "not-allowed",
                              }}
                              // disabled={true}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      ) : (
                        false
                      )}
                    </div>
                    {/* </> */}
                    {/* ) */}
                    {/* } */}
                  </div>
                </Paper>
                <Paper>
                  <Row className={classes.rowPadding}>
                    <Col xs={12}>
                      <div className="submit-form">
                        <div>
                          <Formik
                            enableReinitialize
                            initialValues={{
                              // Restaurant Details
                              name:
                                get(state, "firstName", "N/A") +
                                " " +
                                get(state, "lastName", "N/A"),
                              firstName: get(state, "firstName", "N/A"),
                              lastName: get(state, "lastName", "N/A"),
                              imdbLink: get(state, "imdbLink", "N/A"),
                              userType: get(state, "userType.title", "N/A"),
                              email: get(state, "email", "N/A"),
                              countryCode: get(state, "countryCode", "N/A"),
                              mobileNumber:
                                get(state, "countryCode", "N/A") +
                                get(state, "mobileNumber", "N/A"),
                              is_free_subscribed: get(
                                state,
                                "is_free_subscribed",
                                false
                              ),
                              is_paid_subscribed: get(
                                state,
                                "is_paid_subscribed",
                                false
                              ),
                              planPurchased: get(
                                state,
                                "planType.plans.planType",
                                "N/A"
                              ),
                              firm_name: get(state, "firm_name", "N/A"),
                              business_logo: get(state, "business_logo", "N/A"),
                              profile_image: get(state, "profileImage", ""),
                            }}
                            validate={(values) => console.log(values)}
                            validateOnChange
                            // onSubmit={saveCategory}
                          >
                            {(formikBag) => {
                              return (
                                <Form>
                                  {/* <Accordion className={classes.accordianMargin} defaultExpanded>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    > */}
                                  <h5 className={classes.headingSeller}>
                                    User Details
                                  </h5>
                                  {/* </AccordionSummary> */}
                                  <AccordionDetails>
                                    <Paper
                                      elevation={0}
                                      className={classes.paperWidth}
                                    >
                                      <DetailBox>
                                        <BoxOne>
                                          <ImageBox>
                                            <DetailImage
                                              src={
                                                formikBag.values
                                                  .profile_image || no_Profile
                                              }
                                            />
                                          </ImageBox>
                                          <UserNameBox>
                                            {formikBag.values.name}
                                          </UserNameBox>
                                        </BoxOne>
                                        <BoxTwo>
                                          <div className="row with_label">
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>First Name</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={
                                                        formikBag.values
                                                          .firstName
                                                      }
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Last Name</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={
                                                        formikBag.values
                                                          .lastName
                                                      }
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                          </div>
                                          <div className="row with_label">
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Phone Number</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={
                                                        formikBag.values
                                                          .mobileNumber
                                                      }
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>

                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Email</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={
                                                        formikBag.values.email
                                                      }
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Imdb Link</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={
                                                        formikBag.values
                                                          .imdbLink
                                                          ? formikBag.values
                                                              .imdbLink
                                                          : "N/A"
                                                      }
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            {/* <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Free Subscribed</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={formikBag.values.is_free_subscribed ? "Yes" : "No"}
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Credit</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={formikBag.values.is_paid_subscribed ? "Yes" : "No"}
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Subscription Plan</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={formikBag.values.is_free_subscribed ? "Free trial" : formikBag.values?.planPurchased}
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div> */}

                                            {state.userType.title ===
                                            "Lawyer" ? (
                                              <>
                                                {/* firm name  */}
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Firm Name</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              ?.firm_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Business Logo
                                                        </label>
                                                        <br />
                                                        <img
                                                          height={60}
                                                          width={60}
                                                          src={
                                                            formikBag.values
                                                              ?.business_logo ||
                                                            no_firm_logo
                                                          }
                                                          alt="logo"
                                                          // className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </BoxTwo>
                                      </DetailBox>
                                    </Paper>
                                  </AccordionDetails>
                                  {/* </Accordion> */}
                                </Form>
                              );
                            }}
                          </Formik>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {state.userType.title === "Lawyer" ? (
                    <Row className={classes.rowPadding}>
                      <Col xs={12}>
                        <div className="submit-form">
                          <div>
                            <Formik
                              enableReinitialize
                              initialValues={{
                                bank_name: get(
                                  state,
                                  "bank_details.bank_name",
                                  "N/A"
                                ),
                                bank_routing_number: get(
                                  state,
                                  "bank_details.bank_routing_number",
                                  "N/A"
                                ),
                                beneficiary_account: get(
                                  state,
                                  "bank_details.beneficiary_account",
                                  "N/A"
                                ),
                                beneficiary_name: get(
                                  state,
                                  "bank_details.beneficiary_name",
                                  "N/A"
                                ),
                                bank_address: get(
                                  state,
                                  "bank_details.bank_address",
                                  "N/A"
                                ),
                                swift_code: get(
                                  state,
                                  "bank_details.swift_code",
                                  "N/A"
                                ),
                              }}
                              validate={(values) => console.log(values)}
                              validateOnChange
                              // onSubmit={saveCategory}
                            >
                              {(formikBag) => {
                                return (
                                  <Form>
                                    {/* <Accordion className={classes.accordianMargin} defaultExpanded>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <h5 className={classes.headingSeller}>Bank Details</h5>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Paper elevation={0} className={classes.paperWidth}>
                                          <div className="row with_label">
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Bank Name</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.bank_name}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Bank Number</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.bank_routing_number}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                          </div>
                                          <div className="row with_label">
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Beneficiary Account</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.beneficiary_account}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Beneficiary Name</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.beneficiary_name}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Bank Address</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.bank_address}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                            <div className="col-md-6">
                                              <Field name="listing_title">
                                                {({ field }) => (
                                                  <div className="py-2">
                                                    <label>Swift Code</label>
                                                    <Input
                                                      {...field}
                                                      type="text"
                                                      value={formikBag.values.swift_code}
                                                      className="form-control"
                                                      disabled
                                                    />
                                                  </div>
                                                )}
                                              </Field>
                                            </div>
                                          </div>
                                        </Paper>
                                      </AccordionDetails>
                                    </Accordion> */}
                                  </Form>
                                );
                              }}
                            </Formik>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </Paper>
                {/* ///Page Creative Producing
              ///Page Client Action 
              ///Page Directing Client
              ///Page Writing Client */}
                {toggle ? (
                  <div>
                    <Paper>
                      <Row className={classes.rowPadding}>
                        <Col xs={12}>
                          <div className="submit-form">
                            <div>
                              <Formik
                                enableReinitialize
                                initialValues={{
                                  // Restaurant Details
                                  //30
                                  // get(console.log(statecreative_producing_client_page.pilot_directing_30min), "nwep_fee") ,
                                  fee30: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_30min.nwep_fee",
                                    "N/A"
                                  ),

                                  credit30: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_30min.credit",
                                    "N/A"
                                  ),
                                  exclu30: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_30min.exclusivity",
                                    "N/A"
                                  ),
                                  lock30: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_30min.lock",
                                    "N/A"
                                  ),
                                  //60

                                  fee60: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_60min.nwep_fee",
                                    "N/A"
                                  ),

                                  credit60: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_60min.credit",
                                    "N/A"
                                  ),
                                  exclu60: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_60min.exclusivity",
                                    "N/A"
                                  ),
                                  lock60: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_60min.lock",
                                    "N/A"
                                  ),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion
                                        className={classes.accordianMargin}
                                        defaultExpanded
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>
                                            Fill Creative Producing
                                          </h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper
                                            elevation={0}
                                            className={classes.paperWidth}
                                          >
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>
                                                        Pilot Directing(30 min){" "}
                                                      </h3>
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>
                                                        Pilot Directing(60 min){" "}
                                                      </h3>
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .exclu30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .credit60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Credit</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .credit30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Credit</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .is_paid_subscribed
                                                            ? "Yes"
                                                            : "No"
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                          </Paper>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {state.userType.title === "Lawyer" ? (
                        <Row className={classes.rowPadding}>
                          <Col xs={12}>
                            <div className="submit-form">
                              <div>
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    bank_name: get(
                                      state,
                                      "bank_details.bank_name",
                                      "N/A"
                                    ),
                                    bank_routing_number: get(
                                      state,
                                      "bank_details.bank_routing_number",
                                      "N/A"
                                    ),
                                    beneficiary_account: get(
                                      state,
                                      "bank_details.beneficiary_account",
                                      "N/A"
                                    ),
                                    beneficiary_name: get(
                                      state,
                                      "bank_details.beneficiary_name",
                                      "N/A"
                                    ),
                                    bank_address: get(
                                      state,
                                      "bank_details.bank_address",
                                      "N/A"
                                    ),
                                    swift_code: get(
                                      state,
                                      "bank_details.swift_code",
                                      "N/A"
                                    ),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion
                                          className={classes.accordianMargin}
                                          defaultExpanded
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <h5
                                              className={classes.headingSeller}
                                            >
                                              Bank Details
                                            </h5>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Paper
                                              elevation={0}
                                              className={classes.paperWidth}
                                            >
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Bank Name</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Number
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_routing_number
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Account
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_account
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Name
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Address
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_address
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Swift Code
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .swift_code
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                            </Paper>
                                          </AccordionDetails>
                                        </Accordion>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Paper>
                    <Paper>
                      <Row className={classes.rowPadding}>
                        <Col xs={12}>
                          <div className="submit-form">
                            <div>
                              <Formik
                                enableReinitialize
                                initialValues={{
                                  // Restaurant Details
                                  series_fee: get(
                                    state,
                                    "client_action_page.Regular.series_fee",
                                    "N/A"
                                  ),
                                  approve: get(
                                    state,
                                    "client_action_page.Regular.approvals",
                                    "N/A"
                                  ),
                                  bonuses: get(
                                    state,
                                    "client_action_page.Regular.bonuses",
                                    "N/A"
                                  ),
                                  contingent: get(
                                    state,
                                    "client_action_page.Regular.contingent_compensation",
                                    "N/A"
                                  ),
                                  credit_position: get(
                                    state,
                                    "client_action_page.Regular.credit_position",
                                    "N/A"
                                  ),
                                  dress_room: get(
                                    state,
                                    "client_action_page.Regular.dressing_room",
                                    "N/A"
                                  ),
                                  travel_package: get(
                                    state,
                                    "client_action_page.Regular.travel_package",
                                    "N/A"
                                  ),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion
                                        className={classes.accordianMargin}
                                        defaultExpanded
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>
                                            Fill Client Action
                                          </h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper
                                            elevation={0}
                                            className={classes.paperWidth}
                                          >
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>Regular </h3>
                                                      <label>Series Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .series_fee
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <br /> <br />
                                                      <label>
                                                        Contingent Compensation
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .contingent
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Credit Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .credit_position
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Travel Package
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .travel_package
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Dressing Room
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .dress_room
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Approvals</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .approve
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Bonuses</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .bonuses
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                          </Paper>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {state.userType.title === "Lawyer" ? (
                        <Row className={classes.rowPadding}>
                          <Col xs={12}>
                            <div className="submit-form">
                              <div>
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    bank_name: get(
                                      state,
                                      "bank_details.bank_name",
                                      ""
                                    ),
                                    bank_routing_number: get(
                                      state,
                                      "bank_details.bank_routing_number",
                                      "N/A"
                                    ),
                                    beneficiary_account: get(
                                      state,
                                      "bank_details.beneficiary_account",
                                      "N/A"
                                    ),
                                    beneficiary_name: get(
                                      state,
                                      "bank_details.beneficiary_name",
                                      "N/A"
                                    ),
                                    bank_address: get(
                                      state,
                                      "bank_details.bank_address",
                                      "N/A"
                                    ),
                                    swift_code: get(
                                      state,
                                      "bank_details.swift_code",
                                      "N/A"
                                    ),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion
                                          className={classes.accordianMargin}
                                          defaultExpanded
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <h5
                                              className={classes.headingSeller}
                                            >
                                              Bank Details
                                            </h5>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Paper
                                              elevation={0}
                                              className={classes.paperWidth}
                                            >
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Bank Name</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Number
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_routing_number
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Account
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_account
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Name
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Address
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_address
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Swift Code
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .swift_code
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                            </Paper>
                                          </AccordionDetails>
                                        </Accordion>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Paper>
                    <Paper>
                      <Row className={classes.rowPadding}>
                        <Col xs={12}>
                          <div className="submit-form">
                            <div>
                              <Formik
                                enableReinitialize
                                initialValues={{
                                  // Restaurant Details
                                  fee30: get(
                                    state,
                                    "directing_client_page.pilot_directing_30min.nwep_fee",
                                    "N/A"
                                  ),
                                  pilot_directing30: get(
                                    state,
                                    "directing_client_page.pilot_directing_30min.pilot_directing",
                                    "N/A"
                                  ),
                                  exclu30: get(
                                    state,
                                    "directing_client_page.pilot_directing_30min.exclusivity",
                                    "N/A"
                                  ),
                                  lock30: get(
                                    state,
                                    "directing_client_page.pilot_directing_30min.lock",
                                    "N/A"
                                  ),

                                  //60

                                  fee60: get(
                                    state,
                                    "directing_client_page.pilot_directing_60min.nwep_fee",
                                    "N/A"
                                  ),
                                  pilot_directing60: get(
                                    state,
                                    "directing_client_page.pilot_directing_60min.pilot_directing",
                                    "N/A"
                                  ),
                                  exclu60: get(
                                    state,
                                    "directing_client_page.pilot_directing_60min.exclusivity",
                                    "N/A"
                                  ),
                                  lock60: get(
                                    state,
                                    "directing_client_page.pilot_directing_60min.lock",
                                    "N/A"
                                  ),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion
                                        className={classes.accordianMargin}
                                        defaultExpanded
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>
                                            Fill Directing Client
                                          </h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper
                                            elevation={0}
                                            className={classes.paperWidth}
                                          >
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>
                                                        Pilot Directing(30 min){" "}
                                                      </h3>
                                                      <label>
                                                        Pilot Directing
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .pilot_directing30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>
                                                        Pilot Directing(60 min){" "}
                                                      </h3>
                                                      <label>
                                                        Pilot Directing
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .pilot_directing60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .exclu30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .exclu60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                          </Paper>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {state.userType.title === "Lawyer" ? (
                        <Row className={classes.rowPadding}>
                          <Col xs={12}>
                            <div className="submit-form">
                              <div>
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    bank_name: get(
                                      state,
                                      "bank_details.bank_name",
                                      "N/A"
                                    ),
                                    bank_routing_number: get(
                                      state,
                                      "bank_details.bank_routing_number",
                                      "N/A"
                                    ),
                                    beneficiary_account: get(
                                      state,
                                      "bank_details.beneficiary_account",
                                      "N/A"
                                    ),
                                    beneficiary_name: get(
                                      state,
                                      "bank_details.beneficiary_name",
                                      "N/A"
                                    ),
                                    bank_address: get(
                                      state,
                                      "bank_details.bank_address",
                                      "N/A"
                                    ),
                                    swift_code: get(
                                      state,
                                      "bank_details.swift_code",
                                      "N/A"
                                    ),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion
                                          className={classes.accordianMargin}
                                          defaultExpanded
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <h5
                                              className={classes.headingSeller}
                                            >
                                              Bank Details
                                            </h5>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Paper
                                              elevation={0}
                                              className={classes.paperWidth}
                                            >
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Bank Name</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Number
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_routing_number
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Account
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_account
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Name
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Address
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_address
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Swift Code
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .swift_code
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                            </Paper>
                                          </AccordionDetails>
                                        </Accordion>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Paper>
                    <Paper>
                      <Row className={classes.rowPadding}>
                        <Col xs={12}>
                          <div className="submit-form">
                            <div>
                              <Formik
                                enableReinitialize
                                initialValues={{
                                  // Restaurant Details
                                  fee30: get(
                                    state,
                                    "writing_client_page.creator_ep_30min.ep_fee",
                                    "N/A"
                                  ),
                                  pilot_script30: get(
                                    state,
                                    "writing_client_page.creator_ep_30min.pilot_script",
                                    "N/A"
                                  ),
                                  exclu30: get(
                                    state,
                                    "writing_client_page.creator_ep_30min.exclusivity",
                                    "N/A"
                                  ),
                                  lock30: get(
                                    state,
                                    "writing_client_page.creator_ep_30min.lock",
                                    "N/A"
                                  ),

                                  //60

                                  fee60: get(
                                    state,
                                    "writing_client_page.creator_ep_60min.ep_fee",
                                    "N/A"
                                  ),
                                  pilot_script60: get(
                                    state,
                                    "writing_client_page.creator_ep_60min.pilot_script",
                                    "N/A"
                                  ),
                                  exclu60: get(
                                    state,
                                    "writing_client_page.creator_ep_60min.exclusivity",
                                    "N/A"
                                  ),
                                  lock60: get(
                                    state,
                                    "writing_client_page.creator_ep_60min.lock",
                                    "N/A"
                                  ),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion
                                        className={classes.accordianMargin}
                                        defaultExpanded
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>
                                            Fill Writing Client Page
                                          </h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper
                                            elevation={0}
                                            className={classes.paperWidth}
                                          >
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h4>
                                                        Creator/EP(30 min)
                                                      </h4>
                                                      <label>
                                                        Pilot Script
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .pilot_script30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h4>
                                                        Pilot Directing(60 min){" "}
                                                      </h4>
                                                      <label>
                                                        Pilot Script
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .pilot_script60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Ep Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Ep Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values.fee60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>Lock</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .lock60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .exclu30
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <label>
                                                        Exclusive / Position
                                                      </label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={
                                                          formikBag.values
                                                            .exclu60
                                                        }
                                                        className="form-control"
                                                        disabled
                                                      />
                                                    </div>
                                                  )}
                                                </Field>
                                              </div>
                                            </div>
                                          </Paper>
                                        </AccordionDetails>
                                      </Accordion>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      {state.userType.title === "Lawyer" ? (
                        <Row className={classes.rowPadding}>
                          <Col xs={12}>
                            <div className="submit-form">
                              <div>
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    bank_name: get(
                                      state,
                                      "bank_details.bank_name",
                                      "N/A"
                                    ),
                                    bank_routing_number: get(
                                      state,
                                      "bank_details.bank_routing_number",
                                      "N/A"
                                    ),
                                    beneficiary_account: get(
                                      state,
                                      "bank_details.beneficiary_account",
                                      "N/A"
                                    ),
                                    beneficiary_name: get(
                                      state,
                                      "bank_details.beneficiary_name",
                                      "N/A"
                                    ),
                                    bank_address: get(
                                      state,
                                      "bank_details.bank_address",
                                      "N/A"
                                    ),
                                    swift_code: get(
                                      state,
                                      "bank_details.swift_code",
                                      "N/A"
                                    ),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion
                                          className={classes.accordianMargin}
                                          defaultExpanded
                                        >
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <h5
                                              className={classes.headingSeller}
                                            >
                                              Bank Details
                                            </h5>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Paper
                                              elevation={0}
                                              className={classes.paperWidth}
                                            >
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>Bank Name</label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Number
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_routing_number
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                              <div className="row with_label">
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Account
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_account
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Beneficiary Name
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .beneficiary_name
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Bank Address
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .bank_address
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                                <div className="col-md-6">
                                                  <Field name="listing_title">
                                                    {({ field }) => (
                                                      <div className="py-2">
                                                        <label>
                                                          Swift Code
                                                        </label>
                                                        <Input
                                                          {...field}
                                                          type="text"
                                                          value={
                                                            formikBag.values
                                                              .swift_code
                                                          }
                                                          className="form-control"
                                                          disabled
                                                        />
                                                      </div>
                                                    )}
                                                  </Field>
                                                </div>
                                              </div>
                                            </Paper>
                                          </AccordionDetails>
                                        </Accordion>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Paper>
                  </div>
                ) : (
                  false
                )}
              </div>
            </div>
          </Paper>
        </div>
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          {/* <DialogTitle id="alert-dialog-title"> */}
          <CrossRow>
            <CrossBox onClick={() => setOpen(false)}>
              <CrossIcon className="ph-x-bold" />
            </CrossBox>
          </CrossRow>
          {/* </DialogTitle> */}
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Formik
                enableReinitialize
                initialValues={reportValue}
                validateOnChange
                onSubmit={(vals) => handleDisapprove(vals)}
                validate={(vals) => disAppValidator(vals)}
                // validate={disAppValidator}
              >
                {(formikBag) => {
                  return (
                    <Form>
                      <DisBox>
                        <DisApproveTitle>Disapprove List</DisApproveTitle>
                        <DisRowIn>
                          <Field name="first_Name">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "first_Name_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>First Name</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.first_Name}
                                    style={{ width: "100%" }}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "first_Name",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.first_Name &&
                            formikBag.errors.first_Name ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.first_Name}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                        <DisRowIn>
                          <Field name="last_Name">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "last_Name_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>Last Name</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.last_Name}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "last_Name",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.last_Name &&
                            formikBag.errors.last_Name ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.last_Name}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                        <DisRowIn>
                          <Field name="user_email">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "user_email_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>Email</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.user_email}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "user_email",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.user_email &&
                            formikBag.errors.user_email ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.user_email}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                        <DisRowIn>
                          <Field name="mobile_Number">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "mobile_Number_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>Mobile Number</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.mobile_Number}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "mobile_Number",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.mobile_Number &&
                            formikBag.errors.mobile_Number ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.mobile_Number}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                        <DisRowIn>
                          <Field name="user_business_logo">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "user_business_logo_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>Business Logo</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.user_business_logo}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "user_business_logo",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                    // error={
                                    //   formikBag.touched.user_business_logo && formikBag.errors.user_business_logo
                                    //     ? formikBag.errors.user_business_logo
                                    //     : null
                                    // }
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.user_business_logo &&
                            formikBag.errors.user_business_logo ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.user_business_logo}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                        <DisRowIn>
                          <Field name="user_firm_name">
                            {({ field }) => (
                              <>
                                <FirstBox>
                                  <Checkbox
                                    {...field}
                                    onChange={(e) =>
                                      formikBag.setFieldValue(
                                        "user_firm_name_check",
                                        e.target.checked
                                      )
                                    }
                                    type="checkbox"
                                  />
                                  <TextLabel>Firm Name</TextLabel>
                                </FirstBox>
                                <SecondBox>
                                  <Input
                                    {...field}
                                    type="text"
                                    value={formikBag.values.user_firm_name}
                                    className="form-control"
                                    onChange={(e) => {
                                      formikBag.setFieldValue(
                                        "user_firm_name",
                                        e.target.value
                                      );
                                    }}
                                    placeholder="Reason"
                                    // error={
                                    //   formikBag.touched.user_firm_name && formikBag.errors.user_firm_name
                                    //     ? formikBag.errors.user_firm_name
                                    //     : null
                                    // }
                                  />
                                </SecondBox>
                              </>
                            )}
                          </Field>
                        </DisRowIn>
                        <DisRow>
                          <FirstBox></FirstBox>
                          <SecondBox>
                            {formikBag.touched.user_firm_name &&
                            formikBag.errors.user_firm_name ? (
                              <>
                                <p
                                  style={{
                                    // paddingTop: 5,
                                    fontSize: 13,
                                    color: "red",
                                  }}
                                >
                                  {formikBag.errors.user_firm_name}
                                </p>
                              </>
                            ) : null}
                          </SecondBox>
                        </DisRow>
                      </DisBox>
                      <SubmitBox>
                        <AppButton type="submit">Submit</AppButton>
                      </SubmitBox>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
		  {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default AddDetails;
