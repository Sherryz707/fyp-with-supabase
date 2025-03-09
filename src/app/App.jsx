import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Lessons from "../components/Lessons";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Lessons />} />
          <Route path="lessons" element={<Lessons />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
