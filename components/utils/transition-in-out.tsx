import { Transition } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  condition: boolean;
};

export const TransitionInOut = ({ children, condition }: Props) => {
  return (
    <Transition
      show={condition}
      enter="transition ease-in-out duration-500 delay-200 order-first"
      enterFrom="opacity-0 scale-105"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in-out duration-300 absolute"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};
