import PageSwitcher from "./pageSwitcher";
import React, { useEffect, useState, useRef } from "react";
import "/styles/results.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultsSection = ({ results }) => {
  const [isVisible, setIsVisible] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results.dockets.length > 0) {
      setIsVisible(true);

      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  return (
    <div ref={resultsRef} className={`results-container mt-4 ${isVisible ? "fade-in" : ""}`}>
      <h2 className="results-title">Search Results</h2>
      {results.dockets.map((docket, index) => (
        <div key={index} className="result-item border p-3 mb-2 rounded">
          <strong>{docket.title}</strong>
<<<<<<< HEAD
          <p><strong>Agency Name:</strong> {docket.agencyName}</p>
          <p><strong>Docket ID:</strong> https://www.reulations.gov/docket/{docket.id}</p> 
=======
          <p><strong>Docket ID:</strong> {docket.id}</p>
>>>>>>> 5ea7ec43bc3ed64d9373213e46bbf22119f3d754
          <p><strong>Matching Comments:</strong> {docket.comments.match}/{docket.comments.total}</p>
          <p><strong>Date Modified:</strong> {new Date(docket.dateModified).toLocaleDateString()}</p>
        </div>
      ))}
      <PageSwitcher current_page={results.currentPage} total_pages={results.totalPages}/>
    </div>
  );
};

export default ResultsSection;
