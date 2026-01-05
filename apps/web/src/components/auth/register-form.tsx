"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { AlertCircle } from "lucide-react";

import { authClient } from "~/auth/client";
import { registerSchema, type RegisterInput } from "~/lib/validations/auth";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
} from "@spilwood/ui";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<RegisterInput>({
    resolver: standardSchemaResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: RegisterInput) => {
    setError("");

    const result = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      setError(result.error.message ?? "Ошибка регистрации");
      return;
    }

    router.push("/account");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Создайте аккаунт</CardTitle>
        <CardDescription>Введите данные для создания аккаунта</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {error && (
              <Alert variant="destructive" role="alert" aria-live="polite">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя и фамилия</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Иван Иванов…"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Минимум 8 символов</FormDescription>
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
                  Создание…
                </>
              ) : (
                "Создать аккаунт"
              )}
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Уже есть аккаунт?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-medium hover:underline"
              >
                Войти
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
      <p className="text-muted-foreground px-6 pb-6 text-center text-sm">
        Нажимая продолжить, вы соглашаетесь с{" "}
        <Link
          href="/oferta"
          className="text-primary font-medium hover:underline"
        >
          условиями оферты
        </Link>{" "}
        и{" "}
        <Link
          href="/politika"
          className="text-primary font-medium hover:underline"
        >
          политикой конфиденциальности
        </Link>
        .
      </p>
    </Card>
  );
}
