import PageSwitcher from "./pageSwitcher";
import React, { useEffect, useState, useRef } from "react";
import "/styles/results.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultsSection = ({ results }) => {
  const [isVisible, setIsVisible] = useState(false);
  const resultsRef = useRef(null);

  // Function to determine icon based on docket type
  const getDocketIcon = (docket) => {
    // Check if the docket is rulemaking (based on docketType field)
    const isRulemaking = docket.docketType === "Rulemaking" || docket.isRulemaking === true;
    
    if (isRulemaking) {
      // Check if it's a final rule - can be determined by title
      const title = docket.title?.toLowerCase() || "";
      const isFinalRule = title.includes("final rule") || 
                         title.includes("amendment") ||
                         title.includes("implementation");
      
      return isFinalRule ? "/assets/icons/hammer.png" : "/assets/icons/pencil.png";
    } else {
      // For non-rulemaking dockets, we won't show an icon
      return null;
    }
  };

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
        <div key={index} className="result-item border p-3 mb-2 rounded position-relative">
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
          
          {/* Icon in bottom right corner - only display if there's an icon for this docket type */}
          {getDocketIcon(docket) && (
            <img 
              src={getDocketIcon(docket)} 
              alt={docket.docketType === "Rulemaking" ? "Rule icon" : "Docket icon"} 
              className="docket-icon"
              title={getDocketIcon(docket).includes("hammer") ? "Final Rule" : "Proposed Rule"}
            />
          )}
        </div>
      ))}
      <PageSwitcher current_page={results.currentPage} total_pages={results.totalPages}/>
    </div>
  );
};

export default ResultsSection;
