import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function useFetch(url) {
  let [data, setData] = useState(null);
  //for filtering
  let [filterData, setFilterData] = useState(data);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilterData(data);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [url]);
  return { data, setData, filterData, setFilterData, loading, error };
}
export default useFetch;
