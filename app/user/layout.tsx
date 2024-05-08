import { Navbar } from "./_components/navbar";
import { Sdiebar } from "./_components/sidebar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="w-full p-6 flex flex-col">
      <Navbar />
      <div className="w-full flex">
        <Sdiebar />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
