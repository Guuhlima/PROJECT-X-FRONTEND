import { Suspense } from "react";
import ConfirmUserClient from "./components/ConfirmUserClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Confirmando sua conta...</div>}>
      <ConfirmUserClient />
    </Suspense>
  );
}
