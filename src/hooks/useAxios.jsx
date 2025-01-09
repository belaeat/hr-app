import { useState } from "react";
import axios from "axios";

const useAxios = (baseURL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({ method, url: `${baseURL}${url}`, data });
      return response.data;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = (url) => request("GET", url);
  const post = (url, data) => request("POST", url, data);
  const patch = (url, data) => request("PATCH", url, data);
  const del = (url) => request("DELETE", url);

  return { get, post, patch, del, loading, error };
};

export default useAxios;
