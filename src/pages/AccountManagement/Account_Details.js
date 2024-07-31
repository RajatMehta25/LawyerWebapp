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

import { Formik, Field, Form } from "formik";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Account_Management.css";
import { GolfCourseRounded } from "@material-ui/icons";

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

  const {
    location: { state },
  } = props;
  console.log(state);
  // console.log(props);

  useEffect(() => {
    if (state.userType.title === "Agent Representative" || state.userType.title === "Management Company Representative") {
      setToggle(true);
    }
  }, [state]);

  console.log(props.location.state._id);

  const saveCategorydisApprove = async (e) => {
    // let approveStatus = e;
    // let requestData = {
    //   _id: props.location.state_id,
    //   isapproved: 2,
    // };

    let url = "/admin/approve_dissapprove_user";

    try {
      // const { data } = await axios.post(url, requestData);
      const { data } = await axios.post(url, { _id: props.location.state._id, isapproved: 2 });
      props.history.push({
        pathname: "/account-managment",
        state7: state.userType._id,
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveCategoryApprove = async (e) => {
    // let approveStatus = e;
    // let requestData = {
    // _id: props.location.state_id,
    // isapproved: 1,
    // };

    let url = "/admin/approve_dissapprove_user";

    try {
      const { data } = await axios.post(url, { _id: props.location.state._id, isapproved: 1 });
      props.history.push({
        pathname: "/account-managment",
        state7: state.userType._id,
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
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

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className="container">
              <div className={classNames("py-4", classes.paperHeight)}>
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingButton)}>
                  <div className={classes.resistrationDisplay}>
                    <div className={classes.headingSellerDetails}>
                      <Button
                        variant="outlined"
                        aria-label="add"
                        className={classes.iconMargin}
                        onClick={() => {
                          props.history.push({
                            pathname: "/account-managment",
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
                        <div className={classNames("form-group", classes.headingCenter, classes.marginZero)}>
                          <div className={classes.paddingButton}>
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
                                saveCategorydisApprove();
                              }}
                              style={{
                                backgroundColor: "#0294b3",
                                border: "none",
                              }}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      ) : //if usertype.id && isProfileCompleteLawyer||isProfileCompletemanageragent
                      state.userType.title === "Agent Representative" && state.isProfileComplete === "4" ? (
                        <div className={classNames("form-group", classes.headingCenter, classes.marginZero)}>
                          <div className={classes.paddingButton}>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              style={{
                                backgroundColor: colorApproveButton(state.isapproved),
                                color: TextcolorApproveButton(state.isapproved),
                                border: "none",
                                cursor: state.isapproved === 1 ? "not-allowed" : "pointer",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                              disabled={state.isapproved === 1 ? true : false}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              onClick={() => {
                                saveCategorydisApprove();
                              }}
                              style={{
                                backgroundColor: colorDisapproveButton(state.isapproved),
                                color: TextcolorDisapproveButton(state.isapproved),
                                cursor: state.isapproved === 2 ? "not-allowed" : "pointer",
                                border: "none",
                              }}
                              disabled={state.isapproved === 2 ? true : false}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      ) : state.userType.title === "Management Company Representative" && state.isProfileComplete === "4" ? (
                        <div className={classNames("form-group", classes.headingCenter, classes.marginZero)}>
                          <div className={classes.paddingButton}>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              style={{
                                backgroundColor: colorApproveButton(state.isapproved),
                                color: TextcolorApproveButton(state.isapproved),
                                border: "none",
                                cursor: state.isapproved === 1 ? "not-allowed" : "pointer",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                              disabled={state.isapproved === 1 ? true : false}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              onClick={() => {
                                saveCategorydisApprove();
                              }}
                              style={{
                                backgroundColor: colorDisapproveButton(state.isapproved), //"#0294b3",
                                color: TextcolorDisapproveButton(state.isapproved),
                                border: "none",
                                cursor: state.isapproved === 2 ? "not-allowed" : "pointer",
                              }}
                              disabled={state.isapproved === 2 ? true : false}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      ) : state.userType.title === "Lawyer" ? (
                        // && state.isProfileComplete === "1"                            all details check applied here (refer above lines for code)
                        <div className={classNames("form-group", classes.headingCenter, classes.marginZero)}>
                          <div className={classes.paddingButton}>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              style={{
                                backgroundColor: colorApproveButton(state.isapproved),
                                color: TextcolorApproveButton(state.isapproved),
                                border: "none",
                                cursor: state.isapproved === 1 ? "not-allowed" : "pointer",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                              disabled={state.isapproved === 1 ? true : false}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              onClick={() => {
                                saveCategorydisApprove();
                              }}
                              style={{
                                backgroundColor: colorDisapproveButton(state.isapproved),
                                color: TextcolorDisapproveButton(state.isapproved),
                                border: "none",
                                cursor: state.isapproved === 2 ? "not-allowed" : "pointer",
                              }}
                              disabled={state.isapproved === 2 ? true : false}
                            >
                              Disapprove
                            </button>
                          </div>
                        </div>
                      ) : state.userType.title ===
                          ("Agent Representative" || "Management Company Representative" || "Lawyer") &&
                        state.isProfileComplete ? (
                        <div className={classNames("form-group", classes.headingCenter, classes.marginZero)}>
                          <div className={classes.paddingButton}>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              style={{
                                backgroundColor: colorApproveButton(state.isapproved),
                                color: TextcolorApproveButton(state.isapproved),
                                border: "none",
                                cursor: "not-allowed",
                              }}
                              onClick={() => {
                                saveCategoryApprove();
                              }}
                              disabled={true}
                            >
                              Approve
                            </button>
                          </div>
                          <div>
                            <button
                              className={classNames("btn btn-success", classes.buttonColorApprove)}
                              onClick={() => {
                                saveCategorydisApprove();
                              }}
                              style={{
                                backgroundColor: colorDisapproveButton(state.isapproved),
                                color: TextcolorDisapproveButton(state.isapproved),
                                border: "none",
                                cursor: "not-allowed",
                              }}
                              disabled={true}
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
                              name: get(state, "firstName", "N/A") + " " + get(state, "lastName", "N/A"),
                              imdbLink: get(state, "imdbLink", "N/A"),
                              userType: get(state, "userType.title", "N/A"),
                              email: get(state, "email", "N/A"),
                              countryCode: get(state, "countryCode", "N/A"),
                              mobileNumber: get(state, "mobileNumber", "N/A"),
                              is_free_subscribed: get(state, "is_free_subscribed", "N/A"),
                              is_paid_subscribed: get(state, "is_paid_subscribed", "N/A"),
                              planPurchased: get(state, "planType.plans.planType", "N/A"),
                              firm_name: get(state, "firm_name", "N/A"),
                              business_logo: get(state, "business_logo", "N/A"),
                            }}
                            validate={(values) => console.log(values)}
                            validateOnChange
                            // onSubmit={saveCategory}
                          >
                            {(formikBag) => {
                              return (
                                <Form>
                                  <Accordion className={classes.accordianMargin} defaultExpanded>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <h5 className={classes.headingSeller}>User Details</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Paper elevation={0} className={classes.paperWidth}>
                                        <div className="row with_label">
                                          <div className="col-md-6">
                                            <Field name="listing_title">
                                              {({ field }) => (
                                                <div className="py-2">
                                                  <label>Name</label>
                                                  <Input
                                                    {...field}
                                                    type="text"
                                                    value={formikBag.values.name}
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
                                                    value={formikBag.values.email}
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
                                                  <label>User Type</label>
                                                  <Input
                                                    {...field}
                                                    type="text"
                                                    value={formikBag.values.userType}
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
                                                    value={formikBag.values.imdbLink ? formikBag.values.imdbLink : "N/A"}
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
                                                  <label>Phone No:</label>
                                                  <Input
                                                    {...field}
                                                    type="text"
                                                    value={formikBag.values.countryCode + " " + formikBag.values.mobileNumber}
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
                                          {/* new */}
                                          <div className="col-md-6">
                                            <Field name="listing_title">
                                              {({ field }) => (
                                                <div className="py-2">
                                                  <label>Subscription Plan</label>
                                                  <Input
                                                    {...field}
                                                    type="text"
                                                    value={formikBag.values?.planPurchased}
                                                    className="form-control"
                                                    disabled
                                                  />
                                                </div>
                                              )}
                                            </Field>
                                          </div>

                                          {state.userType.title === "Lawyer" ? (
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
                                                        value={formikBag.values?.firm_name}
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
                                                      <label>Business Logo</label>
                                                      <br />
                                                      <img
                                                        height={50}
                                                        width={50}
                                                        src={formikBag.values?.business_logo}
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
                                bank_name: get(state, "bank_details.bank_name", "N/A"),
                                bank_routing_number: get(state, "bank_details.bank_routing_number", "N/A"),
                                beneficiary_account: get(state, "bank_details.beneficiary_account", "N/A"),
                                beneficiary_name: get(state, "bank_details.beneficiary_name", "N/A"),
                                bank_address: get(state, "bank_details.bank_address", "N/A"),
                                swift_code: get(state, "bank_details.swift_code", "N/A"),
                              }}
                              validate={(values) => console.log(values)}
                              validateOnChange
                              // onSubmit={saveCategory}
                            >
                              {(formikBag) => {
                                return (
                                  <Form>
                                    <Accordion className={classes.accordianMargin} defaultExpanded>
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
                                  fee30: get(state, "creative_producing_client_page.pilot_directing_30min.nwep_fee", "N/A"),

                                  credit30: get(state, "creative_producing_client_page.pilot_directing_30min.credit", "N/A"),
                                  exclu30: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_30min.exclusivity",
                                    "N/A"
                                  ),
                                  lock30: get(state, "creative_producing_client_page.pilot_directing_30min.lock", "N/A"),
                                  //60

                                  fee60: get(state, "creative_producing_client_page.pilot_directing_60min.nwep_fee", "N/A"),

                                  credit60: get(state, "creative_producing_client_page.pilot_directing_60min.credit", "N/A"),
                                  exclu60: get(
                                    state,
                                    "creative_producing_client_page.pilot_directing_60min.exclusivity",
                                    "N/A"
                                  ),
                                  lock60: get(state, "creative_producing_client_page.pilot_directing_60min.lock", "N/A"),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion className={classes.accordianMargin} defaultExpanded>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>Fill Creative Producing</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper elevation={0} className={classes.paperWidth}>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>Pilot Directing(30 min) </h3>
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.fee30}
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
                                                      <h3>Pilot Directing(60 min) </h3>
                                                      <label>NWEP Fee</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.fee60}
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
                                                        value={formikBag.values.lock30}
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
                                                        value={formikBag.values.lock60}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.exclu30}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.credit60}
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
                                                        value={formikBag.values.credit30}
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
                                    bank_name: get(state, "bank_details.bank_name", "N/A"),
                                    bank_routing_number: get(state, "bank_details.bank_routing_number", "N/A"),
                                    beneficiary_account: get(state, "bank_details.beneficiary_account", "N/A"),
                                    beneficiary_name: get(state, "bank_details.beneficiary_name", "N/A"),
                                    bank_address: get(state, "bank_details.bank_address", "N/A"),
                                    swift_code: get(state, "bank_details.swift_code", "N/A"),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion className={classes.accordianMargin} defaultExpanded>
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
                                  series_fee: get(state, "client_action_page.Regular.series_fee", "N/A"),
                                  approve: get(state, "client_action_page.Regular.approvals", "N/A"),
                                  bonuses: get(state, "client_action_page.Regular.bonuses", "N/A"),
                                  contingent: get(state, "client_action_page.Regular.contingent_compensation", "N/A"),
                                  credit_position: get(state, "client_action_page.Regular.credit_position", "N/A"),
                                  dress_room: get(state, "client_action_page.Regular.dressing_room", "N/A"),
                                  travel_package: get(state, "client_action_page.Regular.travel_package", "N/A"),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion className={classes.accordianMargin} defaultExpanded>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>Fill Client Action</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper elevation={0} className={classes.paperWidth}>
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
                                                        value={formikBag.values.series_fee}
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
                                                      <label>Contingent Compensation</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.contingent}
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
                                                      <label>Credit Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.credit_position}
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
                                                      <label>Travel Package</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.travel_package}
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
                                                      <label>Dressing Room</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.dress_room}
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
                                                        value={formikBag.values.approve}
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
                                                        value={formikBag.values.bonuses}
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
                                    bank_name: get(state, "bank_details.bank_name", ""),
                                    bank_routing_number: get(state, "bank_details.bank_routing_number", "N/A"),
                                    beneficiary_account: get(state, "bank_details.beneficiary_account", "N/A"),
                                    beneficiary_name: get(state, "bank_details.beneficiary_name", "N/A"),
                                    bank_address: get(state, "bank_details.bank_address", "N/A"),
                                    swift_code: get(state, "bank_details.swift_code", "N/A"),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion className={classes.accordianMargin} defaultExpanded>
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
                                  fee30: get(state, "directing_client_page.pilot_directing_30min.nwep_fee", "N/A"),
                                  pilot_directing30: get(
                                    state,
                                    "directing_client_page.pilot_directing_30min.pilot_directing",
                                    "N/A"
                                  ),
                                  exclu30: get(state, "directing_client_page.pilot_directing_30min.exclusivity", "N/A"),
                                  lock30: get(state, "directing_client_page.pilot_directing_30min.lock", "N/A"),

                                  //60

                                  fee60: get(state, "directing_client_page.pilot_directing_60min.nwep_fee", "N/A"),
                                  pilot_directing60: get(
                                    state,
                                    "directing_client_page.pilot_directing_60min.pilot_directing",
                                    "N/A"
                                  ),
                                  exclu60: get(state, "directing_client_page.pilot_directing_60min.exclusivity", "N/A"),
                                  lock60: get(state, "directing_client_page.pilot_directing_60min.lock", "N/A"),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion className={classes.accordianMargin} defaultExpanded>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>Fill Directing Client</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper elevation={0} className={classes.paperWidth}>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h3>Pilot Directing(30 min) </h3>
                                                      <label>Pilot Directing</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.pilot_directing30}
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
                                                      <h3>Pilot Directing(60 min) </h3>
                                                      <label>Pilot Directing</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.pilot_directing60}
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
                                                        value={formikBag.values.fee30}
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
                                                        value={formikBag.values.fee60}
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
                                                        value={formikBag.values.lock30}
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
                                                        value={formikBag.values.lock60}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.exclu30}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.exclu60}
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
                                    bank_name: get(state, "bank_details.bank_name", "N/A"),
                                    bank_routing_number: get(state, "bank_details.bank_routing_number", "N/A"),
                                    beneficiary_account: get(state, "bank_details.beneficiary_account", "N/A"),
                                    beneficiary_name: get(state, "bank_details.beneficiary_name", "N/A"),
                                    bank_address: get(state, "bank_details.bank_address", "N/A"),
                                    swift_code: get(state, "bank_details.swift_code", "N/A"),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion className={classes.accordianMargin} defaultExpanded>
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
                                  fee30: get(state, "writing_client_page.creator_ep_30min.ep_fee", "N/A"),
                                  pilot_script30: get(state, "writing_client_page.creator_ep_30min.pilot_script", "N/A"),
                                  exclu30: get(state, "writing_client_page.creator_ep_30min.exclusivity", "N/A"),
                                  lock30: get(state, "writing_client_page.creator_ep_30min.lock", "N/A"),

                                  //60

                                  fee60: get(state, "writing_client_page.creator_ep_60min.ep_fee", "N/A"),
                                  pilot_script60: get(state, "writing_client_page.creator_ep_60min.pilot_script", "N/A"),
                                  exclu60: get(state, "writing_client_page.creator_ep_60min.exclusivity", "N/A"),
                                  lock60: get(state, "writing_client_page.creator_ep_60min.lock", "N/A"),
                                }}
                                validate={(values) => console.log(values)}
                                validateOnChange
                                // onSubmit={saveCategory}
                              >
                                {(formikBag) => {
                                  return (
                                    <Form>
                                      <Accordion className={classes.accordianMargin} defaultExpanded>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <h5 className={classes.headingSeller}>Fill Writing Client Page</h5>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Paper elevation={0} className={classes.paperWidth}>
                                            <div className="row with_label">
                                              <div className="col-md-6">
                                                <Field name="listing_title">
                                                  {({ field }) => (
                                                    <div className="py-2">
                                                      <h4>Creator/EP(30 min)</h4>
                                                      <label>Pilot Script</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.pilot_script30}
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
                                                      <h4>Pilot Directing(60 min) </h4>
                                                      <label>Pilot Script</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.pilot_script60}
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
                                                        value={formikBag.values.fee30}
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
                                                        value={formikBag.values.fee60}
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
                                                        value={formikBag.values.lock30}
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
                                                        value={formikBag.values.lock60}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.exclu30}
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
                                                      <label>Exclusive / Position</label>
                                                      <Input
                                                        {...field}
                                                        type="text"
                                                        value={formikBag.values.exclu60}
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
                                    bank_name: get(state, "bank_details.bank_name", "N/A"),
                                    bank_routing_number: get(state, "bank_details.bank_routing_number", "N/A"),
                                    beneficiary_account: get(state, "bank_details.beneficiary_account", "N/A"),
                                    beneficiary_name: get(state, "bank_details.beneficiary_name", "N/A"),
                                    bank_address: get(state, "bank_details.bank_address", "N/A"),
                                    swift_code: get(state, "bank_details.swift_code", "N/A"),
                                  }}
                                  validate={(values) => console.log(values)}
                                  validateOnChange
                                  // onSubmit={saveCategory}
                                >
                                  {(formikBag) => {
                                    return (
                                      <Form>
                                        <Accordion className={classes.accordianMargin} defaultExpanded>
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
      </div>
    </React.Fragment>
  );
};

export default AddDetails;
