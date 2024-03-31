import { Navbar } from "./_components/navbar";
import { Sdiebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <div className="w-full h-full">
        <Sdiebar />
        {children}
      </div>

    </div>
  );
};

export default ProtectedLayout;
