import { useQueryParams } from '../../../hooks/useQueryParams';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  paramKey: string;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
}

export function FilterDropdown({
  paramKey,
  options,
  placeholder = 'All',
  className = '',
}: FilterDropdownProps) {
  const { getParam, setParam } = useQueryParams();
  const currentValue = getParam(paramKey);

  return (
    <select
      value={currentValue}
      onChange={(e) => setParam(paramKey, e.target.value)}
      className={`input-field appearance-none bg-slate-900/50 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
