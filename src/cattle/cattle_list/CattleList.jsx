import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../context.jsx";
import CattleCard from "../../cattle/cattle_card/CattleCard.jsx";
import { Offcanvas, OffcanvasBody, Button } from "reactstrap";
import FilterSidebar from "./FilterSidebar";
import "./cattle_list.css";

const CattleList = () => {
  const { cattlesList } = useContext(AppContext);
  const urlParams = new URLSearchParams(location.search);
  const category = urlParams.get("category");

  // Filter states
  const [filters, setFilters] = useState({
    breeds: [],
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
    if (prices.length === 0) return { minPrice: 0, maxPrice: 100000 };
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

    // Apply breed filters (multi-select). If none selected, show all.
    if (filters.breeds && filters.breeds.length > 0) {
      const wanted = new Set(
        filters.breeds.map((b) => (b || "").toLowerCase())
      );
      filtered = filtered.filter((e) =>
        wanted.has((e.breed || "").toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter((e) => (e.gender || "") === filters.gender);
    }

    // Apply price filtering
    if (filters.priceMin !== "" || filters.priceMax !== "") {
      const min =
        filters.priceMin !== "" ? Number(filters.priceMin) : -Infinity;
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

  const clearFilters = () => {
    setFilters({
      breeds: [],
      priceMin: "",
      priceMax: "",
      gender: "",
      sortBy: "",
    });
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <main>
      <div className="page-container">
        <div className="main-content">
          {/* Desktop Sidebar Filters */}
          <aside className="filters-sidebar desktop-only">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              availableBreeds={availableBreeds}
              clearFilters={clearFilters}
              toggleOffcanvas={toggleOffcanvas}
            />
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
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              availableBreeds={availableBreeds}
              clearFilters={clearFilters}
              toggleOffcanvas={toggleOffcanvas}
            />
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </main>
  );
};

export default CattleList;
