import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Add from "../../pages/Add";
import Friend from "../../pages/Friend";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Setting from "../../pages/Setting";
import GroupDetail from "../../pages/groups/GroupDetail";
import Groups from "../../pages/groups/Groups";
import CloseDays from "../../pages/CloseDays";
import WinNumber from "../../pages/WinNumber";
import Chats from "../../pages/chat/Chats";

const UserRoutes = [
	{
		name: "Home",
		icon: "",
		path: "/",
		element: <Home />,
	},
	{
		name: "Add",
		icon: "",
		path: "/add",
		element: <Add />,
	},
	{
		name: "Group Details",
		icon: "",
		path: "/group/:id",
		element: <GroupDetail />,
	},
	{
		name: "Profile",
		icon: "",
		path: "/profile",
		element: <Profile />,
	},
	{
		name: "Setting",
		icon: "",
		path: "/setting",
		element: <Setting />,
	},
	{
		name: "အဖွဲ့များ",
		icon: <GroupsIcon />,
		path: "/groups",
		element: <Groups />,
		type: "drawer",
	},
	{
		name: "မိတ်ဆွေများ",
		icon: <GroupRoundedIcon />,
		path: "/friends",
		element: <Friend />,
		type: "drawer",
	},
	{
		name: "ပေါ်က်သူများ",
		icon: <EmojiEventsIcon />,
		path: "/winners",
		element: "",
		type: "drawer",
	},
	{
		name: "ထွက်ဂဏာန်း",
		icon: <MoneyRoundedIcon />,
		path: "/win_numbers",
		element: <WinNumber />,
		type: "drawer",
	},
	{
		name: "ပိတ်ရက်များ",
		icon: <EventBusyRoundedIcon />,
		path: "/close_days",
		element: <CloseDays />,
		type: "drawer",
	},
	{
		name: "Chats",
		icon: <ChatRoundedIcon />,
		path: "/chats",
		element: <Chats />,
		type: "drawer",
	},
];

export default UserRoutes;
