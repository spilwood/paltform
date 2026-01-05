"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { AlertCircle, ArrowLeft, CheckCircle2, Lock, Mail } from "lucide-react";

import { authClient } from "~/auth/client";
import {
  loginSchema,
  otpEmailSchema,
  otpVerifySchema,
  type LoginInput,
  type OtpEmailInput,
} from "~/lib/validations/auth";

import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Separator,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@spilwood/ui";

type OTPStep = "email" | "verify";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpStep, setOtpStep] = useState<OTPStep>("email");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const passwordForm = useForm<LoginInput>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const otpForm = useForm<OtpEmailInput>({
    resolver: standardSchemaResolver(otpEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handlePasswordLogin = async (data: LoginInput) => {
    setError("");

    const result = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });

    if (result.error) {
      setError(result.error.message ?? "Ошибка входа");
      return;
    }

    router.push("/account");
    router.refresh();
  };

  const handleSendOTP = async (data: OtpEmailInput) => {
    setError("");
    setSuccess("");

    const result = await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "sign-in",
    });

    if (result.error) {
      setError(result.error.message ?? "Ошибка отправки кода");
      return;
    }

    setOtpEmail(data.email);
    setSuccess(`Код отправлен на ${data.email}`);
    setOtpStep("verify");
  };

  const handleVerifyOTP = async (code: string) => {
    if (code.length !== 6) return;

    setError("");
    setSuccess("");
    setIsVerifying(true);

    const parseResult = otpVerifySchema.safeParse({
      email: otpEmail,
      otp: code,
    });
    if (!parseResult.success) {
      setError(parseResult.error.issues[0]?.message ?? "Неверный код");
      setOtpCode("");
      setIsVerifying(false);
      return;
    }

    const result = await authClient.emailOtp.verifyEmail({
      email: otpEmail,
      otp: code,
    });

    if (result.error) {
      setError(result.error.message ?? "Неверный код");
      setOtpCode("");
      setIsVerifying(false);
      return;
    }

    router.push("/account");
    router.refresh();
  };

  const handleBackToEmail = () => {
    setOtpStep("email");
    setOtpCode("");
    setError("");
    setSuccess("");
  };

  const handleResendOTP = async () => {
    if (!otpEmail) return;
    setError("");
    setSuccess("");

    const result = await authClient.emailOtp.sendVerificationOtp({
      email: otpEmail,
      type: "sign-in",
    });

    if (result.error) {
      setError(result.error.message ?? "Ошибка отправки кода");
      return;
    }

    setSuccess("Код отправлен повторно");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Вход</CardTitle>
        <CardDescription>Выберите удобный способ входа</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="password" className="gap-2">
              <Lock className="size-4" />
              Пароль
            </TabsTrigger>
            <TabsTrigger value="otp" className="gap-2">
              <Mail className="size-4" />
              Код на email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordLogin)}
                className="space-y-4"
              >
                {error && (
                  <Alert variant="destructive" role="alert" aria-live="polite">
                    <AlertCircle className="size-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={passwordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com…"
                          autoComplete="email"
                          spellCheck={false}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Пароль</FormLabel>
                        <Link
                          href="/auth/forgot-password"
                          className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                          Забыли пароль?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={passwordForm.formState.isSubmitting}
                >
                  {passwordForm.formState.isSubmitting ? (
                    <>
                      <Spinner className="mr-2" />
                      Вход…
                    </>
                  ) : (
                    "Войти"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="otp">
            {otpStep === "email" ? (
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(handleSendOTP)}
                  className="space-y-4"
                >
                  {error && (
                    <Alert
                      variant="destructive"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="size-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <FormField
                    control={otpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com…"
                            autoComplete="email"
                            spellCheck={false}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-muted-foreground text-xs">
                          Мы отправим одноразовый код для входа
                        </p>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={otpForm.formState.isSubmitting}
                  >
                    {otpForm.formState.isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Отправка…
                      </>
                    ) : (
                      "Получить код"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToEmail}
                  className="-ml-2 gap-2"
                >
                  <ArrowLeft className="size-4" />
                  Изменить email
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
                  <p className="text-sm font-medium" id="otp-label">
                    Введите 6-значный код
                  </p>
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
                      aria-labelledby="otp-label"
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
                  disabled={isVerifying}
                >
                  Отправить код повторно
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <p className="text-muted-foreground text-center text-sm">
          Нет аккаунта?{" "}
          <Link
            href="/auth/register"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
