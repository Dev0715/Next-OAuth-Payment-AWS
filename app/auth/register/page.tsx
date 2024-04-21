import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";

const RegisterPage = () => {
  return (
    <div className="w-[640px] flex flex-col gap-y-12">
      <p className="text-4xl font-semibold">Let's get you started</p>
      <GeneralDetailsForm />
    </div>
  );
};

export default RegisterPage;
