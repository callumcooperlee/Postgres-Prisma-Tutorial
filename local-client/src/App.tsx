import { useState } from "react";

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const createItem = () => {
    if (!name.trim()) return;

    const newItem: Item = {
      id: items.length ? items.at(-1)!.id + 1 : 1,
      name,
    };
    setItems([...items, newItem]);
    setName("");
  };

  const searchItems = (q: string) => {
    setSearch(q);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Items</h1>

      <input
        placeholder="New item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createItem} style={{ marginLeft: "0.5rem" }}>
        Add
      </button>

      <hr style={{ margin: "1rem 0" }} />

      <input
        placeholder="Search"
        value={search}
        onChange={(e) => searchItems(e.target.value)}
      />

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
