import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = 'Search...', className = '' }: SearchBarProps) {
  const { getParam, setParam } = useQueryParams();
  const initialSearch = getParam('search');
  const [inputValue, setInputValue] = useState(initialSearch);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setParam('search', inputValue);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Sync input value if URL changes externally
  useEffect(() => {
    if (initialSearch !== inputValue) {
      setInputValue(initialSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch]);

  return (
    <div
  className={`relative w-full sm:w-auto sm:min-w-50 md:w-64 ${className}`}
>
  <Search
    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
    size={18}
  />

  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder={placeholder}
    className="input-field w-full pl-10!"
  />
</div>
  );
}
