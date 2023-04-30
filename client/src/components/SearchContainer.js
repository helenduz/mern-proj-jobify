import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, Alert, FormRowSelect } from "./Components";
import { useMemo, useState } from "react";

const SearchContainer = () => {
    const [localSearchField, setLocalSearchField] = useState("");
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

    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearchField(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                // updates global state every 0.7 seconds
                // after the last key stroke
                handleFormChange({
                    propertyName: e.target.name, // "searchField"
                    propertyValue: e.target.value, // cannot be localSearchField since react might batch state updates
                });
            }, 700);
        };
    };

    const debounceReturnFunc = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            {/* form */}
            <form className="form">
                <h4>Search For Jobs</h4>
                <div className="form-center">
                    {/* text input searchField */}
                    <FormRow
                        type="text"
                        labelText="Keyword"
                        name="searchField"
                        value={localSearchField}
                        handleInput={debounceReturnFunc}
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
                            setLocalSearchField("");
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
