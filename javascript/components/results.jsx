import PageSwitcher from "./pageSwitcher";
import React, { useEffect, useState, useRef } from "react";
import "/styles/results.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultsSection = ({ initialResults }) => {
  const [results, setResults] = useState(initialResults);
  const [currentPage, setCurrentPage] = useState(initialResults.currentPage);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results.dockets.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  useEffect(() => {
    // Fetch new data when `currentPage` changes
    fetch(`/api/search-results?page=${currentPage}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error("Error fetching data:", error));
  }, [currentPage]);

  return (
    <div ref={resultsRef} className={`results-container mt-4`}>
      <h2 className="results-title">Search Results</h2>
      {results.dockets.map((docket, index) => (
        <div key={index} className="result-item border p-3 mb-2 rounded">
          <strong>{docket.title}</strong>
          <p><strong>Agency Name:</strong> {docket.agencyName}</p>
          <p>
            <strong>Docket ID: </strong> 
            <a href={`https://www.regulations.gov/docket/${docket.id}`} target="_blank" rel="noopener noreferrer">
              {docket.id}
            </a>
          </p>
          <p><strong>Matching Comments:</strong> {docket.comments.match}/{docket.comments.total}</p>
          <p><strong>Date Modified:</strong> {new Date(docket.dateModified).toLocaleDateString()}</p>
        </div>
      ))}
      <PageSwitcher current_page={currentPage} total_pages={results.totalPages} setPage={setCurrentPage} />
    </div>
  );
};

export default ResultsSection;