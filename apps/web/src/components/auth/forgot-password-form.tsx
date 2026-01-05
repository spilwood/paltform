"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

import { authClient } from "~/auth/client";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "~/lib/validations/auth";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components/ui/spinner";

export function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordInput) => {
    setError("");
    setSuccess(false);

    const result = await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "forget-password",
    });

    if (result.error) {
      setError(result.error.message ?? "Ошибка отправки");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary size-6" />
          </div>
          <CardTitle className="text-xl">Проверьте почту</CardTitle>
          <CardDescription>
            Мы отправили инструкции по восстановлению пароля на{" "}
            <span className="font-medium">{form.getValues("email")}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center text-sm">
            Не получили письмо? Проверьте папку «Спам» или{" "}
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="text-primary font-medium hover:underline"
            >
              попробуйте снова
            </button>
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 size-4" />
              Вернуться к входу
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Восстановление пароля</CardTitle>
        <CardDescription>
          Введите email, и мы отправим код для сброса пароля
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {error && (
              <Alert variant="destructive" role="alert" aria-live="polite">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
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

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  Отправка…
                </>
              ) : (
                "Отправить код"
              )}
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 size-4" />
                Вернуться к входу
              </Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
