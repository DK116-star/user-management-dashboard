function Pagination({
  usersPerPage,
  setUsersPerPage,
  currentPage,
  setCurrentPage,
  totalUsers,
}) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="pagination">
      <div>
        <label>Show :</label>

        <select
          value={usersPerPage}
          onChange={(e) => {
            setUsersPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="page-buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀ Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default Pagination;