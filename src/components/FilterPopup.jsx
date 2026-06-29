function FilterPopup({
  filters,
  setFilters,
  showFilter,
  setShowFilter,
}) {
  if (!showFilter) return null;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="filter-popup">
      <h3>Filter Users</h3>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={filters.firstName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={filters.lastName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={filters.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={filters.department}
        onChange={handleChange}
      />

      <button onClick={() => setShowFilter(false)}>
        Apply Filters
      </button>
    </div>
  );
}

export default FilterPopup;