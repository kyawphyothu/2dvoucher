import DataTable, { createTheme } from "react-data-table-component";

// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

createTheme(
	"solarized",
	{
		text: {
			// primary: "#268bd2",
			primary: "#ffffff",
			secondary: "#2aa198",
		},
		background: {
			// default: "#002b36",
			// default: "transparent",
			default: "rgba(0, 0, 0, 0.1)",
		},
		context: {
			background: "#cb4b16",
			text: "#FFFFFF",
		},
		divider: {
			// default: "#073642",
			default: "#000000",
		},
		action: {
			button: "rgba(0,0,0,.54)",
			hover: "rgba(0,0,0,.01)",
			disabled: "rgba(0,0,0,.12)",
		},
	},
	"dark"
);

export default function CusDataTable(props) {
	const { columns, data, expandableRows } = props;

	return (
		<DataTable
			columns={columns}
			data={data}
			expandableRows={expandableRows}
			expandableRowsComponent={ExpandedComponent}
			responsive
			// striped
			highlightOnHover
			theme="solarized"
		/>
	);
}
