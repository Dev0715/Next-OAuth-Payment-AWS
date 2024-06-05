"use client";

import { createStore, Provider } from "jotai";
import { useState } from "react";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => createStore());
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
