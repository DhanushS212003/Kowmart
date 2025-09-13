import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../context.jsx";
import CattleCard from "../../cattle/cattle_card/CattleCard.jsx";
import "./cattle_list.css";

const CattleList = () => {
  const { cattlesList } = useContext(AppContext);
  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");

  // Filter states
  const [filters, setFilters] = useState({
    breed: "",
    priceRange: "",
    ageRange: "",
    gender: "",
    sortBy: "",
  });

  // Offcanvas state for mobile
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Get unique breeds for the current category
  const availableBreeds = useMemo(() => {
    const breeds = cattlesList
      .filter((e) => e.cattle === category)
      .map((e) => e.breed);
    return [...new Set(breeds)];
  }, [cattlesList, category]);

  // Filter and sort cattle
  const filteredCattle = useMemo(() => {
    let filtered = cattlesList.filter((e) => e.cattle === category);

    // Apply filters
    if (filters.breed) {
      filtered = filtered.filter((e) => e.breed === filters.breed);
    }

    if (filters.gender) {
      filtered = filtered.filter((e) => e.gender === filters.gender);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((e) => {
        const price = Number(e.price);
        return price >= min && (max ? price <= max : true);
      });
    }

    if (filters.ageRange) {
      const [min, max] = filters.ageRange.split("-").map(Number);
      filtered = filtered.filter((e) => {
        const age = Number(e.age);
        return age >= min && (max ? age <= max : true);
      });
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return Number(a.price) - Number(b.price);
          case "price-high":
            return Number(b.price) - Number(a.price);
          case "age-young":
            return Number(a.age) - Number(b.age);
          case "age-old":
            return Number(b.age) - Number(a.age);
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
      priceRange: "",
      ageRange: "",
      gender: "",
      sortBy: "",
    });
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  // Filter component to avoid duplication
  const FilterContent = () => (
    <>
      <div className="sidebar-header">
        <h3>Filters</h3>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All
        </button>
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
                <span>{breed.charAt(0).toUpperCase() + breed.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="filter-section">
          <h4 className="filter-title">Gender</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value=""
                checked={filters.gender === ""}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              />
              <span>All Genders</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={filters.gender === "male"}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              />
              <span>Male</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={filters.gender === "female"}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <h4 className="filter-title">Price Range</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value=""
                checked={filters.priceRange === ""}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <span>All Prices</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="0-50000"
                checked={filters.priceRange === "0-50000"}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <span>₹0 - ₹50,000</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="50000-100000"
                checked={filters.priceRange === "50000-100000"}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <span>₹50,000 - ₹1,00,000</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="100000-200000"
                checked={filters.priceRange === "100000-200000"}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <span>₹1,00,000 - ₹2,00,000</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                value="200000"
                checked={filters.priceRange === "200000"}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
              />
              <span>₹2,00,000+</span>
            </label>
          </div>
        </div>

        {/* Age Range Filter */}
        <div className="filter-section">
          <h4 className="filter-title">Age Range</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="ageRange"
                value=""
                checked={filters.ageRange === ""}
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              />
              <span>All Ages</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="ageRange"
                value="0-2"
                checked={filters.ageRange === "0-2"}
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              />
              <span>0-2 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="ageRange"
                value="2-4"
                checked={filters.ageRange === "2-4"}
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              />
              <span>2-4 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="ageRange"
                value="4-6"
                checked={filters.ageRange === "4-6"}
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              />
              <span>4-6 years</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="ageRange"
                value="6"
                checked={filters.ageRange === "6"}
                onChange={(e) => handleFilterChange("ageRange", e.target.value)}
              />
              <span>6+ years</span>
            </label>
          </div>
        </div>

        {/* Sort By */}
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
            <label className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value="age-young"
                checked={filters.sortBy === "age-young"}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              />
              <span>Age: Young to Old</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value="age-old"
                checked={filters.sortBy === "age-old"}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              />
              <span>Age: Old to Young</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );

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
              <button
                className="mobile-filter-btn mobile-only"
                onClick={toggleOffcanvas}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                Filters
              </button>
            </div>

            <div className="cattles_container">
              {filteredCattle.length > 0 ? (
                filteredCattle.map((e, index) => (
                  <CattleCard key={index} cattle={e} onlyStatus={false} />
                ))
              ) : (
                <div className="no-results">
                  <p>No cattle found matching your filters.</p>
                  <button onClick={clearFilters} className="clear-filters-btn">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Offcanvas */}
        <div
          className={`offcanvas-overlay ${isOffcanvasOpen ? "active" : ""}`}
          onClick={closeOffcanvas}
        ></div>
        <div
          className={`offcanvas-filters mobile-only ${
            isOffcanvasOpen ? "active" : ""
          }`}
        >
          <div className="offcanvas-header">
            <h3>Filters</h3>
            <button className="close-btn" onClick={closeOffcanvas}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="offcanvas-content">
            <FilterContent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CattleList;
