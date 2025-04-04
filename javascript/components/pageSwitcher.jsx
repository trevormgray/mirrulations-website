import React from "react";

const API_GATEWAY_URL = import.meta.env.VITE_GATEWAY_API_URL || GATEWAY_API_URL;

const PageSwitcher = ({ current_page, total_pages, searchTerm }) => {
    const PageButtons = () => {
        current_page += 1 // this is because human's expect pages to be 1-indexed
        let middle_page = current_page

        if (current_page >= total_pages) { middle_page = total_pages - 1 }
        if (current_page <= 1) { middle_page = 2}
        const page_numbers = [middle_page - 1, middle_page, middle_page+1]


        const pageItemList =  page_numbers.map((number) => {
            return (
                <li className="page-item" key={number}>
                    <a className={number === current_page ? "page-link disabled": "page-link"} href={"#"}>
                        {number}
                    </a>
                </li> 
            )
        })

        const updateSearch = async (pageNumber) => {
            if (!searchTerm.trim()) {
              setError("Please enter a search term.");
              setResults(null);
              return;
            }
          
            setLoading(true);
            setError(null);
          
            try {
              const query_params = new URLSearchParams()
              query_params.append("searchTerm", searchTerm)
              query_params.append("pageNumber", pageNumber - 1)
              // pageNumber - 1 because the API is 0-indexed
              query_params.append("refreshResults", false)
              query_params.append("sortParams", JSON.stringify(
                {
                  "desc": true,
                  "sortType": "relevance"
                }
              ))
              query_params.append("filterParams", JSON.stringify(
                {
                  "dateRange": {
                      "start": "2000-01-01 00:00:00.000-0400",
                      "end": "2025-03-18 00:00:00.000-0400"
                  },
                  "docketType": "Rulemaking"
                }
              ))
        
              const url = `${API_GATEWAY_URL}?${query_params.toString()}`
              
              const headers = {
                "Session-Id": "test",
                "Content-Type": "application/json"
              }
        
              const response = await fetch(url, { headers });
          
              if (!response.ok) {
                console.log(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.json();
              console.log(data);
          
              if (!data ||!data.dockets || (Array.isArray(data.dockets) && data.dockets.length === 0)) {
                throw new Error("No results found. Please try a different search term.");
              }
          
              setResults(data);
            } catch (err) {
              setError(err.message);
              setResults(null);
            } finally {
              setLoading(false);
            }
          };
        

        const arrowList = [
            { text: "<<", onClick: () => updateSearch(1), disabledPage: 1 },
            { text: "<", onClick: () =>  updateSearch(current_page - 1), disabledPage: 1 },
            { text: ">", onClick: () => updateSearch(current_page + 1), disabledPage: total_pages },
            { text: ">>", onClick: () => updateSearch(total_pages), disabledPage: total_pages },
        ];

        const arrowItemList = arrowList.map((arrow) => {
            return (
                <li className="page-item" key={arrow.text}>
                    <a className={arrow.disabledPage === current_page ? "page-link disabled": "page-link"} href={arrow.href}>
                        {arrow.text}
                    </a>
                </li> 
            )
        })
        
        return [...arrowItemList.slice(0, 2), ...pageItemList, ...arrowItemList.slice(2)]
    }

    return (
        <section id="page_switcher_section" className="container mt-4">
            <div id="page_switcher_container" className="container">
                <nav>
                    <ul className="pagination justify-content-center">
                        {PageButtons()}
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default PageSwitcher