// DataFetcher.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import debounce from "lodash.debounce";

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = "https://data.gov.il/api/3/action/datastore_search";
  const resourceId = "c8b9f9c8-4612-4068-934f-d4acd2e3c06e"; // Your resource ID

  const fetchData = useCallback(
    async (term) => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          params: {
            resource_id: resourceId,
            limit: 5,
            q: term,
          },
        });
        if (
          response.data &&
          response.data.result &&
          response.data.result.records
        ) {
          setData(response.data.result.records);
          setFilteredData(response.data.result.records);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, resourceId]
  );

  const debouncedFetchData = useCallback(
    debounce((term) => fetchData(term), 300),
    [fetchData]
  );

  useEffect(() => {
    debouncedFetchData(searchTerm);
  }, [searchTerm, debouncedFetchData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="הקלידו מספר רכב"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <DataTable data={filteredData} />
    </div>
  );
};

export default DataFetcher;
