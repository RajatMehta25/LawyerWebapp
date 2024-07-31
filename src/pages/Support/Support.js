import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
} from "@material-ui/core";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as SE from "./SupportElements";
import Overlay from "../../components/Overlay";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
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
    margin: "0.4rem",
    color: "#fff",
    backgroundColor: "#696969",
    "&:hover": {
      // backgroundColor: "yellow",
      color: "black",
    },
  },

  iconcolor: {
    margin: "0.4rem",
    color: "#fff !important",
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
    position: "relative",
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
    maxHeight: "37vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));

const Support = (props) => {
  const [tableData, setTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/get_all_ticket");
      console.log(data);
      setTableData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getResponsiveTime = (e) => {
    if (e) {
      const today = new Date();
      const endDate = new Date(e);
      const daysPassed = -parseInt((endDate - today) / (1000 * 60 * 60 * 24));
      const hoursPassed = parseInt(
        (Math.abs(endDate - today) / (1000 * 60 * 60)) % 24
      );
      const minutesPassed = parseInt(
        (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
      );
      const secondsPassed = parseInt(
        (Math.abs(endDate.getTime() - today.getTime()) / 1000) % 60
      );
      if (daysPassed > 365) {
        return `${Math.round(daysPassed / 365)} yr`;
      } else if (daysPassed < 365 && daysPassed > 28) {
        return `${Math.round(daysPassed / 28)} mon`;
      } else if (daysPassed < 28 && daysPassed > 10) {
        return `${daysPassed} day ago`;
      } else if (daysPassed < 10 && daysPassed > 1) {
        return `${daysPassed} day ago`;
      } else if (hoursPassed < 24 && hoursPassed > 1) {
        return `${hoursPassed} hours ago`;
      } else if (minutesPassed < 60 && minutesPassed > 1) {
        return `${minutesPassed} minutes`;
      } else {
        return `${secondsPassed} sec`;
      }
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <div className={classes.root}> */}
        <Paper className={classes.root}>
          <div className={classes.paperPaddingRightLeft}>
            <div className="py-4">
              <Paper
                elevation={0}
                className={classNames(
                  classes.paperHeading,
                  classes.headingAlignment
                )}
              >
                <h3 style={{ marginLeft: "1rem" }}>Support</h3>
                <SE.ParentConversation>
                <SE.CardBox>
                  {tableData.map((val, ind) => {
                    return (
                      <SE.TicketCard key={ind} to={`/support/${val.id}`}>
                        <SE.BoxOne>
                          <SE.OneInner>
                            {get(val, "requester.name").slice(0, 1)}
                          </SE.OneInner>
                        </SE.BoxOne>
                        <SE.BoxTwo>
                          <SE.TwoRow1>
                            <span style={{ marginRight: "0.4rem" }}>
                              {get(val, "subject")}
                            </span>{" "}
                            <span style={{ color: "#888e9f" }}>
                              {" "}
                              #{get(val, "id")}
                            </span>
                          </SE.TwoRow1>
                          <SE.TwoRow2>
                            <i
                              className="ph ph-globe"
                              style={{ marginRight: "0.35rem" }}
                            ></i>
                            {get(val, "requester.name")}{" "}
                            <SE.DotCom>&#8226;</SE.DotCom>{" "}
                            <span style={{ color: "#888e9f" }}>
                              Created{" "}
                              {getResponsiveTime(get(val, "created_at"))}{" "}
                            </span>
                            <SE.DotCom>&#8226;</SE.DotCom>{" "}
                            <span style={{ color: "#888e9f" }}>
                              due in {getResponsiveTime(get(val, "fr_due_by"))}
                            </span>
                          </SE.TwoRow2>
                        </SE.BoxTwo>
                      </SE.TicketCard>
                    );
                  })}
                </SE.CardBox>
                </SE.ParentConversation>
              </Paper>
            </div>
          </div>
        </Paper>
        {/* </div> */}
      </div>
      {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default Support;
