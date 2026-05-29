export const eventCategoryValues = ['Outdoor programs', 'Indoor programs', 'Online courses'] as const;

export const eventCategories = eventCategoryValues.map((category) => ({
  label: category,
  value: category,
  checked: false,
}));
