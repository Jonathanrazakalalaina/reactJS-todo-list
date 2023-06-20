import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";


function App() {

  
  const [cards, setCards] = useState([])

  useEffect(() => {
    const storedTasks = localStorage.getItem('cards');
    if (storedTasks) {
      setCards(JSON.parse(storedTasks));
    }
  }, []);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const createCard = (e) => {
    e.preventDefault()
    if(title === '' && details === '') return
    const newCard = [{title: title, detail: details}, ...cards]
    setCards(newCard)
    localStorage.setItem('cards', JSON.stringify(newCard));
    setTitle('')
    setDetails('')
  }
  
  const deleteCard = (index) => {
    const leftCard = [...cards]
    leftCard.splice(index, 1)
    setCards(leftCard)
    localStorage.setItem('cards', JSON.stringify(leftCard));
  }

  return (
    <div className="App">

      <h1>zavatra tokony ataoko</h1>

      <Form
        createCardFunc={createCard}
        title={title}
        details={details}
        setTitleFunc={(e) => setTitle(e.target.value)}
        setDetailsFunc={(e) => setDetails(e.target.value)}
      />

{cards.length !== 0 ? 
      <div className="cards">
        {cards.map((card, index) => (
          <Card title={card.title} details={card.detail} deleteCard={deleteCard} key={index} />
        ))}
      </div> : <div className="empty">Miseho eto ny lisitra</div>

}

    </div>
  );
}

export default App;
