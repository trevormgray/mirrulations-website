const PageSwitcher = ({ current_page, total_pages, setPage }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= total_pages) {
            setPage(page - 1); // Convert 1-based UI input to 0-based index for logic
        }
    };
    
    const middle_page = Math.min(Math.max(current_page + 1, 2), total_pages - 1);
    const page_numbers = [middle_page - 1, middle_page, middle_page + 1];

    return (
        <section id="page_switcher_section" className="container mt-4">
            <div id="page_switcher_container" className="container">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${current_page === 0 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(1)}>{"<<"}</button>
                        </li>
                        <li className={`page-item ${current_page === 0 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(current_page)}>{"<"}</button>
                        </li>
                        {page_numbers.map((number) => (
                            <li key={number} className={`page-item ${number === current_page + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(number)}>
                                    {number} {/* This keeps it 1-based for the user */}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${current_page === total_pages - 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(current_page + 2)}>{">"}</button>
                        </li>
                        <li className={`page-item ${current_page === total_pages - 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(total_pages)}> {">>"} </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default PageSwitcher;
