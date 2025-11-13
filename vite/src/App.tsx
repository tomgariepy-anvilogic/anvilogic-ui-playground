import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import CounterPage from "./pages/CounterPage";
import ContactsPage from "./pages/ContactsPage";
import TasksPage from "./pages/TasksPage";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/counter" element={<CounterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
