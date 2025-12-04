import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const fetchItems = async (): Promise<void> => {
    const res = await fetch("http://localhost:4000/items");
    const data: Item[] = await res.json();
    setItems(data);
  };

  const createItem = async (): Promise<void> => {
    await fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setName("");
    fetchItems();
  };

  const searchItems = async (q: string): Promise<void> => {
    setSearch(q);
    const res = await fetch("http://localhost:4000/search?q=" + q);
    const data: Item[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Items</h1>

      <input
        placeholder="New item"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createItem} style={{ marginLeft: "0.5rem" }}>
        Add
      </button>

      <hr style={{ margin: "1rem 0" }} />

      <input
        placeholder="Search"
        value={search}
        onChange={e => searchItems(e.target.value)}
      />

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
