import { useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";

const usePost = (reload) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const post = (endpoint, data) => {
    setLoading(true);
    return api
      .post(`/${endpoint}`, data)
      .then((res) => {
        if(res.status === 201){
          setData(res.data);
          toast.success("Successfully created!!!")
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { post, data, loading, error };
};

export default usePost;
