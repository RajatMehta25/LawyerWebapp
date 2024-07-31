import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "../../axios";
import { Line } from "react-chartjs-2";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import SalesAnalytics from "./SalesAnalytics";
import MiniWidgets from "./MiniWidgets";
import "./dashboard.scss";
import Overlay from "../../components/Overlay";
import { get } from "lodash"

const StarterPage = () => {
  const [tableData, setTableData] = useState([]);
  const [dashData, setDashData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  
  const getCategory = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/admin/dashboard?year=2023");
      setTableData(data.data);
      setDashData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const breadcrumbItems = [
    { title: "Thoolie", link: "#" },
    { title: "Dashboard", link: "#" },
  ];

  const reports = [
    {
      icon: "ri-user-fill",
      title: "Total Non-Subscribed User",
      value: get(tableData, "totalNonSubscribedUser", ""),
    },
    {
      icon: "ri-user-fill",
      title: "Total Number Of User",
      value: get(tableData, "totalNumberOfUsers", ""),
    },
    {
      icon: "ri-user-fill",
      title: "Total Revenue",
      value: `$ ${tableData.totalRevenue?.toFixed(2)||''}`,
    },
    {
      icon: "ri-user-fill",
      title: "Total Revenue Subscribed Plan",
      value: `$ ${tableData.totalRevenueFromBuyPlan?.toFixed(2)||''}`,
    },
    {
      icon: "ri-user-fill",
      title: "Total Revenue Template Download",
      value: `$ ${tableData.totalRevenueTemplateDownload?.toFixed(2)||''}`,
    },
    {
      icon: "ri-user-fill",
      title: "Total Subscribed User",
      value: get(tableData, "totalSubscribedUser", "")
    },
  ];

  // Graph
  const { totalGraph, mostSoldProducts } = dashData;
  const labels = totalGraph?.map((val) => val.nameId);
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "Total Revenue",
        data: totalGraph?.map((val) => val.total_revenue),
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 1,
        scaleLabel: function (label) {
          return (
            " $" + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
        },
      },
      {
        axis: "y",
        label: "Total Subscription Payment",
        data: totalGraph?.map((val) => val.total_subscription_payment),
        fill: false,
        backgroundColor: "#0294b3",
        borderColor: "#0294b3",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Seller Chart",
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {},
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            // Return an empty string to draw the tick line but hide the tick label
            // Return `null` or `undefined` to hide the tick line entirely
            userCallback: function (value, index, values) {
              // Convert the number to a string and splite the string every 3 charaters from the end
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);

              // Convert the array to a string and format the output
              value = value.join(".");
              return "$" + value;
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItems, data) {
          console.log(tooltipItems);
          console.log(data);
          return "$" + tooltipItems.yLabel.toString();
        },
      },
      // callbacks: {
      //     label: function (tooltipItems, data) {
      //         console.log(tooltipItems);
      //         console.log(data);
      //         return "$" + tooltipItems.yLabel.toString() + data.datasets[1]?.label;
      //     }
      // },
      // title:
      // title:
    },
  };

  return (
    <React.Fragment>
      <div>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />
            <Row>
              <Col xl={12}>
                <Row>
                  <MiniWidgets reports={reports} />
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="graph-box">
          <Line options={options} data={data} />
        </div>
      </div>

      {isLoading && <Overlay />}
    </React.Fragment>
  );
};

export default StarterPage;
