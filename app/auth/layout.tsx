import * as React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center pt-16 py-6">
      {children}
    </div>
  );
};

export default AuthLayout;
