"use client";

import { useRouter } from "next/navigation";

import { register } from "@/actions/auth/register/register";
import { GeneralDetailsForm } from "@/components/auth/register/general-details-form";
import { TransitionInOut } from "@/components/utils/transition-in-out";
import { useToast } from "@/components/ui/use-toast";
import { getUserFromGeneralDetails } from "@/shared/functions/user-from-signup";
import { SignedUpData } from "@/shared/types/signup-data.type";

const RegisterPage = () => {
  const history = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (details: SignedUpData["generalDetails"]) => {
    const user = await getUserFromGeneralDetails(details);

    const response = await register(user);
    if (response.success) {
      toast({
        title: "Congratulations!",
        description: "You have completed sign up"
      });
      history.push("/auth/login");
    } else {
      toast({ title: "Error while sign up..", variant: "destructive" });
    }
  };

  return (
    <div className="w-[640px]">
      <TransitionInOut condition>
        <GeneralDetailsForm onSubmit={handleSubmit} />
      </TransitionInOut>
    </div>
  );
};

export default RegisterPage;
