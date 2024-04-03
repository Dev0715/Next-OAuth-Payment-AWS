import * as React from "react";
import { Navbar } from "./_components/navbar";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<Navbar title="Products" content="You can select buy your favorite" />
			{children}
		</div>
	);
};

export default ProductsLayout;
