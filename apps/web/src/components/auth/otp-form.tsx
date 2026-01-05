"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

import { authClient } from "~/auth/client";
import { otpVerifySchema } from "~/lib/validations/auth";

import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { Spinner } from "~/components/ui/spinner";

export function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const type =
    (searchParams.get("type") as "sign-in" | "forget-password") ?? "sign-in";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerifyOTP = async (code: string) => {
    if (code.length !== 6) return;

    setError("");
    setSuccess("");
    setIsVerifying(true);

    const parseResult = otpVerifySchema.safeParse({ email, otp: code });
    if (!parseResult.success) {
      setError(parseResult.error.issues[0]?.message ?? "Неверный код");
      setOtpCode("");
      setIsVerifying(false);
      return;
    }

    const result = await authClient.emailOtp.verifyEmail({
      email,
      otp: code,
    });

    if (result.error) {
      setError(result.error.message ?? "Неверный код");
      setOtpCode("");
      setIsVerifying(false);
      return;
    }

    if (type === "forget-password") {
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    setError("");
    setSuccess("");
    setIsResending(true);

    const result = await authClient.emailOtp.sendVerificationOtp({
      email,
      type,
    });

    setIsResending(false);

    if (result.error) {
      setError(result.error.message ?? "Ошибка отправки кода");
      return;
    }

    setSuccess("Код отправлен повторно");
  };

  if (!email) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Ошибка</CardTitle>
          <CardDescription>Email не указан</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/auth/login">Вернуться к входу</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Введите код</CardTitle>
        <CardDescription>
          Мы отправили 6-значный код на{" "}
          <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link href="/auth/login" className="gap-2">
            <ArrowLeft className="size-4" />
            Изменить email
          </Link>
        </Button>

        {error && (
          <Alert variant="destructive" role="alert" aria-live="polite">
            <AlertCircle className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert
            className="border-primary/20 bg-primary/5"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="text-primary size-4" />
            <AlertDescription className="text-foreground">
              {success}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpCode}
              onChange={(value) => {
                setOtpCode(value);
                if (value.length === 6) {
                  handleVerifyOTP(value);
                }
              }}
              disabled={isVerifying}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-muted-foreground text-center text-xs">
            Код действителен 5 минут
          </p>
        </div>

        {isVerifying && (
          <div className="flex justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        <Button
          variant="link"
          className="text-muted-foreground w-full"
          onClick={handleResendOTP}
          disabled={isVerifying || isResending}
        >
          {isResending ? (
            <>
              <Spinner className="mr-2 size-4" />
              Отправка…
            </>
          ) : (
            "Отправить код повторно"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
