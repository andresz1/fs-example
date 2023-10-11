import React, { useEffect, useState } from "react";
import "./App.css";
import { CatCreationForm } from "./CatCreationForm";

export default function App() {
  // Estado del componente
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cats, setCats] = useState([]);

  // Variables computadas a partir del estado

  // Efectos - Sincronizar con sistemas externos
  // Por ejemplo: Hacer peticiones
  // Se ejecuta al iniciar el componente y al cambiar las dependencias
  useEffect(() => {
    const fetchCats = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/cats");

        if (response.ok) {
          const cats = await response.json();
          setCats(cats);
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        setError("Something went wrong");
      }

      setIsLoading(false);
    };

    fetchCats();
  }, []);

  // Manejadores de eventos
  const handleAdd = async cat => {
    try {
      const response = await fetch("/api/cats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
      });

      if (response.ok) {
        const cats = await response.json();
        setCats(cats);
        return;
      }

      setError("Something went wrong");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleRemove = async cat => {
    const catId = cat.id;

    try {
      const response = await fetch(`/api/cats/${catId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const cats = await response.json();
        setCats(cats);
        return;
      }

      setError("Something went wrong");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const handleUpdateAge = async (cat, newAge) => {
    const catId = cat.id;

    try {
      const response = await fetch(`/api/cats/${catId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...cat,
          age: newAge
        })
      });

      if (response.ok) {
        const cats = await response.json();
        setCats(cats);
        return;
      }

      setError("Something went wrong");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Lista de gatos 🐈</h1>

      <div>
        {isLoading && <p>Cargando</p>}

        {!isLoading && error && <p>{error}</p>}

        {!isLoading && !error && (
          <ul>
            {cats.map(cat => (
              <li key={cat.id}>
                {cat.name} - {cat.age}
                <button
                  aria-label={`Incrementar edad de gato ${cat.name}`}
                  onClick={() => handleUpdateAge(cat, cat.age + 1)}
                >
                  +
                </button>
                <button
                  aria-label={`Decrementar edad de gato ${cat.name}`}
                  onClick={() => handleUpdateAge(cat, cat.age - 1)}
                >
                  -
                </button>
                <button
                  aria-label={`Borrar gato ${cat.name}`}
                  onClick={() => handleRemove(cat)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CatCreationForm onAdd={handleAdd} />
    </div>
  );
}
