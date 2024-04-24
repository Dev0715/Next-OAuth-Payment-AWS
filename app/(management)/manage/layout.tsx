import * as React from "react";
import { Navbar } from "./_components/navbar";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<Navbar title="Super Admin" content="You can manage all the stuff" />
			{children}
		</div>
	);
};

export default ManageLayout;
