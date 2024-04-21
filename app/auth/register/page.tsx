import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";

const RegisterPage = () => {
  return (
    <div className="full flex flex-col gap-y-4">
      <p className="text-xl font-semibold">Let's get you started</p>
      <GeneralDetailsForm />
    </div>
  );
};

export default RegisterPage;
