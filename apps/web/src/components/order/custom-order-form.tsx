"use client";

import { useState } from "react";
import { Button } from "@spilwood/ui";
import { Input } from "@spilwood/ui";
import { Label } from "@spilwood/ui";
import { Textarea } from "@spilwood/ui";
import { Card, CardContent, CardDescription, CardTitle } from "@spilwood/ui";
import { RadioGroup, RadioGroupItem } from "@spilwood/ui";
import { Slider } from "@spilwood/ui";
import { Separator } from "@spilwood/ui";
import { Badge } from "@spilwood/ui";
import { Alert, AlertDescription } from "@spilwood/ui";
import { Spinner } from "@spilwood/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@spilwood/ui";
import {
  Check,
  TreePine,
  TreeDeciduous,
  Ruler,
  CircleDot,
  Layers,
  Send,
  Leaf,
} from "lucide-react";

type WoodType = "pine" | "birch";
type ProductType = "slice" | "stump";
type ProcessingType = "raw" | "sanded" | "oiled";

interface FormData {
  woodType: WoodType;
  productType: ProductType;
  diameter: number[];
  thickness: number[];
  quantity: number;
  processing: ProcessingType;
  barkPreserved: boolean;
  name: string;
  phone: string;
  email: string;
  comment: string;
}

const initialFormData: FormData = {
  woodType: "birch",
  productType: "slice",
  diameter: [15],
  thickness: [3],
  quantity: 10,
  processing: "raw",
  barkPreserved: true,
  name: "",
  phone: "",
  email: "",
  comment: "",
};

export function CustomOrderForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) newErrors.phone = "Введите номер телефона";
    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Неверный формат email";
    }
    setErrors(newErrors);

    // Focus first error field
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getEstimatedPrice = () => {
    let basePrice = formData.woodType === "birch" ? 80 : 60;
    if (formData.productType === "stump") basePrice *= 2.5;
    if (formData.processing === "sanded") basePrice *= 1.3;
    if (formData.processing === "oiled") basePrice *= 1.6;

    const diameterFactor = formData.diameter[0] / 10;
    const thicknessFactor =
      formData.productType === "slice"
        ? formData.thickness[0] / 2
        : formData.thickness[0] / 10;

    const pricePerUnit = Math.round(
      basePrice * diameterFactor * thicknessFactor
    );
    return {
      perUnit: pricePerUnit,
      total: pricePerUnit * formData.quantity,
    };
  };

  const price = getEstimatedPrice();

  if (isSubmitted) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold">Заявка отправлена</h3>
          <p className="mt-3 max-w-md text-muted-foreground">
            Спасибо за интерес к нашей продукции! Мы свяжемся с вами в течение
            24 часов для уточнения деталей заказа.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData(initialFormData);
                setStep(1);
              }}
            >
              Новая заявка
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://t.me/spilwood_bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="mr-2 h-4 w-4" />
                Написать в Telegram
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      {/* Progress indicator */}
      <div className="flex border-b border-border">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => s < step && setStep(s as 1 | 2 | 3)}
            disabled={s > step}
            className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              s === step
                ? "bg-primary text-primary-foreground"
                : s < step
                  ? "bg-muted text-foreground hover:bg-muted/80"
                  : "bg-background text-muted-foreground"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                s < step
                  ? "bg-primary-foreground text-primary"
                  : s === step
                    ? "bg-primary-foreground/20"
                    : "bg-muted"
              }`}
            >
              {s < step ? <Check className="h-3 w-3" /> : s}
            </span>
            <span className="hidden sm:inline">
              {s === 1 ? "Параметры" : s === 2 ? "Контакты" : "Проверка"}
            </span>
          </button>
        ))}
      </div>

      <CardContent className="p-6 md:p-8">
        {/* Step 1: Product Parameters */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <CardTitle className="text-xl">
                Выберите параметры изделия
              </CardTitle>
              <CardDescription className="mt-1">
                Укажите характеристики для индивидуального распила
              </CardDescription>
            </div>

            {/* Wood Type */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Порода дерева</Label>
              <RadioGroup
                value={formData.woodType}
                onValueChange={(value: WoodType) =>
                  setFormData((prev) => ({ ...prev, woodType: value }))
                }
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="birch"
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50 ${
                    formData.woodType === "birch"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <TreeDeciduous
                    className={`h-10 w-10 ${formData.woodType === "birch" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="text-center">
                    <span className="font-medium">Берёза</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Светлая, выразительный рисунок
                    </p>
                  </div>
                  <RadioGroupItem
                    value="birch"
                    id="birch"
                    className="sr-only"
                  />
                </Label>
                <Label
                  htmlFor="pine"
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50 ${
                    formData.woodType === "pine"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <TreePine
                    className={`h-10 w-10 ${formData.woodType === "pine" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="text-center">
                    <span className="font-medium">Сосна</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Тёплый оттенок, смолистая
                    </p>
                  </div>
                  <RadioGroupItem value="pine" id="pine" className="sr-only" />
                </Label>
              </RadioGroup>
            </div>

            {/* Product Type */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Тип изделия</Label>
              <RadioGroup
                value={formData.productType}
                onValueChange={(value: ProductType) =>
                  setFormData((prev) => ({ ...prev, productType: value }))
                }
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="slice"
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50 ${
                    formData.productType === "slice"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <CircleDot
                    className={`h-10 w-10 ${formData.productType === "slice" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="text-center">
                    <span className="font-medium">Спил</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Плоский срез 1-5 см
                    </p>
                  </div>
                  <RadioGroupItem
                    value="slice"
                    id="slice"
                    className="sr-only"
                  />
                </Label>
                <Label
                  htmlFor="stump"
                  className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:border-primary/50 ${
                    formData.productType === "stump"
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <Layers
                    className={`h-10 w-10 ${formData.productType === "stump" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div className="text-center">
                    <span className="font-medium">Пенёк</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Высокий цилиндр 10-40 см
                    </p>
                  </div>
                  <RadioGroupItem
                    value="stump"
                    id="stump"
                    className="sr-only"
                  />
                </Label>
              </RadioGroup>
            </div>

            {/* Dimensions */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Диаметр</Label>
                  <Badge variant="secondary" className="font-mono">
                    {formData.diameter[0]} см
                  </Badge>
                </div>
                <Slider
                  value={formData.diameter}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, diameter: value }))
                  }
                  min={5}
                  max={40}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 см</span>
                  <span>40 см</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    {formData.productType === "slice" ? "Толщина" : "Высота"}
                  </Label>
                  <Badge variant="secondary" className="font-mono">
                    {formData.thickness[0]} см
                  </Badge>
                </div>
                <Slider
                  value={formData.thickness}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, thickness: value }))
                  }
                  min={formData.productType === "slice" ? 1 : 10}
                  max={formData.productType === "slice" ? 5 : 40}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {formData.productType === "slice" ? "1 см" : "10 см"}
                  </span>
                  <span>
                    {formData.productType === "slice" ? "5 см" : "40 см"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <Label htmlFor="quantity" className="text-base font-medium">
                Количество
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={1000}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Number.parseInt(e.target.value, 10) || 1,
                    }))
                  }
                  className="w-24 text-center font-mono"
                />
                <span className="text-sm text-muted-foreground">штук</span>
              </div>
            </div>

            {/* Processing */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Обработка</Label>
              <Select
                value={formData.processing}
                onValueChange={(value: ProcessingType) =>
                  setFormData((prev) => ({ ...prev, processing: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите обработку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="raw">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Без обработки (натуральный)
                    </div>
                  </SelectItem>
                  <SelectItem value="sanded">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Шлифовка (+30%)
                    </div>
                  </SelectItem>
                  <SelectItem value="oiled">
                    <div className="flex items-center gap-2">
                      <CircleDot className="h-4 w-4" />
                      Шлифовка + масло (+60%)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bark */}
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label className="text-base font-medium">Сохранить кору</Label>
                <p className="text-sm text-muted-foreground">
                  Натуральный край с корой
                </p>
              </div>
              <Button
                variant={formData.barkPreserved ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    barkPreserved: !prev.barkPreserved,
                  }))
                }
              >
                {formData.barkPreserved ? "Да" : "Нет"}
              </Button>
            </div>

            <Separator />

            {/* Price Estimate */}
            <div className="rounded-xl bg-muted/50 p-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Ориентировочная цена за шт.
                </span>
                <span className="font-mono text-lg">{price.perUnit} ₽</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium">
                  Итого за {formData.quantity} шт.
                </span>
                <span className="font-mono text-2xl font-semibold">
                  {price.total.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                * Окончательная цена будет рассчитана после обсуждения деталей
                заказа
              </p>
            </div>

            <Button size="lg" className="w-full" onClick={() => setStep(2)}>
              Продолжить
            </Button>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <CardTitle className="text-xl">Контактные данные</CardTitle>
              <CardDescription className="mt-1">
                Заполните данные для связи с вами
              </CardDescription>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Иван Иванов…"
                  className={errors.name ? "border-destructive" : ""}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone)
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="+7 (999) 123-45-67…"
                  className={errors.phone ? "border-destructive" : ""}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="email@example.com…"
                  className={errors.email ? "border-destructive" : ""}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-destructive"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Дополнительные пожелания</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  placeholder="Особые требования к форме, сроки, условия доставки…"
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>

            <Alert>
              <Leaf className="h-4 w-4" />
              <AlertDescription>
                Мы свяжемся с вами в течение 24 часов для обсуждения деталей
                заказа и финальной стоимости.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Назад
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
              >
                Проверить заказ
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <CardTitle className="text-xl">Проверка заявки</CardTitle>
              <CardDescription className="mt-1">
                Убедитесь, что все данные указаны верно
              </CardDescription>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-6">
                <h4 className="font-medium text-muted-foreground">
                  Параметры изделия
                </h4>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Порода</dt>
                    <dd className="font-medium">
                      {formData.woodType === "birch" ? "Берёза" : "Сосна"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Тип</dt>
                    <dd className="font-medium">
                      {formData.productType === "slice" ? "Спил" : "Пенёк"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Диаметр</dt>
                    <dd className="font-medium">{formData.diameter[0]} см</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">
                      {formData.productType === "slice" ? "Толщина" : "Высота"}
                    </dt>
                    <dd className="font-medium">{formData.thickness[0]} см</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Количество</dt>
                    <dd className="font-medium">{formData.quantity} шт.</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Обработка</dt>
                    <dd className="font-medium">
                      {formData.processing === "raw"
                        ? "Без обработки"
                        : formData.processing === "sanded"
                          ? "Шлифовка"
                          : "Шлифовка + масло"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Кора</dt>
                    <dd className="font-medium">
                      {formData.barkPreserved ? "Сохранить" : "Удалить"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-border p-6">
                <h4 className="font-medium text-muted-foreground">
                  Контактные данные
                </h4>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Имя</dt>
                    <dd className="font-medium">{formData.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Телефон</dt>
                    <dd className="font-medium">{formData.phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">{formData.email}</dd>
                  </div>
                  {formData.comment && (
                    <div className="flex flex-col gap-1">
                      <dt className="text-muted-foreground">Комментарий</dt>
                      <dd className="text-muted-foreground">
                        {formData.comment}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="rounded-xl bg-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Ориентировочная стоимость</span>
                  <span className="font-mono text-2xl font-semibold">
                    {price.total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Назад
              </Button>
              <Button
                className="flex-1"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>Отправка заявки…</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
