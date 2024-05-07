"use client";

import { useState } from "react";
import { SwitchBox } from "@/components/utils/switch-box";

const AffiliateSettings = () => {
  // const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  const [isChecked] = useState<boolean>(false);
  // const [isPending, startTransition] = useTransition();

  // const form = useForm<z.infer<typeof ProfileSchema>>({
  //   resolver: zodResolver(ProfileSchema),
  //   defaultValues: {
  //     username: "",
  //     bio: ""
  //   }
  // });

  // const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     // save the user's profile
  //   });
  // };

  return (
    <main className="w-full pl-8 flex flex-col gap-y-5">
      {/* <Header title="Creator" content="Select how this site you want to serve you" /> */}
      {/* <Separator /> */}
      <SwitchBox
        title="Start an Affiliate's life"
        content="You can join as an affiliate and get an extra benefits"
        isChecked={isChecked}
      />
    </main>
  );
};

export default AffiliateSettings;
