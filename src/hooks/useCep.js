import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useCep(value) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateZipCode = /^[0-9]{8}$/;

  useEffect(async () => {
    if (validateZipCode.test(value)) {
      setLoading(true);

      const { data } = await axios.get(
        `https://viacep.com.br/ws/${value}/json/`
      );

      if (!data?.erro) {
        setData({
          street: data?.logradouro,
          neighborhood: data?.bairro,
          complement: data?.complemento,
          city: data?.localidade,
          state: data?.uf,
          zipCode: data?.cep,
        });
      } else {
        setError({ message: "Informe o cep correto" });
        setData(null);
      }

      setLoading(false);
    }
  }, [value]);

  return { data, loading, error };
}
