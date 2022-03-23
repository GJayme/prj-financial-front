import Dashboard from "layouts/dashboard";
import { Transactions } from 'components/TransactionTable';
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const sidenavRoutes = [
 {
  type: "collapse",
  name: "Dashboard",
  key: "dashboard",
  icon: <Icon fontSize="small">dashboard</Icon>,
  route: "/dashboard",
  component: <Dashboard />,
 },
 {
  type: "collapse",
  name: "Transactions",
  key: "transactions",
  icon: <Icon fontSize="small">table_view</Icon>,
  route: "/transactions",
  component: <Transactions />,
 },
 {
  type: "collapse",
  name: "Profile",
  key: "profile",
  icon: <Icon fontSize="small">person</Icon>,
  route: "/profile",
  component: <Profile />,
 }
];

export default sidenavRoutes;
