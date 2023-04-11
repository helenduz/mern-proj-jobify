import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
    const { numPages, page, changePage } = useAppContext();

    // array of page numbers (starting from 1)
    const pageNumbers = Array.from(
        { length: numPages },
        (_, index) => index + 1
    );

    // handler for updating page global state on clicking prev

    return (
        <Wrapper>
            <button
                disabled={page === 1}
                className="prev-btn"
                onClick={() => {
                    changePage(page - 1);
                }}
            >
                <HiChevronDoubleLeft />
                Prev
            </button>

            <div className="btn-container">
                {pageNumbers.map((pageNumber) => {
                    return (
                        <button
                            className={
                                pageNumber === page
                                    ? "pageBtn active"
                                    : "pageBtn"
                            }
                            key={pageNumber}
                            onClick={() => {
                                changePage(pageNumber);
                            }}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                disabled={page === numPages}
                className="next-btn"
                onClick={() => {
                    changePage(page + 1);
                }}
            >
                Next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
};
export default PageBtnContainer;
