import * as React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-5/6">
      {children}
    </div>
  );
};

export default CartLayout;
