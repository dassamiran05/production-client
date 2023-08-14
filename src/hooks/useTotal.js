import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useTotal() {
  const [total, setTotal] = useState(0);


  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  return total;
}