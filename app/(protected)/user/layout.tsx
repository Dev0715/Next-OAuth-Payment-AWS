import { Navbar } from "./_components/navbar";
import { Sdiebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="w-full h-full p-6 flex flex-col bg-gray-50">
      <Navbar />
      <div className="w-full h-full flex">
        <Sdiebar />
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
