import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Header from "../components/common/Header";
import Expenses from "./Accounts/Expenses";
import Invoices from "./Accounts/Invoices";
import Payments from "./Accounts/Payments";
import HrDashboard from "./Dashboard/HrDashboard";
import ProjectDashboard from "./Dashboard/ProjectDashboard";
import Attendance from "./Employee/Attendance";
import AttendanceEmployees from "./Employee/AttendanceEmployees";
import Departments from "./Employee/Departments";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Holidays from "./Employee/Holidays";
import LeaveRequest from "./Employee/LeaveRequest";
import Members from "./Employee/Members";
import ClientProfile from "./Our Clients/ClientProfile";
import Clients from "./Our Clients/Clients";
import Salaryslip from "./Payroll/Salaryslip";
import Leaders from "./Projects/Leaders";
import Projects from "./Projects/Projects";
import Tasks from "./Projects/Tasks";
import Timesheet from "./Projects/Timesheet";
import TicketsDetail from "./Tickets/TicketsDetail";
import TicketsView from "./Tickets/TicketsView";
import Alerts from "./UIComponents/Alerts";
import Calendar from "./App/Calendar";
import ChatApp from "./App/ChatApp";
import ApexCharts from "./OtherPages/ApexCharts";
import FormsExample from "./OtherPages/FormsExample";
import TablesExample from "./OtherPages/TablesExample";
import ReviewsPage from "./OtherPages/ReviewsPage";
import Icons from "./OtherPages/Icons";
import Widgets from "./OtherPages/Widgets";
import Badges from "./UIComponents/Badges";
import Breadcrumb from "./UIComponents/Breadcrumb";
import Buttons from "./UIComponents/Buttons";
import Cards from "./UIComponents/Cards";
import Carousel from "./UIComponents/Carousel";
import Collapse from "./UIComponents/Collapse";
import Dropdowns from "./UIComponents/Dropdowns";
import ListGroup from "./UIComponents/ListGroup";
import ModalUI from "./UIComponents/ModalUI";
import NavsUI from "./UIComponents/NavsUI";
import NavbarUI from "./UIComponents/NavbarUI";
import PaginationUI from "./UIComponents/PaginationUI";
import PopoversUI from "./UIComponents/PopoversUI";
import ProgressUI from "./UIComponents/ProgressUI";
import Scrollspy from "./UIComponents/Scrollspy";
import SpinnersUI from "./UIComponents/SpinnersUI";
import ToastsUI from "./UIComponents/ToastsUI";
import StaterPage from "./Stater/StaterPage";
import PageHeader1 from "../components/common/PageHeader1";
import Documentation from "./Documentation/Documentation";
import Changelog from "./Changelog/Changelog";
import Help from "./Dashboard/Help";
import ManageRoles from "./User_Management/ManageRoles";
import ManageUsers from "./User_Management/ManageUsers";
import NotFound from "./NotFound";
import PageRoute from "./PageRoute";
const All_Routes = [
  {
    route: "/",
    component: HrDashboard,
  },
  {
    name: "Hr Dashboard",
    route: "/hr-dashboard",
    component: HrDashboard,
  },
  {
    name: "Project Dashboard",
    route: "/project-dashboard",
    component: ProjectDashboard,
  },
  {
    name: "Projects",
    route: "/projects",
    component: Projects,
  },
  {
    name: "Tasks",
    route: "/tasks",
    component: Tasks,
  },
  {
    name: "Timesheet",
    route: "/timesheet",
    component: Timesheet,
  },

  {
    name: "Leaders",
    route: "/leaders",
    component: Leaders,
  },
  {
    name: "Tickets View",
    route: "/tickets-view",
    component: TicketsView,
  },
  {
    name: "Tickets Detail",
    route: "/tickets-detail",
    component: TicketsDetail,
  },
  {
    name: "Clients",
    route: "/clients",
    component: Clients,
  },
  {
    name: "Client Profile",
    route: "/client-profile",
    component: ClientProfile,
  },
  {
    name: "Members",
    route: "/members",
    component: Members,
  },
  {
    name: "Members Profile",
    route: "/members-profile",
    component: EmployeeProfile,
  },
  {
    name: "Holidays",
    route: "/holidays",
    component: Holidays,
  },
  {
    name: "Attendance Employees",
    route: "/attendance-employees",
    component: AttendanceEmployees,
  },
  {
    name: "Attendance",
    route: "/attendance",
    component: Attendance,
  },
  {
    name: "Leave Request",
    route: "/leave-request",
    component: LeaveRequest,
  },
  {
    name: "Department",
    route: "/department",
    component: Departments,
  },
  {
    name: "Invoices",
    route: "/invoices",
    component: Invoices,
  },
  {
    name: "Payments",
    route: "/payments",
    component: Payments,
  },
  {
    name: "Expenses",
    route: "/expenses",
    component: Expenses,
  },
  {
    name: "Employee Salary",
    route: "/employee-salary",
    component: Salaryslip,
  },
  {
    name: "Calander",
    route: "/calander",
    component: Calendar,
  },
  {
    name: "Chat App",
    route: "/chat-app",
    component: ChatApp,
  },
  {
    name: "Apex Charts",
    route: "/apex-charts",
    component: ApexCharts,
  },
  {
    name: "Forms Example",
    route: "/forms-example",
    component: FormsExample,
  },
  {
    name: "Table Example",
    route: "/table-example",
    component: TablesExample,
  },
  {
    name: "Reviews Page",
    route: "/reviews-page",
    component: ReviewsPage,
  },
  {
    name: "Icons",
    route: "/icons",
    component: Icons,
  },
  {
    name: "Widgets",
    route: "/widgets",
    component: Widgets,
  },
  {
    route: "/ui-alerts",
    component: Alerts,
  },
  {
    route: "/ui-badge",
    component: Badges,
  },
  {
    route: "/ui-breadcrumb",
    component: Breadcrumb,
  },
  {
    route: "/ui-buttons",
    component: Buttons,
  },
  {
    route: "/ui-card",
    component: Cards,
  },
  {
    route: "/ui-carousel",
    component: Carousel,
  },
  {
    route: "/ui-collapse",
    component: Collapse,
  },
  {
    route: "/ui-dropdowns",
    component: Dropdowns,
  },
  {
    route: "/ui-listgroup",
    component: ListGroup,
  },
  {
    route: "/ui-modalui",
    component: ModalUI,
  },
  {
    route: "/ui-navsui",
    component: NavsUI,
  },
  {
    route: "/ui-paginationui",
    component: PaginationUI,
  },
  {
    route: "/ui-popoversui",
    component: PopoversUI,
  },
  {
    route: "/ui-progressu",
    component: ProgressUI,
  },
  {
    route: "/ui-Scrollspyui",
    component: Scrollspy,
  },
  {
    route: "/ui-spinnersui",
    component: SpinnersUI,
  },
  {
    route: "/ui-toastsui",
    component: ToastsUI,
  },
  {
    route: "stater-page",
    component: StaterPage,
  },

  {
    route: "/documentation",
    component: Documentation,
  },
  {
    route: "/changelog",
    component: Changelog,
  },
  {
    route: "/help",
    component: Help,
  },
  {
    name: "Manage Roles",
    route: "/manage-roles",
    component: ManageRoles,
  },
  {
    name: "Manage Users",
    route: "/manage-users",
    component: ManageUsers,
  },
  {
    route: "/page-not-found",
    component: NotFound,
  },
];

function MainIndex(props) {
  const { activekey } = props;
  const data = JSON.parse(localStorage.getItem("menus"));
  let formattedAccess = [];
  data?.map((item) => {
    item?.children?.map((i) =>
      formattedAccess.push({ name: i?.name, status: i?.status })
    );
  });
  return (
    <div className="main px-lg-4 px-md-4">
      {activekey !== "/chat-app" ? (
        activekey === "/documentation" ? (
          <PageHeader1 />
        ) : (
          <Header />
        )
      ) : (
        ""
      )}
      <div className="body d-flex py-lg-3 py-md-2">
        {All_Routes?.filter((f) =>
          f?.name
            ? formattedAccess?.find((a) => a?.name === f?.name && a?.status)
            : f
        )?.map((item) => (
          <PageRoute
            routes={All_Routes?.filter((f) =>
              f?.name
                ? formattedAccess?.find((a) => a?.name === f?.name && a?.status)
                : f
            )}
            url={`/${window.location.pathname.split("/").reverse()[0]}`}
          >
            <Route
              exact
              path={`${process.env.PUBLIC_URL}${item?.route}`}
              component={item?.component}
            />
          </PageRoute>
        ))}
      </div>
    </div>
  );
}

export default MainIndex;

{
  /* <div className="body d-flex py-lg-3 py-md-2">
<Route
  exact
  path={`${process.env.PUBLIC_URL}/`}
  component={HrDashboard}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/hr-dashboard`}
  component={HrDashboard}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/project-dashboard`}
  component={ProjectDashboard}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/projects`}
  component={Projects}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/tasks`}
  component={Tasks}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/timesheet`}
  component={Timesheet}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/leaders`}
  component={Leaders}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/tickets-view`}
  component={TicketsView}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/tickets-detail`}
  component={TicketsDetail}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/clients`}
  component={Clients}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/client-profile`}
  component={ClientProfile}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/members`}
  component={Members}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/members-profile`}
  component={EmployeeProfile}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/holidays`}
  component={Holidays}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/attendance-employees`}
  component={AttendanceEmployees}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/attendance`}
  component={Attendance}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/leave-request`}
  component={LeaveRequest}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/department`}
  component={Departments}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/invoices`}
  component={Invoices}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/payments`}
  component={Payments}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/expenses`}
  component={Expenses}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/employee-salary`}
  component={Salaryslip}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/calander`}
  component={Calendar}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/chat-app`}
  component={ChatApp}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/apex-charts`}
  component={ApexCharts}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/forms-example`}
  component={FormsExample}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/table-example`}
  component={TablesExample}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/reviews-page`}
  component={ReviewsPage}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/icons`}
  component={Icons}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/widgets`}
  component={Widgets}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-alerts`}
  component={Alerts}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-badge`}
  component={Badges}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-breadcrumb`}
  component={Breadcrumb}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-buttons`}
  component={Buttons}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-card`}
  component={Cards}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-carousel`}
  component={Carousel}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-collapse`}
  component={Collapse}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-dropdowns`}
  component={Dropdowns}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-listgroup`}
  component={ListGroup}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-modalui`}
  component={ModalUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-navsui`}
  component={NavsUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-navbarui`}
  component={NavbarUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-paginationui`}
  component={PaginationUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-popoversui`}
  component={PopoversUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-progressui`}
  component={ProgressUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-Scrollspyui`}
  component={Scrollspy}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-spinnersui`}
  component={SpinnersUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/ui-toastsui`}
  component={ToastsUI}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/stater-page`}
  component={StaterPage}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/documentation`}
  component={Documentation}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/changelog`}
  component={Changelog}
/>
<Route exact path={`${process.env.PUBLIC_URL}/help`} component={Help} />
<Route
  exact
  path={`${process.env.PUBLIC_URL}/manage-roles`}
  component={ManageRoles}
/>
<Route
  exact
  path={`${process.env.PUBLIC_URL}/manage-users`}
  component={ManageUsers}
/>
</div> */
}
