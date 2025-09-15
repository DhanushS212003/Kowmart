import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../context.jsx";
import CattleCard from "../../cattle/cattle_card/CattleCard.jsx";
import { Offcanvas, OffcanvasBody, Button } from "reactstrap";
import Select from "react-select";
import "./cattle_list.css";

const CattleList = () => {
  const { cattlesList } = useContext(AppContext);
  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");

  // Filter states
  const [filters, setFilters] = useState({
    breed: "",
    priceMin: "",
    priceMax: "",
    gender: "",
    sortBy: "",
  });

  const breedList = {
    cow: [
      "Gir",
      "Red Sindhi",
      "Kankrej",
      "Jersey",
      "Rathi Heifer",
      "Kapila",
      "Vilwadri",
      "HF",
      "Tharparkar",
      "Sahiwal",
      "Deoni",
    ],
    buffalo: ["Surti", "Nili", "Banni", "Murrah", "Jafarabadi"],
    goat: [
      "Malabari",
      "Sirohi",
      "Kota",
      "Beetal",
      "Sannen",
      "Jamunapari",
      "Boer",
      "Sojat",
      "Barbari",
      "Gujri",
      "Jakhrana",
    ],
    sheep: ["Bannur", "Neelore Jodipi", "Sindhanoor", "Deccani", "Coimbatore"],
    ox: ["Ongole", "Brahma"],
  };

  // Offcanvas state for mobile
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Derive price bounds for slider based on current category
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = cattlesList
      .filter((e) => e.cattle === category)
      .map((e) => Number(e.price))
      .filter((n) => !Number.isNaN(n));
    if (prices.length === 0) return { minPrice: 0, maxPrice: 0 };
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [cattlesList, category]);

  // Get breeds for the current category using the provided breedList (fallback to data-derived)
  const availableBreeds = useMemo(() => {
    const list = breedList[category] || [];
    if (list.length > 0) return list;
    const breeds = cattlesList
      .filter((e) => e.cattle === category)
      .map((e) => e.breed)
      .filter(Boolean);
    return [...new Set(breeds)];
  }, [breedList, cattlesList, category]);

  // Filter and sort cattle
  const filteredCattle = useMemo(() => {
    let filtered = cattlesList.filter((e) => e.cattle === category);

    // Apply filters
    if (filters.breed) {
      filtered = filtered.filter((e) =>
        (e.breed || "").toLowerCase() === filters.breed.toLowerCase()
      );
    }

    if (filters.gender) {
      filtered = filtered.filter((e) => (e.gender || "") === filters.gender);
    }

    if (filters.priceMin !== "" || filters.priceMax !== "") {
      const min = filters.priceMin !== "" ? Number(filters.priceMin) : -Infinity;
      const max = filters.priceMax !== "" ? Number(filters.priceMax) : Infinity;
      filtered = filtered.filter((e) => {
        const price = Number(e.price);
        return !Number.isNaN(price) && price >= min && price <= max;
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return Number(a.price) - Number(b.price);
          case "price-high":
            return Number(b.price) - Number(a.price);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [cattlesList, category, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      breed: "",
      priceMin: "",
      priceMax: "",
      gender: "",
      sortBy: "",
    });
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  // Filter component to avoid duplication
  const FilterContent = () => {
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

    const selectedGender = genderOptions.find((o) => o.value === filters.gender) || genderOptions[0];

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
          {/* Breed Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Breed</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="breed"
                  value=""
                  checked={filters.breed === ""}
                  onChange={(e) => handleFilterChange("breed", e.target.value)}
                />
                <span>All Breeds</span>
              </label>
              {availableBreeds.map((breed) => (
                <label key={breed} className="filter-option">
                  <input
                    type="radio"
                    name="breed"
                    value={breed}
                    checked={filters.breed === breed}
                    onChange={(e) => handleFilterChange("breed", e.target.value)}
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
                onChange={(opt) => handleFilterChange("gender", opt ? opt.value : "")}
                isSearchable={false}
                styles={selectStyles}
                classNamePrefix="gender-select"
              />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-section">
            <h4 className="filter-title">Price Range</h4>
            <div className="filter-options">
              <div className="d-flex align-items-center justify-content-between" style={{ gap: "12px" }}>
                <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                  <label style={{ fontSize: "0.8rem", color: "#6b7280" }}>Min</label>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={filters.priceMin === "" ? minPrice : Number(filters.priceMin)}
                    onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                  />
                  <span style={{ fontSize: "0.8rem" }}>₹{filters.priceMin === "" ? minPrice : filters.priceMin}</span>
                </div>
                <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                  <label style={{ fontSize: "0.8rem", color: "#6b7280" }}>Max</label>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={filters.priceMax === "" ? maxPrice : Number(filters.priceMax)}
                    onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                  />
                  <span style={{ fontSize: "0.8rem" }}>₹{filters.priceMax === "" ? maxPrice : filters.priceMax}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sort By (removed age based sorting) */}
          <div className="filter-section">
            <h4 className="filter-title">Sort By</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="sortBy"
                  value=""
                  checked={filters.sortBy === ""}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                <span>Default</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="price-low"
                  checked={filters.sortBy === "price-low"}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                <span>Price: Low to High</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="price-high"
                  checked={filters.sortBy === "price-high"}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                <span>Price: High to Low</span>
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <main>
      <div className="page-container">
        <div className="main-content">
          {/* Desktop Sidebar Filters */}
          <aside className="filters-sidebar desktop-only">
            <FilterContent />
          </aside>

          {/* Main Content Area */}
          <div className="content-area">
            <div className="header-section">
              <div className="header-left">
                <h2 className="title">All {category}</h2>
                <span className="badge badge_outline">
                  {`Total: ${filteredCattle.length}`}
                </span>
              </div>

              {/* Mobile Filter Toggle Button */}
              <Button
                className="mobile-filter-btn mobile-only"
                onClick={toggleOffcanvas}
                color="success"
                size="sm"
              >
                <i className="fa-solid fa-filter"></i>
                Filters
              </Button>
            </div>

            <div className="cattles_container">
              {filteredCattle.length > 0 ? (
                filteredCattle.map((e, index) => (
                  <CattleCard key={index} cattle={e} onlyStatus={false} />
                ))
              ) : (
                <div className="no-results">
                  <p>No cattle found matching your filters.</p>
                  <Button
                    onClick={clearFilters}
                    className="clear-filters-btn"
                    color="danger"
                    size="sm"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reactstrap Offcanvas */}
        <Offcanvas
          isOpen={isOffcanvasOpen}
          toggle={toggleOffcanvas}
          direction="end"
          className="offcanvas-filters"
        >
          <OffcanvasBody className="offcanvas-content">
            <FilterContent />
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </main>
  );
};

export default CattleList;
