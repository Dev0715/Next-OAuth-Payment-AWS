import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { Navbar } from "../_components/navbar";
import { ProductItem } from "./_components/productitem";

export default function Products() {
	const products = [
		{
			imgPath: '/images/1.jpg',
			title: 'Product 1',
			description: 'Product Description 1',
			price: 100
		},
		{
			imgPath: '/images/2.jpg',
			title: 'Product 2',
			description: 'Product Description 2',
			price: 100
		},
		{
			imgPath: '/images/3.jpg',
			title: 'Product 3',
			description: 'Product Description 3',
			price: 100
		}
	]

	return (
		<main className="w-full flex pt-6 gap-4">
			{products.map((product, index) => (
				<ProductItem
					key={index}
					imgPath={product.imgPath}
					title={product.title}
					description={product.description}
					price={product.price} />
			))}
		</main>
	);
}
