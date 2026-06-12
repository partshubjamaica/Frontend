"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { countries } from "@/lib/countries";

type CountryValue = {
  code: string;
  name: string;
  flagUrl: string;
};

const allCountriesOption: CountryValue = {
  code: "ALL",
  name: "All countries",
  flagUrl: ""
};

export function CountrySelect({
  value,
  onChange,
  includeAll = false,
  label = "Country",
  className = "mt-4"
}: {
  value?: CountryValue;
  onChange?: (country: CountryValue) => void;
  includeAll?: boolean;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalSelected, setInternalSelected] = useState<CountryValue>(countries.find((country) => country.code === "JM") ?? countries[0]);
  const selected = value ?? internalSelected;
  const options = includeAll ? [allCountriesOption, ...countries] : countries;

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter((country) =>
      country.name.toLowerCase().includes(normalizedQuery) || country.code.toLowerCase().includes(normalizedQuery)
    );
  }, [options, query]);

  function selectCountry(country: CountryValue) {
    setInternalSelected(country);
    onChange?.(country);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className={`relative ${className}`}>
      <input type="hidden" name="country" value={selected.name} />
      <input type="hidden" name="countryCode" value={selected.code} />
      <label className="mb-2 block text-sm font-bold text-navy/70" htmlFor="country-search">
        {label}
      </label>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-navy/10 bg-white px-4 py-3 text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex min-w-0 items-center gap-3">
          {selected.flagUrl ? (
            <img src={selected.flagUrl} alt={`${selected.name} flag`} className="h-5 w-7 rounded object-cover ring-1 ring-navy/10" />
          ) : (
            <span className="grid h-5 w-7 place-items-center rounded bg-cloud text-[10px] font-bold text-navy/50 ring-1 ring-navy/10">All</span>
          )}
          <span className="truncate font-semibold">{selected.name}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-navy/50" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
          <div className="flex items-center gap-2 border-b border-navy/10 px-3 py-2">
            <Search className="h-4 w-4 text-navy/40" aria-hidden="true" />
            <input
              id="country-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search countries"
              className="min-w-0 flex-1 px-1 py-2 text-sm outline-none"
              autoComplete="off"
            />
          </div>
          <div role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filteredCountries.map((country) => {
              const active = country.code === selected.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-cloud"
                  onClick={() => selectCountry(country)}
                >
                  {country.flagUrl ? (
                    <img src={country.flagUrl} alt={`${country.name} flag`} className="h-5 w-7 rounded object-cover ring-1 ring-navy/10" />
                  ) : (
                    <span className="grid h-5 w-7 place-items-center rounded bg-cloud text-[10px] font-bold text-navy/50 ring-1 ring-navy/10">All</span>
                  )}
                  <span className="min-w-0 flex-1 truncate font-semibold">{country.name}</span>
                  {active && <Check className="h-4 w-4 text-pink" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
