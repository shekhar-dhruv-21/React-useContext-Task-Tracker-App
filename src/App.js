import "./styles.css";
import Header from "./Components/Header";
import Tasks from "./Components/AddTaskForm";
import Footer from "./Components/Footer";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import Context from "./Components/Context";
import ShowContext from "./Components/Context";

export default function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      Name: "Check Emails",
      Day: "Jan 1st At 8AM",
      Reminder: true
    },
    {
      id: 2,
      Name: "Attend The Meeting",
      Day: "Jan 1st At 11AM",
      Reminder: true
    },
    {
      id: 3,
      Name: "Doctor Appointment",
      Day: "Jan 5th At 2PM",
      Reminder: false
    }
  ]);

  const delTask = (id) => {
    //console.log("Delete: ", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    //console.log("Toogle: ", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, Reminder: !task.Reminder } : task
      )
    );
  };

  const AddTask = (task) => {
    //console.log(task);
    const id = Math.floor(Math.random() * 500) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <ShowContext.Provider value={showAddTask}>
          <Header onBtnAdd={() => setShowAddTask(!showAddTask)} />
        </ShowContext.Provider>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {showAddTask && <AddTaskForm onAdd={AddTask} />}
                {tasks.length > 0 ? (
                  <Context.Provider value={tasks}>
                    <Tasks onDelete={delTask} onToggle={toggleReminder} />
                  </Context.Provider>
                ) : (
                  "No Task To Show"
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
