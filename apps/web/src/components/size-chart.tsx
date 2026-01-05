"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@spilwood/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@spilwood/ui";
import { Badge } from "@spilwood/ui";
import { cn } from "@/lib/utils";

interface SizeData {
  diameter: number;
  label: string;
  usage: string[];
  comparison: string;
}

const sliceSizes: SizeData[] = [
  {
    diameter: 10,
    label: "10 см",
    usage: ["Подставки под кружки", "Маленький декор"],
    comparison: "Как CD-диск",
  },
  {
    diameter: 15,
    label: "15 см",
    usage: ["Подставки", "Основа для росписи", "Свадебный декор"],
    comparison: "Как блюдце",
  },
  {
    diameter: 20,
    label: "20 см",
    usage: ["Часы", "Сервировочные доски", "Фотофон"],
    comparison: "Как тарелка",
  },
  {
    diameter: 25,
    label: "25 см",
    usage: ["Большие часы", "Декоративные панно", "Поднос"],
    comparison: "Как пицца",
  },
  {
    diameter: 30,
    label: "30 см",
    usage: ["Столешница", "Художественное панно", "Большие часы"],
    comparison: "Как сковорода",
  },
  {
    diameter: 40,
    label: "40 см",
    usage: ["Журнальный столик", "Арт-объект", "Крупный декор"],
    comparison: "Как барабан",
  },
];

const stumpSizes: SizeData[] = [
  {
    diameter: 15,
    label: "15 см высота",
    usage: ["Подставка для свечей", "Малый декор"],
    comparison: "Как книга",
  },
  {
    diameter: 25,
    label: "25 см высота",
    usage: ["Подставка для цветов", "Фотозона", "Табурет"],
    comparison: "Как стопка книг",
  },
  {
    diameter: 30,
    label: "30 см высота",
    usage: ["Прикроватный столик", "Сиденье", "Декор"],
    comparison: "Как пуфик",
  },
];

export function SizeChart() {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const maxDiameter = 40;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Размерная сетка</CardTitle>
        <CardDescription className="text-sm">
          Визуальное сравнение размеров спилов и пеньков
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Tabs defaultValue="slices">
          <TabsList className="mb-4 sm:mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="slices" className="text-xs sm:text-sm">
              Спилы
            </TabsTrigger>
            <TabsTrigger value="stumps" className="text-xs sm:text-sm">
              Пеньки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slices">
            <div className="space-y-6 sm:space-y-8">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-end justify-start sm:justify-center gap-3 sm:gap-4 py-6 sm:py-8 min-w-max">
                  {sliceSizes.map((size) => (
                    <button
                      key={size.diameter}
                      type="button"
                      onClick={() =>
                        setSelectedSize(
                          selectedSize === size.diameter ? null : size.diameter
                        )
                      }
                      className={cn(
                        "flex flex-col items-center gap-2 transition-transform hover:scale-105 flex-shrink-0",
                        selectedSize === size.diameter && "scale-110"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-full border-2 border-primary/20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 transition-all",
                          selectedSize === size.diameter &&
                            "border-primary ring-2 ring-primary/20"
                        )}
                        style={{
                          width: `${(size.diameter / maxDiameter) * 80}px`,
                          height: `${(size.diameter / maxDiameter) * 80}px`,
                          minWidth: "20px",
                          minHeight: "20px",
                        }}
                      />
                      <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
                        {size.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedSize && (
                <div className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
                  {sliceSizes
                    .filter((s) => s.diameter === selectedSize)
                    .map((size) => (
                      <div key={size.diameter}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl font-semibold">
                            {size.label}
                          </span>
                          <Badge variant="secondary" className="text-xs w-fit">
                            {size.comparison}
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                          {size.usage.map((use) => (
                            <Badge
                              key={use}
                              variant="outline"
                              className="text-[10px] sm:text-xs"
                            >
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {!selectedSize && (
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Нажмите на размер для подробностей
                </p>
              )}

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full text-xs sm:text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 sm:pb-3 px-2 sm:px-0 text-left font-medium">
                        Размер
                      </th>
                      <th className="pb-2 sm:pb-3 px-2 sm:px-0 text-left font-medium">
                        Сравнение
                      </th>
                      <th className="pb-2 sm:pb-3 px-2 sm:px-0 text-left font-medium">
                        Применение
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliceSizes.map((size) => (
                      <tr
                        key={size.diameter}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-0 font-medium">
                          {size.label}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-0 text-muted-foreground">
                          {size.comparison}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-0 text-muted-foreground">
                          {size.usage.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stumps">
            <div className="space-y-6 sm:space-y-8">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-end justify-start sm:justify-center gap-4 sm:gap-8 py-6 sm:py-8 min-w-max">
                  {stumpSizes.map((size) => (
                    <button
                      key={size.diameter}
                      type="button"
                      onClick={() =>
                        setSelectedSize(
                          selectedSize === size.diameter ? null : size.diameter
                        )
                      }
                      className={cn(
                        "flex flex-col items-center gap-2 transition-transform hover:scale-105 flex-shrink-0",
                        selectedSize === size.diameter && "scale-110"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 sm:w-16 rounded-t-lg border-2 border-primary/20 bg-gradient-to-b from-amber-100 to-amber-300 dark:from-amber-900/40 dark:to-amber-700/40 transition-all",
                          selectedSize === size.diameter &&
                            "border-primary ring-2 ring-primary/20"
                        )}
                        style={{
                          height: `${(size.diameter / 30) * 60}px`,
                          minHeight: "30px",
                        }}
                      />
                      <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
                        {size.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedSize && (
                <div className="rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
                  {stumpSizes
                    .filter((s) => s.diameter === selectedSize)
                    .map((size) => (
                      <div key={size.diameter}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-xl sm:text-2xl font-semibold">
                            {size.label}
                          </span>
                          <Badge variant="secondary" className="text-xs w-fit">
                            {size.comparison}
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                          {size.usage.map((use) => (
                            <Badge
                              key={use}
                              variant="outline"
                              className="text-[10px] sm:text-xs"
                            >
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {!selectedSize && (
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  Нажмите на размер для подробностей
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
