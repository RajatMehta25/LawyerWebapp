import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import axios from "../../axios";
import { toast } from "react-toastify";

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
  Tooltip,
  styled,
  Switch,
} from "@material-ui/core";

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy, reverse } from "lodash";

//history
import { useHistory } from "react-router-dom";
import AddCategory from "../AccountManagement/Account_Details";
import "./EditCategoryAttributes.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddEditAttributes from "./AddEditAttributes";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { indexOf } from "lodash-es";
import EditIcon from "@material-ui/icons/Edit";
import { DeleteOutline } from "@material-ui/icons";
import { Modal } from "../../components/Modal/Modal";
import {
  CategoryBox,
  CatRow,
  CatLabel,
  ButtonBox,
  CatButton,
  CatTitle,
  CatBox,
  CatPlusButton,
  OptionBox,
  OptionText,
  OptionsContainer,
} from "./CategoryElements";
import Input from "../../components/Input";
import { Formik, Field, Form } from "formik";
import { attValidator, opNameValidator } from "../../utils/validators";
import Select from "../../components/Select";
import { get } from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Chip from "@material-ui/core/Chip";
import Overlay from "../../components/Overlay";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

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
    textAlign: "center",
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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "#757ce8" : "white",
  ...draggableStyle,
});
export default function EditCategoryAttributes(props) {
  const classes = useStyles();

  const {
    location: { state },
  } = props;
  // const history=useHistory();

  const [categoryId, setCategoryId] = useState(state._id);
  const [categoryName, setCategoryName] = useState(state.name);
  const [clickedIndex, setClickedIndex] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [tablelength,setTableLength] = useState(null);
  const [attData, setattData] = useState([]);
  const [valueArr, setValueArr] = useState([]);
  const [mainobject1, setMainObject1] = useState([]);
  const [attributeData, setAttributeData] = useState({
    fieldType: "",
    title: "",
    placeholder: "",
    isRequired: false,
    validation: "",
    _id: null,
    valueInArray: valueArr,
    category_id: categoryId,
  });
  const [isAttributte, setIsAttributte] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [feildVal, setFeildVal] = useState([]);
  const [optionVal, setOptionVal] = useState({
    option_name: "",
  });

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(state);

  useEffect(() => {
    // getCategoriesContent();
    getCategoriesContents();
  }, [state]);

  console.log(tableData);
  var currentstate;
  var totallength;

  // console.log(total);
  if (typeof state === "string") {
    currentstate = state;
  } else if (typeof state === "object") {
    currentstate = state[2];
  } else {
  }
  const DeleteAttribute = async (internalid) => {
    // var mainobject = tableData.filter(function (id) { return id._id === currentstate })
    attData[0].fields.splice(internalid, 1);
    var changedObject = {
      category_id: attData[0]._id,
      fields: attData[0].fields,
      name: attData[0].name,
      desc: attData[0].desc,
    };
    console.log(internalid);
    try {
      const { data } = await axios.post(
        "/admin/update_category",
        changedObject
      );
      console.log(changedObject);
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // getCategoriesContent()
      getCategoriesContents();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(valueArr);
  const typeOptions = [
    {
      label: "Input Text",
      value: "Input Text",
    },
    {
      label: "Input Number",
      value: "Input Number",
    },
    {
      label: "Email",
      value: "Email",
    },
    {
      label: "Textarea",
      value: "Textarea",
    },
    {
      label: "Dropdown",
      value: "Dropdown",
    },
    {
      label: "CheckBox",
      value: "CheckBox",
    },
    {
      label: "Date",
      value: "Date",
    },
    {
      label: "File",
      value: "File",
    },
    {
      label: "Note",
      value: "Note",
    },
  ];
  const getType = (value) => {
    if (value == "Input Text") {
      return {
        label: "Input Text",
        value: "Input Text",
      };
    } else if (value == "Input Number") {
      return {
        label: "Input Number",
        value: "Input Number",
      };
    } else if (value == "Email") {
      return {
        label: "Email",
        value: "Email",
      };
    } else if (value == "Date") {
      return {
        label: "Date",
        value: "Date",
      };
    } else if (value == "Textarea") {
      return {
        label: "Textarea",
        value: "Textarea",
      };
    } else if (value == "Dropdown") {
      return {
        label: "Dropdown",
        value: "Dropdown",
      };
    } else if (value == "CheckBox") {
      return {
        label: "CheckBox",
        value: "CheckBox",
      };
    } else if (value == "File") {
      return {
        label: "File",
        value: "File",
      };
    } else if (value == "Note") {
      return {
        label: "Note",
        value: "Note",
      };
    } else {
      return "";
    }
  };
  const reqOptions = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];
  const getReq = (value) => {
    if (value == false) {
      return {
        label: "No",
        value: false,
      };
    } else if (value == true) {
      return {
        label: "Yes",
        value: true,
      };
    } else {
      return "";
    }
  };

  console.log(feildVal);

  // Get
  const getCategoriesContents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/admin/get_categories`);
      console.log(data);
      setTableData(data.user?.filter((val) => val._id == categoryId));
      setattData(data.user?.filter((val) => val._id == categoryId));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  console.log(attData[0]?.fields);

  const handleAtti = async (values) => {
    setIsLoading(true);
    console.log(values);
    const attValues = {
      category_id: categoryId,
      fields: [
        ...attData[0]?.fields,
        {
          fieldType: values.fieldType,
          title: values.title,
          placeholder: values.placeholder,
          isRequired: values.isRequired,
          validation: values.validation,
          valueInArray: values.valueInArray,
        },
      ],
    };
    console.log(attValues);
    try {
      const { data } = await axios.post("/admin/update_category", attValues);
      console.log(data);
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAttributte(false);
      setIsLoading(false);
      // getCategoriesContent();
      getCategoriesContents();
      setAttributeData({
        fieldType: "",
        title: "",
        placeholder: "",
        isRequired: false,
        validation: "",
        category_id: categoryId,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setIsAttributte(false);
      // getCategoriesContent();
      getCategoriesContents();
    }
  };
  const handleAttiUpdate = async (updateValue) => {
    setIsLoading(true);
    console.log(updateValue);
    const attValues = {
      category_id: categoryId,
      fields: updateValue,
      // fields:
    };
    console.log(attValues);
    try {
      const { data } = await axios.post("/admin/update_category", attValues);
      console.log(data);
      toast.success(`${data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAttributte(false);
      // getCategoriesContent();
      setIsLoading(false);
      getCategoriesContents();
      setAttributeData({
        fieldType: "",
        title: "",
        placeholder: "",
        isRequired: false,
        validation: "",
        _id: null,
        valueInArray: [],
        category_id: categoryId,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      setIsAttributte(false);
      // getCategoriesContent();
      getCategoriesContents();
    }
  };
  // Drag and Drop
  const onDragEnd = async (result) => {
    setIsLoading(true);
    if (!result.destination) {
      return;
    }
    let movedItems = reorder(
      tableData[0].fields,
      result.source.index,
      result.destination.index
    );
    let arr = [];
    arr = movedItems;
    console.log(arr);
    // setTableData(movedItems);
    // console.log(movedItems);
    const attValues = {
      category_id: categoryId,
      fields: movedItems,
    };
    console.log(attValues);
    if (attValues) {
      try {
        const { data } = await axios.post("/admin/update_category", attValues);
        console.log(data);
        // getCategoriesContent();
        getCategoriesContents();
        setIsLoading(false);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      return "";
    }
  };

  // status switch
  const statusSwitch = async (e, id) => {
    setIsLoading(true);
    console.log(e.target.checked);
    console.log(id);
    console.log(categoryId);
    if (e.target.checked) {
      try {
        // console.log(id);
        const { data } = await axios.post("/admin/update_attribute_on", {
          category_id: categoryId,
          fields_id: id,
        });
        getCategoriesContents();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        // console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    } else {
      try {
        // console.log(id);
        const { data } = await axios.post("/admin/update_attribute", {
          category_id: categoryId,
          fields_id: id,
        });
        getCategoriesContents();
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        // console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(`${error?.response?.data?.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      }
    }
  };
  const DropdownGroup = [
    "Dropdown",
    "Dropdown - Provinces/Territories",
    "Dropdown - States",
    "Dropdown - Yes/No",
    "Multiple Selection",
  ];
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
                    classes.headingAlignment
                  )}
                >
                  <Button
                    variant="outlined"
                    aria-label="add"
                    className={classes.iconMargin}
                    onClick={() => {
                      props.history.push({
                        pathname: "/Category_Management",
                      });
                    }}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <h3 style={{ marginBottom: "-0.5rem" }}>
                    Edit Category Attributes{" "}
                  </h3>
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{
                      backgroundColor: "#0294b3",
                      color: "#fff",
                      margin: "0.5rem",
                    }}
                    onClick={() => {
                      setAttributeData({
                        fieldType: "",
                        title: "",
                        placeholder: "",
                        isRequired: false,
                        validation: "",
                        valueInArray: [],
                        category_id: categoryId,
                        _id: null,
                      });
                      setIsAttributte(true);
                    }}
                  >
                    {" "}
                    ADD Attribute
                  </Button>
                </Paper>
                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          {/* <TableRow  style={{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",backgroundColor:"#FAFAFA"}}> */}
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            Sr. No.
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {" "}
                            Name
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {" "}
                            Field Type
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {" "}
                            Required
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {" "}
                            Placeholder
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            {" "}
                            Validation
                          </TableCell>
                          {DropdownGroup.includes(categoryName) ? (
                            <TableCell
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {" "}
                              Drop Options
                            </TableCell>
                          ) : (
                            ""
                          )}
                          <TableCell
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                        {/* </TableRow> */}
                      </TableHead>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                            <TableBody
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {isLoading ? (
                                <TableRow>
                                  <Skeleton
                                    style={{
                                      width: "70vw",
                                      borderRadius: "20px",
                                    }}
                                    highlightColor="#fff"
                                    height="1rem"
                                    count={2}
                                    baseColor="#ebebeb"
                                  />
                                </TableRow>
                              ) : (
                                false
                              )}
                              {tableData[0]?.fields
                                ?.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((category, index) => (
                                  <Draggable
                                    key={index}
                                    draggableId={"q-" + index}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <TableRow
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        <TableCell
                                          component="th"
                                          scope="row"
                                          className={classes.textMiddle}
                                        >
                                          {index + 1 + page * rowsPerPage}
                                        </TableCell>
                                        <TableCell
                                          className={classes.textMiddle}
                                        >
                                          {category.title}
                                        </TableCell>
                                        <TableCell
                                          className={classes.textMiddle}
                                        >
                                          {category.fieldType}
                                        </TableCell>
                                        <TableCell
                                          className={classes.textMiddle}
                                        >
                                          {category.isRequired ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell
                                          className={classes.textMiddle}
                                        >
                                          {category.placeholder}
                                        </TableCell>
                                        <TableCell
                                          className={classes.textMiddle}
                                        >
                                          {category.validation == ""
                                            ? "No"
                                            : category.validation}
                                        </TableCell>
                                        {/* <TableCell className={classes.textMiddle}>{category.valueInArray.length == 0 ? "No Options" : <OptionBox>
                                        {
                                          category.valueInArray.map((val, ind) => <OptionText key={ind}>{val.label}</OptionText>)
                                        }
                                      </OptionBox>}</TableCell> */}
                                        <TableCell
                                          style={{ textAlign: "center" }}
                                        >
                                          <Android12Switch
                                            onChange={(e) => {
                                              statusSwitch(e, category._id);
                                            }}
                                            checked={category.status}
                                          />
                                        </TableCell>
                                        {/* <TableCell style={{ textAlign: "center" }}>{`${category.status}`}</TableCell> */}
                                        <TableCell
                                          className={classes.textMiddle}
                                          style={{ textAlign: "center" }}
                                        >
                                          <Tooltip title="Edit Attribute" arrow>
                                            <Button
                                              onClick={() => {
                                                setAttributeData({
                                                  fieldType: category.fieldType,
                                                  title: category.title,
                                                  placeholder:
                                                    category.placeholder,
                                                  isRequired:
                                                    category.isRequired,
                                                  validation:
                                                    category.validation,
                                                  _id: category._id,
                                                  valueInArray:
                                                    category.valueInArray,
                                                  category_id: categoryId,
                                                });
                                                setClickedIndex(index);
                                                setIsAttributte(true);
                                              }}
                                              className=""
                                              style={{
                                                color: "#0294b3",
                                                border: "1.5px solid #F6F6F6",
                                                margin: "0.5rem",
                                              }}
                                            >
                                              {" "}
                                              <EditIcon />{" "}
                                            </Button>
                                          </Tooltip>
                                          {/* <Tooltip title="Delete Attribute" arrow><Button onClick={() => {
                                          DeleteAttribute(index)
                                        }}
                                          className="" style={{ color: "#696969", margin: "0.5rem", border: "1.5px solid #F6F6F6" }}><DeleteOutline /> </Button></Tooltip> */}
                                        </TableCell>
                                        <TableCell style={{ display: "none" }}>
                                          {(totallength = category.length)}
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </Draggable>
                                ))}
                              {provided.placeholder}
                            </TableBody>
                          )}
                        </Droppable>
                      </DragDropContext>
                      {/* <TableBody >
                        {isLoading ? <TableRow ><Skeleton style={{ width: "70vw", borderRadius: "20px" }} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb" /></TableRow> : false}
                        {
                          tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => (
                            <TableRow hover key={index}>
                              <TableCell component="th" scope="row" className={classes.textMiddle} >
                                {index + 1 + (page) * rowsPerPage}
                              </TableCell>
                              <TableCell className={classes.textMiddle}>{get(category.fields, "title", "")}</TableCell>
                              <TableCell className={classes.textMiddle} style={{ textAlign: "center" }} >
                                <Tooltip title="Edit Attribute" arrow><Button onClick={() => {
                                  setAttributeData({
                                    fieldType: get(category.fields, "fieldType", ""),
                                    title: get(category.fields, "title", ""),
                                    placeholder: get(category.fields, "placeholder", ""),
                                    isRequired: get(category.fields, "isRequired"),
                                    validation: get(category.fields, "validation", ""),
                                    _id: get(category.fields, "_id", ""),
                                    category_id: categoryId
                                  })
                                  setClickedIndex(index);
                                  setIsAttributte(true)
                                }} className="" style={{ color: "#0294b3", border: "1.5px solid #F6F6F6", margin: "0.5rem" }} > <EditIcon /> </Button></Tooltip>
                                <Tooltip title="Delete Attribute" arrow><Button onClick={() => {
                                  DeleteAttribute(index)
                                }}
                                  className="" style={{ color: "#696969", margin: "0.5rem", border: "1.5px solid #F6F6F6" }}><DeleteOutline /> </Button></Tooltip>
                              </TableCell>
                              <TableCell style={{ display: "none" }}>{totallength = category.length}</TableCell>
                            </TableRow>
                          )
                          )}
                      </TableBody> */}
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totallength ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
      {/* Attribute */}
      <Modal
        className="update_profile"
        isOpen={isAttributte}
        onClose={() => {
          setIsAttributte(false);
        }}
        fullWidth
        // maxWidth='400px'
        title={
          <div className="modalsign">
            <div
              className="closeicon"
              onClick={() => {
                setIsAttributte(false);
              }}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
        }
        content={
          <>
            <Formik
              enableReinitialize
              initialValues={attributeData}
              validateOnChange
              validate={attValidator}
              onSubmit={(values) => {
                console.log(attData);
                let fieldsData = attData[0].fields;
                fieldsData[clickedIndex] = values;
                console.log(fieldsData);
                if (attributeData._id) {
                  console.log("JIJI");
                  handleAttiUpdate(fieldsData);
                } else {
                  handleAtti(values);
                }
                console.log(values);
                console.log(clickedIndex);
                // handleAttiqwrrty
              }}
            >
              {(formikBag) => {
                return (
                  <Form>
                    <CategoryBox selected={true}>
                      <CatTitle>
                        {attributeData._id ? "Edit" : "Add"} Attribute
                      </CatTitle>
                      <CatRow>
                        <CatLabel>Type:</CatLabel>
                        <Field name="valueInArray">
                          {({ field }) => (
                            <div className="py-2">
                              <Select
                                className="cm-select"
                                value={getType(formikBag.values.fieldType)}
                                options={typeOptions}
                                onChange={(option) => {
                                  formikBag.setFieldValue(
                                    "fieldType",
                                    option.value
                                  );
                                  console.log(formikBag.values.fieldType);
                                }}
                                style={{ textAlign: "right" }}
                                // className="form-control"
                                placeholder="Select"
                                error={
                                  formikBag.touched.fieldType &&
                                  formikBag.errors.fieldType
                                    ? formikBag.errors.fieldType
                                    : null
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      {formikBag.values.fieldType == "Dropdown" ? (
                        <CatRow>
                          <CatBox>
                            <div>
                              <CatLabel>DropDown:</CatLabel>
                            </div>
                            <div>
                              <CatPlusButton
                                type="button"
                                onClick={() => {
                                  setIsOption(true);
                                  setOptionVal({
                                    option_name: "",
                                  });
                                }}
                              >
                                +
                              </CatPlusButton>
                            </div>
                          </CatBox>
                          <Field name="valueInArray">
                            {({ field }) => (
                              <div className="py-2">
                                <OptionsContainer>
                                  {formikBag.values.valueInArray.length == 0 ? (
                                    <div style={{ textAlign: "center" }}>
                                      No Options
                                    </div>
                                  ) : (
                                    formikBag.values.valueInArray.map(
                                      (val, ind) => (
                                        <Chip
                                          key={ind}
                                          style={{
                                            cursor: "pointer",
                                            margin: "0.3rem",
                                          }}
                                          variant="outlined"
                                          label={val.label}
                                          onDelete={() =>
                                            formikBag.setFieldValue(
                                              "valueInArray",
                                              formikBag.values.valueInArray.filter(
                                                (val, index) => index !== ind
                                              )
                                            )
                                          }
                                          onClick={() => {
                                            setIsOption(true);
                                            setOptionVal({
                                              option_name: val.label,
                                              index: ind,
                                            });
                                          }}
                                        />
                                      )
                                    )
                                  )}
                                </OptionsContainer>
                                {/* {
                                  valueArr.length > 0 ? formikBag.setFieldValue("valueInArray", ...valueArr) : []
                                } */}
                              </div>
                            )}
                          </Field>
                          {formikBag.touched.valueInArray &&
                          formikBag.errors.valueInArray ? (
                            <>
                              <p
                                style={{
                                  paddingTop: 5,
                                  fontSize: 13,
                                  color: "red",
                                }}
                              >
                                {formikBag.errors.valueInArray}
                              </p>
                            </>
                          ) : null}
                        </CatRow>
                      ) : (
                        ""
                      )}
                      <CatRow>
                        <CatLabel>Name:</CatLabel>
                        <Field name="title">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={formikBag.values.title}
                                onChange={(e) => {
                                  formikBag.setFieldValue(
                                    "title",
                                    e.target.value
                                  );
                                }}
                                style={{ color: "black" }}
                                placeholder="Name"
                                className="form-control"
                                error={
                                  formikBag.touched.title &&
                                  formikBag.errors.title
                                    ? formikBag.errors.title
                                    : null
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      <CatRow>
                        <CatLabel>Placeholder:</CatLabel>
                        <Field name="placeholder">
                          {({ field }) => (
                            <div className="py-2">
                              <Input
                                {...field}
                                type="text"
                                value={formikBag.values.placeholder}
                                onChange={(e) => {
                                  formikBag.setFieldValue(
                                    "placeholder",
                                    e.target.value
                                  );
                                }}
                                style={{ color: "black" }}
                                placeholder="Name"
                                className="form-control"
                                error={
                                  formikBag.touched.placeholder &&
                                  formikBag.errors.placeholder
                                    ? formikBag.errors.placeholder
                                    : null
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      <CatRow>
                        <CatLabel>CheckBox:</CatLabel>
                        <Field name="isRequired">
                          {({ field }) => (
                            <div className="py-2">
                              <Select
                                className="cm-select"
                                value={getReq(formikBag.values.isRequired)}
                                options={reqOptions}
                                onChange={(option) => {
                                  formikBag.setFieldValue(
                                    "isRequired",
                                    option.value
                                  );
                                  console.log(formikBag.values.isRequired);
                                }}
                                style={{ textAlign: "right" }}
                                // className="form-control"
                                placeholder="Select"
                              />
                            </div>
                          )}
                        </Field>
                      </CatRow>
                      {formikBag.values.isRequired ? (
                        <CatRow>
                          <CatLabel>Validation Message:</CatLabel>
                          <Field name="validation">
                            {({ field }) => (
                              <div className="py-2">
                                <Input
                                  {...field}
                                  type="text"
                                  value={formikBag.values.validation}
                                  onChange={(e) => {
                                    formikBag.setFieldValue(
                                      "validation",
                                      e.target.value
                                    );
                                  }}
                                  style={{ color: "black" }}
                                  placeholder="Name"
                                  className="form-control"
                                  error={
                                    formikBag.touched.validation &&
                                    formikBag.errors.validation
                                      ? formikBag.errors.validation
                                      : null
                                  }
                                />
                              </div>
                            )}
                          </Field>
                        </CatRow>
                      ) : (
                        ""
                      )}
                    </CategoryBox>
                    <ButtonBox>
                      <CatButton type="submit">Save</CatButton>
                    </ButtonBox>
                    {/* Options */}
                    <Modal
                      className="update_profile"
                      isOpen={isOption}
                      onClose={() => {
                        setIsOption(false);
                      }}
                      fullWidth
                      // maxWidth='400px'
                      title={
                        <div className="modalsign">
                          <div
                            className="closeicon"
                            onClick={() => {
                              setIsOption(false);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </div>
                        </div>
                      }
                      content={
                        <>
                          <Formik
                            enableReinitialize
                            initialValues={optionVal}
                            validateOnChange
                            validate={opNameValidator}
                            onSubmit={(values) => {
                              console.log(values);
                              if (
                                typeof optionVal.index === "number" &&
                                optionVal.index > -1
                              ) {
                                let optionData = formikBag.values.valueInArray;
                                optionData[values.index] = {
                                  label: values.option_name,
                                  value: values.option_name,
                                };
                                // console.log(optionData)
                                setIsOption(false);
                                formikBag.setFieldValue(
                                  "valueInArray",
                                  optionData
                                );
                              } else {
                                if (values) {
                                  setIsOption(false);
                                  formikBag.setFieldValue("valueInArray", [
                                    ...formikBag.values.valueInArray,
                                    {
                                      label: values.option_name,
                                      value: values.option_name,
                                    },
                                  ]);
                                } else {
                                  return "";
                                }
                              }
                            }}
                          >
                            {(formikBag) => {
                              return (
                                <Form>
                                  <CategoryBox selected={true}>
                                    <CatTitle>Dropdown Option</CatTitle>
                                    <CatRow>
                                      <CatLabel>Name:</CatLabel>
                                      <Field name="option_name">
                                        {({ field }) => (
                                          <div className="py-2">
                                            <Input
                                              {...field}
                                              type="text"
                                              value={
                                                formikBag.values.option_name
                                              }
                                              onChange={(e) => {
                                                formikBag.setFieldValue(
                                                  "option_name",
                                                  e.target.value
                                                );
                                              }}
                                              style={{ color: "black" }}
                                              placeholder="Name"
                                              className="form-control"
                                              error={
                                                formikBag.touched.option_name &&
                                                formikBag.errors.option_name
                                                  ? formikBag.errors.option_name
                                                  : null
                                              }
                                            />
                                          </div>
                                        )}
                                      </Field>
                                    </CatRow>
                                  </CategoryBox>
                                  <ButtonBox>
                                    <CatButton type="submit">Save</CatButton>
                                  </ButtonBox>
                                </Form>
                              );
                            }}
                          </Formik>
                        </>
                      }
                    />
                  </Form>
                );
              }}
            </Formik>
          </>
        }
      />

      {isLoading && <Overlay />}
    </React.Fragment>
  );
}
