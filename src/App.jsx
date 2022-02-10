import { useState, useEffect } from "react";
import useCep from "./hooks/useCep";

export default function App() {
  const [cep, setCep] = useState("");

  const { data, loading, error } = useCep(cep);

  return (
    <div>
      <form>
        <label>
          Cep:
          <input
            name="cep"
            type="number"
            id="cep"
            size="10"
            maxLength={8}
            defaultValue={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        {error && <p>{error?.message}</p>}
        <br />
        {data &&
          !loading &&
          ["street", "neighborhood", "complement", "city", "state"].map(
            (key) => (
              <>
                <label>
                  {key}:
                  <input type="text" readOnly value={data?.[key]} />
                </label>
                <br />
              </>
            )
          )}
      </form>
    </div>
  );
}
