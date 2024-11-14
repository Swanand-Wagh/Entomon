import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Separator } from '@/common/components/ui/separator';
import { Button } from '@/common/components/ui/button';
import { Badge } from '@/common/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/components/ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/common/components/ui/command';

/**
 * Variants for the multi-select component to handle different styles.
 */
const multiSelectVariants = cva('m-1', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }> | null;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  enableSelectAll?: boolean; // Prop to enable/disable "Select All" option
  maxSelections?: number; // New prop to limit number of selections
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      enableSelectAll = true,
      maxSelections,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(''); // New state for input value
    const [internalOptions, setInternalOptions] = React.useState(options); // Track options, including newly added
    const [newlyAddedOptions, setNewlyAddedOptions] = React.useState<string[]>([]); // Track newly added options

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (!internalOptions.some((option) => option.label === inputValue) && inputValue) {
          // Add new option if it doesn't exist
          const newOption = { label: inputValue, value: inputValue };
          setInternalOptions((prevOptions) => [...prevOptions, newOption]); // Update options list
          setNewlyAddedOptions((prev) => [...prev, newOption.value]); // Track newly added option
          toggleOption(newOption.value); // Select the new option
          setInputValue(''); // Reset input
        }
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      let newSelectedValues;
      if (selectedValues.includes(option)) {
        newSelectedValues = selectedValues.filter((value) => value !== option);
        // If the option is deselected and it's a newly created one, remove it from internal options
        if (newlyAddedOptions.includes(option)) {
          setInternalOptions((prevOptions) => prevOptions.filter((opt) => opt.value !== option));
          setNewlyAddedOptions((prev) => prev.filter((value) => value !== option)); // Remove from newlyAddedOptions
        }
      } else {
        if (maxSelections && selectedValues.length >= maxSelections) return;
        newSelectedValues = [...selectedValues, option];
      }
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      setNewlyAddedOptions([]); // Remove all newly added options from state
      // Remove newly added options from the internal options list
      setInternalOptions((prevOptions) => prevOptions.filter((opt) => !newlyAddedOptions.includes(opt.value)));
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === internalOptions.length) {
        handleClear();
      } else {
        const allValues = internalOptions.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit',
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = internalOptions.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge key={value} className={multiSelectVariants({ variant })}>
                        {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                        {option?.label}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
                        multiSelectVariants({ variant })
                      )}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="mx-2 h-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator orientation="vertical" className="flex h-full min-h-6" />
                  <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-sm text-muted-foreground">{placeholder}</span>
                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
          <Command>
            <CommandInput
              value={inputValue}
              placeholder="Search or create..."
              onValueChange={setInputValue}
              onKeyDown={handleInputKeyDown}
            />
            {/* Conditional message: "Press Enter to create" */}
            {inputValue && !internalOptions.some((option) => option.label === inputValue) && (
              <div className="py-2 mx-auto text-sm text-muted-foreground">Press enter to create</div>
            )}
            <CommandList>
              {internalOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
                .length === 0 && (
                <CommandItem
                  onSelect={() => {
                    const newOption = { label: inputValue, value: inputValue };
                    setInternalOptions((prevOptions) => [...prevOptions, newOption]);
                    setNewlyAddedOptions((prev) => [...prev, newOption.value]);
                    toggleOption(newOption.value);
                    setInputValue('');
                  }}
                  className="cursor-pointer text-green-500"
                >
                  Create &quot;{inputValue}&quot;
                </CommandItem>
              )}
              <CommandGroup>
                {enableSelectAll && selectedValues.length < (maxSelections || Infinity) && (
                  <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedValues.length === internalOptions.length
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>(Select All)</span>
                  </CommandItem>
                )}
                {internalOptions
                  .filter((option) => !selectedValues.includes(option.value)) // Hide selected options
                  .map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
