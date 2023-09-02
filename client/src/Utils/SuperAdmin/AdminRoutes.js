import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Filter2Icon from "@mui/icons-material/Filter2";
import Dashboard from "../../pages/superadmin/Dashboard";
import Types from "../../pages/superadmin/Types";

const AdminRoutes = [
	{
		name: "Dashboard",
		icon: <DashboardRoundedIcon />,
		path: "/",
		element: <Dashboard />,
		type: "drawer",
	},
	{
		name: "Types",
		icon: <Filter2Icon />,
		path: "/types",
		element: <Types />,
		type: "drawer",
	},
];

export default AdminRoutes;
