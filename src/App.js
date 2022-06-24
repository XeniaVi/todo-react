import './App.css';
import { useState, useEffect } from 'react';
import TasksList from './components/TasksList';
import InputTask from './components/InputTask';


const App = () => {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const addTask = () => {
    if(value) {
      setItems([...items, {
        id: Date.now(),
        value: value,
        completed: false
      }]);
      setValue("");
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div>
      <InputTask handleChange={handleChange} addTask={addTask} value={value}/>
      <TasksList items={items}/>
    </div>
  );
}

export default App;
