"use client";

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  minPrice: number;
  maxPrice: number;
  onFiltersChange?: (filters: any) => void;
}

export function FilterSidebar({ filters, minPrice, maxPrice, onFiltersChange }: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(filters.map(f => f.id));

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentGroup = prev[groupId] || [];

      if (checked) {
        return {
          ...prev,
          [groupId]: [...currentGroup, optionId]
        };
      } else {
        return {
          ...prev,
          [groupId]: currentGroup.filter(id => id !== optionId)
        };
      }
    });

    if (onFiltersChange) {
      onFiltersChange({
        priceRange,
        selectedFilters: {
          ...selectedFilters,
          [groupId]: checked
            ? [...(selectedFilters[groupId] || []), optionId]
            : (selectedFilters[groupId] || []).filter(id => id !== optionId)
        }
      });
    }
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);

    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [values[0], values[1]],
        selectedFilters
      });
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange([minPrice, maxPrice]);

    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [minPrice, maxPrice],
        selectedFilters: {}
      });
    }
  };

  // Count total number of active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(selectedFilters).forEach(group => {
      count += group.length;
    });

    // Add price filter if changed from default
    if (priceRange[0] > minPrice || priceRange[1] < maxPrice) {
      count += 1;
    }

    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Фильтры</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold rounded-full px-2 py-0.5">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            className="text-xs text-green-600 hover:text-green-800 hover:bg-green-50 p-0 h-auto"
            onClick={clearAllFilters}
          >
            Сбросить все
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="p-4 border-b border-gray-200">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => toggleGroup('price')}
        >
          <h4 className="font-medium">Цена, ₽</h4>
          <ChevronDown className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            expandedGroups.includes('price') && "transform rotate-180"
          )} />
        </div>

        {expandedGroups.includes('price') && (
          <div className="mt-4 px-1">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={1}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {priceRange[0]} ₽
              </div>
              <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {priceRange[1]} ₽
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.id} className="p-4 border-b border-gray-200 last:border-b-0">
          <div
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleGroup(group.id)}
          >
            <h4 className="font-medium">{group.name}</h4>
            <ChevronDown className={cn(
              "h-4 w-4 text-gray-400 transition-transform",
              expandedGroups.includes(group.id) && "transform rotate-180"
            )} />
          </div>

          {expandedGroups.includes(group.id) && (
            <div className="space-y-2">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedFilters[group.id]?.includes(option.id) || false}
                    onCheckedChange={(checked) =>
                      handleFilterChange(group.id, option.id, checked === true)
                    }
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {option.name}
                  </label>
                  <span className="text-xs text-gray-400">({option.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Apply Button - Visible on Mobile */}
      <div className="md:hidden p-4 bg-white shadow-md border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            if (onFiltersChange) {
              onFiltersChange({
                priceRange,
                selectedFilters
              });
            }
          }}
        >
          Показать результаты
        </Button>
      </div>
    </div>
  );
}
