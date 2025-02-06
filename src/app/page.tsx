
import { Suspense } from "react";
import React, { lazy } from 'react';
const Sofas= lazy(() => import("@/components/sofa"));
  const Hero= lazy(() => import("@/components/hero"));

export default function Home() {

  
  return (
    <div>
      <Suspense
        fallback={<div>Loading...</div>}
      >
        <Hero />
      </Suspense>

      <Suspense
        fallback={<div>Loading...</div>}
      >
        <Sofas />
      </Suspense>
    </div>
  );
}
