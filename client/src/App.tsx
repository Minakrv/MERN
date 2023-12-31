import { useEffect, useState } from 'react'
import './App.css'

type TDeck = {
  title: string;
  _id: string;
}

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:8000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "content-Type": 'application/json',
      }
    });
    setTitle(" ")
  }
   useEffect( () => {
    async function fetchData () {
      const response = await fetch("http://localhost:8000/decks")
      const newDecks = await response.json()
      setDecks(newDecks);
    }
    fetchData()
   }, []);

  return (
    <div className='App'>
      <ul className='deck'>
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input 
          id="deck-title" 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
