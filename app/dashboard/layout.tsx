import * as React from "react";
import { Navbar } from "./_components/navbar";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<Navbar title="Dashboard" content="Dashboard page for Kre8tive" />
			{children}
		</div>
	);
};

export default ManageLayout;
