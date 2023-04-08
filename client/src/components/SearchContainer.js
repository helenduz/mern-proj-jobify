import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, Alert, FormRowSelect } from "./Components";

const SearchContainer = () => {
    const {
        isLoading,
        jobTypeOptions,
        statusOptions,
        handleFormChange,
        clearSearchForm,
        searchField,
        searchJobType,
        searchStatus,
        sort,
        sortOptions,
    } = useAppContext();

    const handleSearchInput = (e) => {
        handleFormChange({
            propertyName: e.target.name,
            propertyValue: e.target.value,
        });
    };

    return (
        <Wrapper>
            {/* form */}
            <form className="form">
                <h4>Search For Jobs</h4>
                <div className="form-center">
                    {/* text input searchField */}
                    <FormRow
                        type="text"
                        name="search Field"
                        value={searchField}
                        handleInput={handleSearchInput}
                    />
                    {/* Job type, status, and sort dropdowns */}
                    <FormRowSelect
                        labelText="Job Type"
                        name="searchJobType"
                        value={searchJobType}
                        options={["all", ...jobTypeOptions]}
                        handleChange={handleSearchInput}
                    />
                    <FormRowSelect
                        labelText="Status"
                        name="searchStatus"
                        value={searchStatus}
                        options={["all", ...statusOptions]}
                        handleChange={handleSearchInput}
                    />
                    <FormRowSelect
                        labelText="Sort By"
                        name="sort"
                        value={sort}
                        options={sortOptions}
                        handleChange={handleSearchInput}
                    />
                    <button
                        className="btn btn-block btn-danger"
                        onClick={(e) => {
                            e.preventDefault();
                            clearSearchForm();
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
