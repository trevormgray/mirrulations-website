import React from "react";

const MAX_PAGE = 10

const PageSwitcher = ({ current_page }) => {
    const PageButtons = () => {
        let middle_page = current_page

        if (current_page >= MAX_PAGE) { middle_page = MAX_PAGE - 1 }
        if (current_page <= 1) { middle_page = 2}
        const page_numbers = [middle_page - 1, middle_page, middle_page+1]

        return page_numbers.map((number) => {
            return (
                <li className="page-item" key={number}>
                    <a className={number === current_page ? "page-link disabled": "page-link"} href={"#"}>
                        {number}
                    </a>
                </li> 
            )
        })
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