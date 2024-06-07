import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Theme.js";

import './App.css';

//To show alerte, you should add a logic if(yes){ item deleted} else{ item not deleted}

const StyledApp = styled.div`
background-color: ${(props) => props.theme.body};
color: ${(props) => props.theme.fontColor};
`;


function App() {

  const [theme, setTheme] = useState("light");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [text, setText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const inputRef = useRef();

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem('todos'));

  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  }

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  const handleItemDelete = (index) => {
    const result = window.confirm('سيتم حذف هذه المهمه نهائيا, هل أنت متأكد؟');
    if (result == true) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos)
    } else {
      return false;
    }
  }



  useEffect(() => {
    // Définir le premier texte après 1 seconde
    const timeout1 = setTimeout(() => {
      setText('Todolist, est un outil utilisé pour organiser et gérer les tâches à accomplir. Cela peut être une liste simple écrite sur papier ou une application informatique qui permet de créer, modifier et suivre les tâches. Une todolist permet aux utilisateurs de noter leurs tâches, de les classer par priorité ou par catégorie, de marquer celles qui sont terminées, et parfois même de définir des rappels ou des échéances pour chaque tâche, C est un outil efficace pour rester organisé et productif dans la gestion des tâches quotidiennes, personnelles ou professionnelles');
    }, 1000);

    // Définir le deuxième texte après 3 secondes
    const timeout2 = setTimeout(() => {
      setText('Une todolist est un outil efficace pour améliorer la productivité. En utilisant une todolist, les individus peuvent organiser leurs tâches, les prioriser et les suivre plus facilement. Cela permet de rester concentré sur les objectifs à atteindre et de gérer son temps de manière plus efficace. En ayant une vue claire des tâches à accomplir, les utilisateurs peuvent planifier leur journée de manière plus stratégique, éviter les oublis et les retards, et se sentir plus accomplis en cochant les tâches réalisées. En résumé, l utilisation d une todolist peut aider à accroître la productivité en facilitant la gestion des tâches quotidiennes.');
    }, 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    }
  });

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };


  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditSave = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App">
        <h2 class="title">My todo-list </h2>
        <div className="to-do-container">
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <div class="Hef">
                  <li className={completed ? "done" : ""} onClick={() => handleItemDone(index)} key={index}>{text}</li>
                  <div class="He">
                    {editingIndex === index ? (
                      <div>
                        <input
                          type="text"
                          value={editingText}
                          onChange={handleEditChange}
                        />
                        <button onClick={() => handleEditSave(index)} class="Save">Save</button>
                        <button onClick={handleEditCancel} class="Cancel">Cancel</button>
                      </div>
                    ) : (

                      <button onClick={() => handleEditStart(index)} class="Edit">Edit</button>

                    )}
                    <button onClick={handleItemDelete} class="trash"> Delete </button>
                  </div>
                </div>
              )
            })}
          </ul>
          <input ref={inputRef} class="input" placeholder="Enter item ..." />
          <button onClick={handleAddTodo} class="Add"> Add </button>
          <button onClick={themeToggler} class="Change">Change Theme</button>
        </div>
      </div>
      <div className="switchable-text-container">
        <h1>{text}</h1>
      </div>
    </ThemeProvider>
  );
};


export default App;
