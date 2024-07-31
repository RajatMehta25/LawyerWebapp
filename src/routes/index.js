import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
// import Dashboard from "../pages/Dashboard/index";
// import UserManagement from "../pages/UserManagement/UserManagement";
// import AccountManagement from "../pages/AccountManagement/Account_Management";
// import Account_Management_New from "../pages/AccountManagement/Account_Management_New";
// import AccountDetails from "../pages/AccountManagement/Account_Details";
// import Account_Details_New from "../pages/AccountManagement/Account_Details_New";

// import changePassword from "../pages/Authentication/changePasword";
// import TemplateManagement from "../pages/TemplateManagement/Template_Management";
// import AddEditTemplate from "../pages/TemplateManagement/Add_Edit_Template";
// import Category_Management from "../pages/CategoryManagement/Category_Management";
// import EditCategoryAttributes from "../pages/CategoryManagement/EditCategoryAttributes";
// import AddEditAttributes from "../pages/CategoryManagement/AddEditAttributes";
// import Subscription_Management from "../pages/Subscription_Management/Subscription_Management";
// import AddEditSubscription from "../pages/Subscription_Management/AddEditSubscription";
// import Notification_Management from "../pages/Notification_Management/Notification_Management";
// import SubAdmin_Management from "../pages/SubAdmin_Management/SubAdmin_Management";
// import Service_Details from "../pages/Service_Category_Management/Service_Details";
// import Service_Category_Management from "../pages/Service_Category_Management/Service_Category_Management";
// import AddEditServiceCategory from "../pages/Service_Category_Management/AddEditServiceCategory";
// import AddEditServiceDetails from "../pages/Service_Category_Management/AddEditServiceDetails";
// import FAQ_Management from "../pages/FAQ_Management/FAQ_Management";
// import PaymentGatewayManagement from "../pages/PaymentGatewayManagement/PaymentGatewayManagement";
// import AddEdit_PaymentGateway from "../pages/PaymentGatewayManagement/Add_Edit_PaymentGateway";
// import Press from "../pages/Press/Press";
// import AddEdit_Press from "../pages/Press/Add_Edit_Press";
// import Testimonial from "../pages/Testimonial/Testimonial";
// import AddEdit_Test from "../pages/Testimonial/Add_Edit_Test";
// import Accounting from "../pages/Accounting/Accounting";
// import Support from "../pages/Support/Support";
// import MemberPrice from "../pages/MemberPrice/MemberPrice";
// import SubscriptionList from "../pages/SubscriptionList/SubscriptionList";
// import BlogManagement from "../pages/BlogManagement/BlogManagement";
// import AddEditBlog from "../pages/BlogManagement/AddEditBlog";
// import AddEdit_SubAdmin from "../pages/SubAdmin_Management/AddEdit_SubAdmin";
// import Role_Management from "../pages/Role_Management/Role_Management"
// import ContentManagement from "../pages/ContentManagement/Content_Management";
// import SupportView from "../pages/Support/SupportView";


//lazy
const Notification_Management = React.lazy(() => import("../pages/Notification_Management/Notification_Management"));
const SubAdmin_Management = React.lazy(() => import("../pages/SubAdmin_Management/SubAdmin_Management"));
const Service_Details = React.lazy(() => import("../pages/Service_Category_Management/Service_Details"));
const Service_Category_Management = React.lazy(() => import("../pages/Service_Category_Management/Service_Category_Management"));
const AddEditServiceCategory = React.lazy(() => import("../pages/Service_Category_Management/AddEditServiceCategory"));
const AddEditServiceDetails = React.lazy(() => import("../pages/Service_Category_Management/AddEditServiceDetails"));
const FAQ_Management = React.lazy(() => import("../pages/FAQ_Management/FAQ_Management"));
const PaymentGatewayManagement = React.lazy(() => import("../pages/PaymentGatewayManagement/PaymentGatewayManagement"));
const AddEdit_PaymentGateway = React.lazy(() => import("../pages/PaymentGatewayManagement/Add_Edit_PaymentGateway"));
const Press = React.lazy(() => import("../pages/Press/Press"));
const AddEdit_Press = React.lazy(() => import("../pages/Press/Add_Edit_Press"));
const Testimonial = React.lazy(() => import("../pages/Testimonial/Testimonial"));
const AddEdit_Test = React.lazy(() => import("../pages/Testimonial/Add_Edit_Test"));
const Accounting = React.lazy(() => import("../pages/Accounting/Accounting"));
const Support = React.lazy(() => import("../pages/Support/Support"));
const MemberPrice = React.lazy(() => import("../pages/MemberPrice/MemberPrice"));
const SubscriptionList = React.lazy(() => import("../pages/SubscriptionList/SubscriptionList"));
const BlogManagement = React.lazy(() => import("../pages/BlogManagement/BlogManagement"));
const AddEditBlog = React.lazy(() => import("../pages/BlogManagement/AddEditBlog"));
const AddEdit_SubAdmin = React.lazy(() => import("../pages/SubAdmin_Management/AddEdit_SubAdmin"));
const Role_Management = React.lazy(() => import("../pages/Role_Management/Role_Management"));
const ContentManagement = React.lazy(() => import("../pages/ContentManagement/Content_Management"));
const SupportView = React.lazy(() => import("../pages/Support/SupportView"));
const AddEditSubscription = React.lazy(() => import("../pages/Subscription_Management/AddEditSubscription"));
const Subscription_Management = React.lazy(() => import("../pages/Subscription_Management/Subscription_Management"));
const AddEditAttributes = React.lazy(() => import("../pages/CategoryManagement/AddEditAttributes"));
const EditCategoryAttributes = React.lazy(() => import("../pages/CategoryManagement/EditCategoryAttributes"));
const Category_Management = React.lazy(() => import("../pages/CategoryManagement/Category_Management"));
const AddEditTemplate = React.lazy(() => import("../pages/TemplateManagement/Add_Edit_Template"));
const TemplateManagement = React.lazy(() => import("../pages/TemplateManagement/Template_Management"));
const changePassword = React.lazy(() => import("../pages/Authentication/changePasword"));
const Account_Details_New = React.lazy(() => import("../pages/AccountManagement/Account_Details_New"));
const AccountDetails = React.lazy(() => import("../pages/AccountManagement/Account_Details"));
const Account_Management_New = React.lazy(() => import("../pages/AccountManagement/Account_Management_New"));
const AccountManagement = React.lazy(() => import("../pages/AccountManagement/Account_Management"));
const UserManagement = React.lazy(() => import("../pages/UserManagement/UserManagement"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/index"));










const adminToken = Cookies.get("admin_access_token");
console.log("tokennnnn",adminToken)
const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //new routes
  { path: "/user-managment", component: UserManagement },

  { path: "/account-managment", component: AccountManagement },
  { path: "/account-managment-new", component: Account_Management_New },
  { path: "/account-details", component: AccountDetails },
  { path: "/account-details-new", component: Account_Details_New },

  { path: "/Category_Management", component: Category_Management },
  { path: "/AddEditAttributes", component: AddEditAttributes },
  { path: "/EditCategoryAttributes", component: EditCategoryAttributes },
  // {path:"/category-new",component:Category},
  // { path: "/SubAdmin_Management", component: SubAdmin_Management },

  { path: "/changePassword", component: changePassword },

  { path: "/template-management", component: TemplateManagement },
  { path: "/template-add", component: AddEditTemplate },
  { path: "/template-edit", component: AddEditTemplate },

  { path: "/Subscription_Management", component: Subscription_Management },
  { path: "/AddEditSubscription", component: AddEditSubscription },

  { path: "/SubscriptionList", component: SubscriptionList },

  { path: "/Blog", component: BlogManagement },
  { path: "/AddEditBlog", component: AddEditBlog },

  { path: "/Notification_Management", component: Notification_Management },

  { path: "/member-price", component: MemberPrice },

  {
    path: "/Service_Category_Management",
    component: Service_Category_Management,
  },
  { path: "/AddEditServiceCategory", component: AddEditServiceCategory },
  { path: "/Service_Details", component: Service_Details },
  { path: "/AddEditServiceDetails", component: AddEditServiceDetails },

  { path: "/FAQ_Management", component: FAQ_Management },

  { path: "/payment-gateway", component: PaymentGatewayManagement },
  { path: "/AddEdit_PaymentGateway", component: AddEdit_PaymentGateway },

  { path: "/content", component: ContentManagement },

  { path: "/press-management", component: Press },
  { path: "/AddEdit_Press", component: AddEdit_Press },

  { path: "/testimonial-management", component: Testimonial },
  { path: "/AddEdit_Test", component: AddEdit_Test },

  { path: "/accounting", component: Accounting },

  { path: "/support/:id", component: SupportView },
  { path: "/support", component: Support },

  { path: "/SubAdmin_Management", component: SubAdmin_Management },
  { path: "/AddEdit_SubAdmin", component: AddEdit_SubAdmin },


  { path: "/RoleManagement", component: Role_Management },


  // { path: "*", component: Dashboard },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () =>  Cookies.get("admin_access_token") ? <Redirect to="/dashboard" /> :<Redirect to="/login" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/auth-lock-screen", component: AuthLockScreen },
];

const dynamicRoutes = () => {
  const rolesAccess = Cookies.get("access") ? JSON.parse(Cookies.get("access")) : [];

  // let cookies = Cookies.get("access");

  // var rolesAccess = [];
  // if (cookies !== undefined) {
  //   rolesAccess = JSON.parse(cookies);
  // } else {
  //   rolesAccess = [];
  // }
  // alert(rolesAccess)
  // const adminOrSubAdmin = Cookies.get("isSuperAdmin")
  //   ? JSON.parse(Cookies.get("isSuperAdmin"))
  //   : [];
  // console.log(rolesAccess);
  // const adminToken = Cookies.get("admin_access_token");

  let routesToMap = [];
  console.log(rolesAccess);
  if (rolesAccess.includes("all")) {
    // if (JSON.stringify(adminOrSubAdmin) === "true") {
    // 	routesToMap.push(
    // 		{ path: "/adminPanel/AddEdit_SubAdmin", component: AddEdit_SubAdmin },
    // 	)
    // }
    routesToMap.push(...authProtectedRoutes);
  } else {
    if (rolesAccess.includes("Dashboard")) {
      routesToMap.push(  { path: "/dashboard", component: Dashboard });
    }

    if (rolesAccess.includes("Account Management")) {
      routesToMap.push(
        { path: "/account-managment", component: AccountManagement },
        { path: "/account-managment-new", component: Account_Management_New },
        { path: "/account-details", component: AccountDetails },
        { path: "/account-details-new", component: Account_Details_New }
      );
    }
    if (rolesAccess.includes("Question Category Management")) {
      routesToMap.push(
        { path: "/Category_Management", component: Category_Management },
        { path: "/AddEditAttributes", component: AddEditAttributes },
        { path: "/EditCategoryAttributes", component: EditCategoryAttributes }
      );
    }
    // if (rolesAccess.includes("Sub Category Management")) {
    // 	routesToMap.push({ path: "/adminPanel/subCategory", component: Show_Sub_Category_List },
    // 	{ path: "/adminPanel/addSubCategory", component: Add_Edit_Sub_Category },
    // 	{ path: "/adminPanel/editSubCategory", component: Add_Edit_Sub_Category }

    // 	)
    // }
    if (rolesAccess.includes("Subscription Management")) {
      routesToMap.push(
        { path: "/Subscription_Management", component: Subscription_Management },
        { path: "/AddEditSubscription", component: AddEditSubscription },
        { path: "/SubscriptionList", component: SubscriptionList }
      );
    }
    if (rolesAccess.includes("Subscribed User Listing")) {
      routesToMap.push({ path: "/SubscriptionList", component: SubscriptionList });
    }
    // if (rolesAccess.includes("SubAdmin Management")) {
    //   routesToMap.push(
    //     { path: "/SubAdmin_Management", component: SubAdmin_Management },
    //     { path: "/AddEdit_SubAdmin", component: AddEdit_SubAdmin }
    //   );
    // }
    if (rolesAccess.includes("Blog Management")) {
      routesToMap.push({ path: "/Blog", component: BlogManagement }, { path: "/AddEditBlog", component: AddEditBlog });
    }
    if (rolesAccess.includes("Press Management")) {
      routesToMap.push({ path: "/press-management", component: Press }, { path: "/AddEdit_Press", component: AddEdit_Press });
    }

    if (rolesAccess.includes("Notification Management")) {
      routesToMap.push({ path: "/Notification_Management", component: Notification_Management });
    }

    if (rolesAccess.includes("Member Price Management")) {
      routesToMap.push({ path: "/member-price", component: MemberPrice });
    }
    if (rolesAccess.includes("Testimonial Management")) {
      routesToMap.push(
        { path: "/testimonial-management", component: Testimonial },
        { path: "/AddEdit_Test", component: AddEdit_Test }
      );
    }
    if (rolesAccess.includes("FAQ Management")) {
      routesToMap.push({ path: "/FAQ_Management", component: FAQ_Management });
    }
    if (rolesAccess.includes("Content Management")) {
      routesToMap.push({ path: "/content", component: ContentManagement });
    }
    if (rolesAccess.includes("Accounting")) {
      routesToMap.push({ path: "/accounting", component: Accounting });
    }
    if (rolesAccess.includes("Support")) {
      routesToMap.push({ path: "/support/:id", component: SupportView }, { path: "/support", component: Support });
    }

    // routesToMap.push({ path: "/adminPanel/changePassword", component: changePassword })
    routesToMap.push(
      // {
      //   path: "/adminPanel/dashboard",
      //   component: Dashboard,
      // },
      { path: "/changePassword", component: changePassword },
    

      // {
      //   path: "/adminPanel/ContactUs",
      //   component: ContactUs,
      // }
    );

    routesToMap.push({
      path: "/",
      exact: true,
      component: () => (Cookies.get("admin_access_token") ? <Redirect to="/dashboard" /> : <Redirect to="/login" />),
    });
  }
  // }
  return routesToMap;
};

export { authProtectedRoutes, publicRoutes, dynamicRoutes };
