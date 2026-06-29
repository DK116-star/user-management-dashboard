function SortBar({
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  return (
    <div className="sort-bar">
      <label>Sort By:</label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Select</option>
        <option value="id">ID</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="email">Email</option>
        <option value="department">Department</option>
      </select>

      <label>Order:</label>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortBar;