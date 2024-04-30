"use client";

import { Navbar } from "./_components/navbar";

export default function Products() {
  return (
    <main className="w-full p-6 flex flex-col">
      <Navbar title="Products" content="You can see all products here" />
      <div className="w-full flex flex-wrap py-6">
        This app will be launched at 15th May!
      </div>
    </main>
  );
}
