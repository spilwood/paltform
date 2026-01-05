"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
  showWoodType?: boolean
}

export interface FilterState {
  woodType: string[]
  diameter: [number, number]
  priceRange: [number, number]
  inStockOnly: boolean
}

const woodTypes = [
  { value: "bereza", label: "Берёза" },
  { value: "sosna", label: "Сосна" },
]

export function ProductFilters({ onFilterChange, showWoodType = true }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    woodType: [],
    diameter: [10, 50],
    priceRange: [0, 1000],
    inStockOnly: false,
  })

  const handleWoodTypeChange = (value: string[]) => {
    const newFilters = { ...filters, woodType: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleDiameterChange = (value: number[]) => {
    const newFilters = { ...filters, diameter: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleStock = (checked: boolean) => {
    const newFilters = { ...filters, inStockOnly: checked }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters: FilterState = {
      woodType: [],
      diameter: [10, 50],
      priceRange: [0, 1000],
      inStockOnly: false,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters =
    filters.woodType.length > 0 ||
    filters.diameter[0] > 10 ||
    filters.diameter[1] < 50 ||
    filters.inStockOnly ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000

  return (
    <div className="space-y-6">
      {showWoodType && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Порода</Label>
            <ToggleGroup
              type="multiple"
              value={filters.woodType}
              onValueChange={handleWoodTypeChange}
              className="flex flex-wrap justify-start gap-2"
            >
              {woodTypes.map((type) => (
                <ToggleGroupItem
                  key={type.value}
                  value={type.value}
                  variant="outline"
                  className="px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {type.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <Separator />
        </>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Диаметр</Label>
          <Badge variant="secondary" className="font-mono text-xs">
            {filters.diameter[0]} — {filters.diameter[1]} см
          </Badge>
        </div>
        <Slider
          value={filters.diameter}
          onValueChange={handleDiameterChange}
          min={10}
          max={50}
          step={5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>10 см</span>
          <span>50 см</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Цена</Label>
          <Badge variant="secondary" className="font-mono text-xs">
            {filters.priceRange[0]} — {filters.priceRange[1]} ₽
          </Badge>
        </div>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={1000}
          step={50}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 ₽</span>
          <span>1000 ₽</span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Label htmlFor="stock-switch" className="text-sm font-medium">
          Только в наличии
        </Label>
        <Switch id="stock-switch" checked={filters.inStockOnly} onCheckedChange={toggleStock} />
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
            <X className="mr-2 h-4 w-4" />
            Сбросить фильтры
          </Button>
        </>
      )}
    </div>
  )
}
