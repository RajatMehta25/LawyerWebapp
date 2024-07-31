import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "./statics/constants";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

function runOnceOnChange(callback) {
  let hasRun = false; // variable to track if the function has been executed

  return function (event) {
    if (!hasRun) {
      // check if the function has been executed before
      hasRun = true; // mark the function as executed
      callback(event); // call the provided callback function
    }
  };
}

const onChangeOnce = runOnceOnChange(newfun);

async function newfun() {
  alert("Your Access has been Modified");
  const token = Cookies.get("admin_access_token");
  const { data } = await axios.get(`/admin/role_access_updated_key`, {
    headers: {
      accessToken: token,
    },
  });
  console.log("newfun");
  console.log(data);
  if (data.data.isSuperAdmin) {
    console.log("iffffffff");
    Cookies.remove("access");
    Cookies.set("access", JSON.stringify(data.data.access), {
      expires: 365,
    });
    window.location.href = "/dashboard";
  } else {
    console.log("test");
    console.log(data.data.roll_access_id.roll_access);
    Cookies.remove("access");
    Cookies.remove("rolename");
    Cookies.set("access", JSON.stringify(data.data.roll_access_id.roll_access), {
      expires: 365,
    });
    Cookies.set("rolename", JSON.stringify(data.data.roll_access_id.roll_name), {
      expires: 365,
    });
    switch (data.data.roll_access_id.roll_access[0]) {
      case "Dashboard":
        window.location.href = `/adminPanel/dashboard`;
        break;
      case "Account Management":
        window.location.href = `/adminPanel/account-managment-new`;
        // this.props.history.push(`/`);
        break;
      case "Question Category Management":
        window.location.href = `/adminPanel/Category_Management`;
        // this.props.history.push(`/Category_Management`);
        break;
      case "Subscription Management":
        window.location.href = `/adminPanel/Subscription_Management`;

        // this.props.history.push(`/Subscription_Management`);
        break;
      case "Subscribed User Listing":
        window.location.href = `/adminPanel/SubscriptionList`;

        // this.props.history.push(`/SubscriptionList`);
        break;
      case "Blog Management":
        window.location.href = `/adminPanel/Blog`;
        // this.props.history.push(`/Blog`);
        break;
      case "Press Management":
        window.location.href = `/adminPanel/press-management`;
        // this.props.history.push(`/press-management`);
        break;
      case "Notification Management":
        window.location.href = `/adminPanel/Notification_Management`;
        // this.props.history.push(`/Notification_Management`);
        break;
      case "Member Price Management":
        window.location.href = `/adminPanel/member-price`;
        // this.props.history.push(`/member-price`);
        break;
      case "Testimonial Management":
        window.location.href = `/adminPanel/testimonial-management`;
        // this.props.history.push(`/testimonial-management`);
        break;
      case "FAQ Management":
        window.location.href = `/adminPanel/FAQ_Management`;
        // this.props.history.push(`/FAQ_Management`);
        break;
      case "Content Management":
        window.location.href = `/adminPanel/content`;
        // this.props.history.push(`/content`);
        break;
      case "Accounting":
        window.location.href = `/adminPanel/accounting`;
        // this.props.history.push(`/accounting`);
        break;
      case "Support":
        window.location.href = `/adminPanel/support`;
        // this.props.history.push(`/support`);
        break;

      default:
        break;
    }

    console.log("elseeeeeeee");
  }
}
//logout
function runOnceOnChangeLogout(callback) {
  let hasRun = false; // variable to track if the function has been executed

  return function (event) {
    if (!hasRun) {
      // check if the function has been executed before
      hasRun = true; // mark the function as executed
      callback(event); // call the provided callback function
    }
  };
}

const onChangeOnceLogout = runOnceOnChangeLogout(logout);

function logout() {
  alert("It looks like your account has been blocked. Please contact your admin to unblock it");
  Cookies.remove("admin_access_token");
  Cookies.remove("access");
  Cookies.remove("email");
  // this.props.history.push("/login");

  window.location.href = "/adminPanel/login";
}

instance.interceptors.request.use(
  async (config) => {
    // console.log(instance.interceptors.request);
    const token = Cookies.get("admin_access_token");
    if (token) {
      // console.log(token);
      // console.log(config);
      // config.headers["access_token"] = token;
      config.headers["accessToken"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // const superAccess = Cookies.get("access");
    // console.log(superAccess);
    console.log(error.response?.status);
    if (error.response?.status === 903) {
      onChangeOnce();

      // window.location.href = "/adminPanel/login";
    } else if (error.response?.status === 901) {
      onChangeOnceLogout();
    } else {
      console.log(error.response);
      // alert(`Error:${error.response.data.message}`);
      // Cookies.remove("admin_access_token");
      // window.location.href = "/adminPanel/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
