import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { OTPForm } from "~/components/auth";
import { Spinner } from "@spilwood/ui";

export const metadata = {
  title: "Подтверждение",
  description: "Введите код подтверждения",
};

export default function OTPPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" aria-hidden="true" />
          </div>
          Spilwood
        </a>
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <Spinner className="size-6" />
            </div>
          }
        >
          <OTPForm />
        </Suspense>
      </div>
    </div>
  );
}
