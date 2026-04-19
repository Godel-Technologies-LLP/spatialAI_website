import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}

const FilterDropdown = ({ label, placeholder, options, selected, onToggle }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 min-w-[280px] relative" ref={dropdownRef}>
      <p className="text-[11px] font-semibold text-black/50 uppercase tracking-widest mb-2 px-1">
        {label}
      </p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-white border rounded-2xl transition-all duration-300 ${
          isOpen ? 'border-black shadow-lg shadow-black/5' : 'border-black/5 hover:border-black/20'
        }`}
      >
        <span className="text-sm font-medium text-black/80">
          {selected.length > 0 
            ? `${selected.length} Selected` 
            : placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-black/30 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-[100] left-0 right-0 mt-3 p-2 bg-white border border-black/5 rounded-2xl shadow-2xl shadow-black/10 max-h-[320px] overflow-y-auto hide-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onToggle(option)}
                className="w-full flex items-center gap-4 px-4 py-3 hover:bg-black/5 rounded-xl transition-colors group text-left"
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                  selected.includes(option)
                    ? 'bg-black border-black'
                    : 'border-black/10 group-hover:border-black/30 bg-white'
                }`}>
                  {selected.includes(option) && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`text-[13px] transition-colors ${
                  selected.includes(option) ? 'font-semibold text-black' : 'text-black/60'
                }`}>
                  {option}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SolutionsFilterProps {
  filters: {
    skills: string[];
    verticals: string[];
    applications: string[];
  };
  selected: {
    skills: string[];
    verticals: string[];
    applications: string[];
  };
  onUpdate: (category: string, item: string) => void;
  onClear: () => void;
}

export const SolutionsFilter = ({ filters, selected, onUpdate, onClear }: SolutionsFilterProps) => {
  const totalSelected = selected.skills.length + selected.verticals.length + selected.applications.length;

  return (
    <div className="w-full mb-16">
      <div className="flex flex-col lg:flex-row gap-8 items-end">
        <FilterDropdown
          label="Skills"
          placeholder="Select Skills"
          options={filters.skills}
          selected={selected.skills}
          onToggle={(item) => onUpdate('skills', item)}
        />
        <FilterDropdown
          label="Industry Verticals"
          placeholder="Select Industry Verticals"
          options={filters.verticals}
          selected={selected.verticals}
          onToggle={(item) => onUpdate('verticals', item)}
        />
        <FilterDropdown
          label="Application"
          placeholder="Select Application"
          options={filters.applications}
          selected={selected.applications}
          onToggle={(item) => onUpdate('applications', item)}
        />

        {totalSelected > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onClear}
            className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors"
          >
            Clear All
          </motion.button>
        )}
      </div>
    </div>
  );
};
