import { MultiSelect } from '@mantine/core';

type CustomMultiSelectProps = {
  field: any;
  data: { name: string }[];
};

export const CustomMultiSelect = ({ field, data }: CustomMultiSelectProps) => {
  return (
    <MultiSelect
      {...field}
      searchable
      maxValues={3}
      hidePickedOptions
      maxDropdownHeight={100}
      checkIconPosition="right"
      placeholder="Select a category"
      nothingFoundMessage="Nothing found..."
      comboboxProps={{ withinPortal: false, shadow: 'md' }}
      data={data.map((category) => ({ value: category.name, label: category.name }))}
      classNames={{
        wrapper: 'border-gray-900',
        input: 'text-xl text-gray-900 rounded-md focus:outline-none placeholder:text-gray-400',
        dropdown: '',
        option: '',
        inputField: '',
        empty: '',
      }}
    />
  );
};
