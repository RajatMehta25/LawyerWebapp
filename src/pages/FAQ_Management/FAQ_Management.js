import React, { useState, useEffect, Component, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import axios from "../../axios";
import { toast } from "react-toastify";
// import Switch from '@mui/material/Switch';
// import { styled } from '@mui/material/styles';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  styled,
  Tooltip,
} from "@material-ui/core";
import "./FAQ_Management.css";
// import { Delete } from '@material-ui/icons';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import BlockIcon from '@material-ui/icons/Block';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// For Table
// import SearchBar from "material-ui-search-bar";
// import { orderBy } from "lodash";

//history
// import {useHistory} from 'react-router-dom'
// import AddEditCategory from "../AccountManagement/Account_Details";

// import './Category_Management.css' ;
// import EditIcon from '@material-ui/icons/Edit';
// import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";
// import React, { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import QNA from "./QNA_Component";
import JoditEditor from "jodit-react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { get } from "lodash";
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
    color: "#fff",
    backgroundColor: "#696969",
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

export default function FAQ_Management(props) {
  const classes = useStyles();
  // const registrationForm = useRef();

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [inputData, setInputData] = useState("");
  // const [inputData2, setInputData2] = useState("");

  // const [inputquestion, setInputquestion] = useState("");
  // const [inputquestion2, setInputquestion2] = useState("");
  const [buttonDisabling, setButtonDisabling] = useState(false);

  // const [storeType, setType] = useState("price");
  const [storeType, setType] = useState("service");

  const [tabColor, setTabColor] = useState("1");

  const [show, setShow] = useState(true);

  useEffect(() => {
    getCategoriesContent();
    //  setInputData2("");
  }, []);

  //get content
  const getCategoriesContent = async (type = "service") => {
    console.log("type", type);
    setType(type);
    setIsLoading(true);
    try {
      if (type === "price") {
        setTableData([]);
        const { data } = await axios.get(`/admin/get_faq_list?type=price`);
        console.log(data);
        setTableData(data.data);
        setIsLoading(false);
        setButtonDisabling(false);
        // setSearchedData(data.user)
        // setIsLoading(false)
      } else if (type === "service") {
        setTableData([]);
        const { data } = await axios.get(`/admin/get_faq_list?type=service`);
        console.log(data);
        setTableData(data.data);
        setIsLoading(false);
        setButtonDisabling(false);
        // setSearchedData(data.user)
        // setIsLoading(false)
      } else if (type === "general_faq") {
        setTableData([]);
        const { data } = await axios.get(`/admin/get_faq_list?type=general_faq`);
        console.log(data);
        setTableData(data.data);
        setIsLoading(false);
        setButtonDisabling(false);
        // setSearchedData(data.user)
        // setIsLoading(false)
      } else {
        setTableData([]);
        const { data } = await axios.get(`/admin/get_faq_list?type=price`);
        console.log(data);
        setTableData(data.data);
        setIsLoading(false);
        setButtonDisabling(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  console.log(tableData);
  const handleUpdate = async (values) => {
    // console.log(category);
    // if (category){
    setIsLoading(true);
    try {
      setButtonDisabling(true);
      const { data } = await axios.post("/admin/create_update_faq", {
        faqId: values.id,
        question: values.question,
        answer: values.answer,
        type: storeType,
      });
      setIsLoading(false);
      // window.location.reload();
      // getCategoriesContent();
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
  const handleAdd = async (values) => {
    setIsLoading(true);
    try {
      setButtonDisabling(true);
      // let panelName = "USER";

      const { data } = await axios.post("/admin/create_update_faq", {
        // _id: category.data._id,
        question: values.newQuestion,
        answer: values.newAnswer,
        type: storeType,
      });
      setIsLoading(false);
      // window.location.reload();
      getCategoriesContent(storeType);
      setTimeout(() => {
        setShow(true);
      }, 401);
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
  const handle_Deletion = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/admin/remove_faq", {
        faqId: id,
      });
      // window.location.reload();
      setIsLoading(false);
      // getCategoriesContent();
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
  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                  <h3 style={{}}>FAQ Management</h3>
                </Paper>
                {/* <Paper elevation={0}>
                  <div>
                    <Button
                      variant="contained"
                      className={`${tabColor === "1" ? "customButton" : "defaultButton"}`}
                      onClick={() => {
                        getCategoriesContent("price");
                        setTabColor("1");
                      }}
                    >
                      Price
                    </Button>
                    &emsp;
                    <Button
                      variant="contained"
                      className={`${tabColor === "2" ? "customButton" : "defaultButton"}`}
                      onClick={() => {
                        setTabColor("2");
                        getCategoriesContent("service");
                      }}
                    >
                      Service
                    </Button>
                    &emsp;
                    <Button
                      variant="contained"
                      className={`${tabColor === "3" ? "customButton" : "defaultButton"}`}
                      onClick={() => {
                        setTabColor("3");
                        getCategoriesContent("general_faq");
                      }}
                    >
                      General Service
                    </Button>
                  </div>
                  <br />
                </Paper> */}
                {/* //new design */}

                {/* <br /> */}

                {/* status end */}

                <Paper>
                  {tableData.map((category, index) => (
                    <Formik
                      key={index}
                      initialValues={{
                        question: get(category, "question", ""),
                        answer: get(category, "answer", ""),
                        id: get(category, "_id", ""),
                      }}
                      validate={(values) => {
                        const errors = {};
                        console.log(values);
                        if (!values.question) {
                          errors.question = "Required";
                        }
                        if (
                          //  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          values.answer === "" ||
                          values.answer === "<p><br></p>"
                        ) {
                          errors.answer = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          //  alert(JSON.stringify(values, null, 2));
                          handleUpdate(values);
                          setSubmitting(false);
                        }, 400);
                      }}
                    >
                      {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                          <label className="label-text">QUESTION</label>
                          <Field type="text" name="question" className="form-control" placeholder="Question" />
                          <ErrorMessage name="question" component="div" className="text-danger" />
                          <br />
                          <div className="editor-container-1">
                            <label className="label-text">ANSWER</label>
                            <JoditEditor
                              value={values.answer}
                              name="answer"
                              onChange={(newContent) => {
                                // SettingData(newContent);
                                setFieldValue("answer", newContent);
                              }}
                            />
                          </div>
                          <ErrorMessage name="answer" component="div" className="text-danger" />
                          <br />
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#0294b3",
                              color: "white",
                            }}
                            // onClick={()=>{
                            //   handleCreate_Update2(category)
                            // }}
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Update
                          </Button>
                          &emsp;
                          <Button
                            variant="contained"
                            type="button"
                            style={{
                              backgroundColor: "#0294b3",
                              color: "white",
                            }}
                            onClick={() => {
                              handle_Deletion(category._id);
                              getCategoriesContent(storeType);
                            }}
                          >
                            Remove
                          </Button>
                          <br />
                          <br />
                        </Form>
                      )}
                    </Formik>
                  ))}

                  {show && (
                    <Formik
                      initialValues={{
                        newQuestion: "",
                        newAnswer: "",
                      }}
                      validate={(values) => {
                        const errors = {};
                        console.log(values);
                        if (!values.newQuestion) {
                          errors.newQuestion = "Required";
                        }
                        if (
                          //  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          values.newAnswer === "" ||
                          values.newAnswer === "<p><br></p>"
                        ) {
                          errors.newAnswer = "Required";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          //  alert(JSON.stringify(values, null, 2));
                          handleAdd(values);

                          setSubmitting(false);
                        }, 400);

                        //  getCategoriesContent(storeType);
                        // window.location.reload();
                        setShow(false);
                      }}
                    >
                      {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                          <label className="label-text">QUESTION</label>
                          <Field type="text" name="newQuestion" className="form-control" placeholder="New Question" />
                          <ErrorMessage name="newQuestion" component="div" className="text-danger" />
                          <br />
                          <div className="editor-container-1">
                            <label className="label-text">ANSWER</label>
                            <JoditEditor
                              value={values.newAnswer}
                              name="newAnswer"
                              onChange={(newContent) => {
                                // SettingData(newContent);
                                setFieldValue("newAnswer", newContent);
                              }}
                            />
                          </div>
                          <ErrorMessage name="newAnswer" component="div" className="text-danger" />
                          <br />
                          <Button
                            variant="contained"
                            type="submit"
                            // style={{ backgroundColor: `${buttonDisabling?'#696969':'#0294B3'}`, color: "white" }}
                            // onClick={()=>{handleAdd()}}
                            style={{
                              backgroundColor: "#0294b3",
                              color: "white",
                            }}
                            disabled={isSubmitting}
                          >
                            ADD
                          </Button>
                          <br />
                          <br />
                        </Form>
                      )}
                    </Formik>
                  )}
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {isLoading && <Overlay />}
    </React.Fragment>
  );
}
