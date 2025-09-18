import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";
import Select from "react-select";
import { Range } from "react-range";
import "./filter_side_bar.css";

const FilterSidebar = ({
  filters,
  setFilters,
  availableBreeds,
  clearFilters,
  toggleOffcanvas,
}) => {
  const [sliderValues, setSliderValues] = useState([0, 1000000]);

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ];

  const handleFilterChange = useCallback(
    (filterType, value) => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    },
    [setFilters]
  );

  // Handle slider change and update filters
  const handleSliderChange = useCallback(
    (values) => {
      setSliderValues(values);
      setFilters((prev) => ({
        ...prev,
        priceMin: String(values[0]),
        priceMax: String(values[1]),
      }));
    },
    [setFilters]
  );

  // Handle manual input changes
  const setPriceMinSafe = (val) => {
    const num = Number(val);
    if (!isNaN(num) && num >= 0 && num <= sliderValues[1]) {
      const newValues = [num, sliderValues[1]];
      setSliderValues(newValues);
      setFilters((prev) => ({
        ...prev,
        priceMin: String(num),
        priceMax: String(sliderValues[1]),
      }));
    }
  };

  const setPriceMaxSafe = (val) => {
    const num = Number(val);
    if (!isNaN(num) && num >= sliderValues[0] && num <= 1000000) {
      const newValues = [sliderValues[0], num];
      setSliderValues(newValues);
      setFilters((prev) => ({
        ...prev,
        priceMin: String(sliderValues[0]),
        priceMax: String(num),
      }));
    }
  };

  const genderOptions = [
    { value: "", label: "All Genders" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 40,
      borderRadius: 6,
      borderColor: state.isFocused ? "#22c55e" : "#ced4da",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(34,197,94,0.15)" : "none",
      "&:hover": { borderColor: "#22c55e" },
    }),
    valueContainer: (base) => ({ ...base, padding: "2px 8px" }),
    placeholder: (base) => ({ ...base, color: "#6b7280" }),
    singleValue: (base) => ({ ...base, color: "#374151" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#22c55e" : "#94a3b8",
      "&:hover": { color: "#22c55e" },
    }),
    menu: (base) => ({ ...base, borderRadius: 8, overflow: "hidden" }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#22c55e"
        : state.isFocused
        ? "rgba(34,197,94,0.08)"
        : "white",
      color: state.isSelected ? "white" : "#111827",
      cursor: "pointer",
    }),
  };

  const selectedGender =
    genderOptions.find((o) => o.value === filters.gender) || genderOptions[0];

  const onToggleBreed = (breed) => {
    setFilters((prev) => {
      const set = new Set(prev.breeds);
      if (set.has(breed)) {
        set.delete(breed);
      } else {
        set.add(breed);
      }
      return { ...prev, breeds: Array.from(set) };
    });
  };

  return (
    <>
      <div className="sidebar-header">
        <div className="d-flex justify-content-center align-items-center">
          <i
            className="fa-solid fa-arrow-left me-2 mobile-only"
            onClick={toggleOffcanvas}
            style={{ cursor: "pointer" }}
          />
          <h3>Filters</h3>
        </div>
        <Button
          className="clear-filters-btn"
          onClick={clearFilters}
          color="danger"
          size="sm"
        >
          Clear All
        </Button>
      </div>

      <div className="filter-sections">
        {/* Breed Filter - checkboxes */}
        <div className="filter-section">
          <h4 className="filter-title">Breed</h4>
          <div className="filter-options">
            {availableBreeds.map((breed) => (
              <label key={breed} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.breeds.includes(breed)}
                  onChange={() => onToggleBreed(breed)}
                />
                <span>{breed}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Dropdown (react-select) */}
        <div className="filter-section">
          <h4 className="filter-title">Gender</h4>
          <div className="filter-options">
            <Select
              options={genderOptions}
              value={selectedGender}
              onChange={(opt) =>
                handleFilterChange("gender", opt ? opt.value : "")
              }
              isSearchable={false}
              styles={selectStyles}
              classNamePrefix="gender-select"
            />
          </div>
        </div>

        {/* Price Range - Slider with Inputs */}
        <div className="filter-section">
          <h4 className="filter-title">Price Range</h4>
          <div className="filter-options">
            <div style={{ marginBottom: "16px", padding: "8px 0" }}>
              <Range
                step={5000}
                min={0}
                max={1000000}
                values={sliderValues}
                onChange={handleSliderChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "3px",
                      position: "relative",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: isDragged ? "#16a34a" : "#22c55e",
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                      boxShadow: isDragged
                        ? "0 4px 8px rgba(0,0,0,0.2)"
                        : "0 2px 4px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "all 0.1s ease",
                    }}
                  />
                )}
              />
            </div>
            <div className="d-flex" style={{ gap: 12 }}>
              <div className="d-flex flex-column" style={{ maxWidth: 140 }}>
                <label style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Min
                </label>
                <input
                  type="number"
                  min={0}
                  max={sliderValues[1]}
                  step={5000}
                  value={sliderValues[0]}
                  onChange={(e) => setPriceMinSafe(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column" style={{ maxWidth: 140 }}>
                <label style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Max
                </label>
                <input
                  type="number"
                  min={sliderValues[0]}
                  max={1000000}
                  step={5000}
                  value={sliderValues[1]}
                  onChange={(e) => setPriceMaxSafe(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              Range: ₹{sliderValues[0]} - ₹{sliderValues[1]}
            </div>
          </div>
        </div>

        {/* Sort By (removed age based sorting) */}
        <div className="filter-section">
          <h4 className="filter-title">Sort By</h4>
          <div className="filter-options">
            {sortOptions.map((option) => (
              <label key={option.value} className="filter-option">
                <input
                  type="radio"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
