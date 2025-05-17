// useAxios.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (axiosParams, runOnMount = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(runOnMount);
  const [error, setError] = useState(null);

  const fetchData = async (params = axiosParams) => {
    setLoading(true);
    try {
      const response = await axios.request(params);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (runOnMount) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
