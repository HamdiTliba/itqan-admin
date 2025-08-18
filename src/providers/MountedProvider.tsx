"use client";

import { useEffect, useState } from "react";

const MountedProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <>{children}</>;
};

export default MountedProvider;
