import PageSwitcher from "./pageSwitcher";
import React, { useEffect, useState, useRef } from "react";
import "/styles/results.css";
import "bootstrap/dist/css/bootstrap.min.css";


const ResultsSection = ({ results }) => {
  const [isVisible, setIsVisible] = useState(false);
  const resultsRef = useRef(null);

  // Function to determine icon based on docket type
  const getDocketIcon = (docket) => {
    // Simply check if the docket is rulemaking or non-rulemaking
    const isRulemaking = docket.docketType === "Rulemaking";
    
    // Return hammer for rulemaking, pencil for non-rulemaking
    return isRulemaking ? "../../icons/hammer.png" : "../../icons/pencil.png";
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
        <div key={index} className="result-item border p-3 mb-2 rounded">
          <div className="d-flex justify-content-between">
            <div className="result-content">
              <strong>{docket.title}</strong>
              <p><strong>Agency Name:</strong> {docket.agencyName}</p>
              <p>
                <strong>Docket ID: </strong> 
                <a href={`https://www.regulations.gov/docket/${docket.id}`} target="_blank" rel="noopener noreferrer">
                  {docket.id}
                </a>
              </p>
              <p><strong>Matching Comments:</strong> {docket.comments.match}/{docket.comments.total}</p>
              <p><strong>Matching Attachments:</strong> {docket.attachments ? `${docket.attachments.match}/${docket.attachments.total}` : "Unknown"}</p>
              <p>
                <strong>Date Modified:</strong> { docket.timelineDates && docket.timelineDates.dateModified ? new Date(docket.timelineDates.dateModified).toLocaleDateString() : docket.dateModified ? new Date(docket.dateModified).toLocaleDateString() : "Unknown"}
                <strong>&emsp;Date Created:</strong> { docket.timelineDates && docket.timelineDates.dateCreated ? new Date(docket.timelineDates.dateCreated).toLocaleDateString() : "Unknown"}
                <strong>&emsp;Date Effective:</strong> { docket.timelineDates && docket.timelineDates.dateEffective ? new Date(docket.timelineDates.dateEffective).toLocaleDateString() : "Unknown" }
                <strong>&emsp;Date Closed:</strong> { docket.timelineDates && docket.timelineDates.dateClosed ? new Date(docket.timelineDates.dateClosed).toLocaleDateString() : "Unknown" }
                <strong>&emsp;Date Comments Opened:</strong> { docket.timelineDates && docket.timelineDates.dateCommentsOpened ? new Date(docket.timelineDates.dateCommentsOpened).toLocaleDateString() : "Unknown" }
              </p>
            </div>
            
            <div className="d-flex align-items-end">
              <img 
                src={getDocketIcon(docket)} 
                alt={docket.docketType === "Rulemaking" ? "Rulemaking icon" : "Non-rulemaking icon"} 
                className="docket-icon"
                title={docket.docketType === "Rulemaking" ? "Rulemaking" : "Non-rulemaking"}
              />
            </div>
          </div>
        </div>
      ))}
      <PageSwitcher current_page={results.currentPage} total_pages={results.totalPages}/>
    </div>
  );
};

export default ResultsSection;