import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Lessons from "../features/Lessons/components/Page";
import Profile from "../features/Profile/components/Page";
import SignUp from "../features/Signup/Page";
import Login from "../features/Login/Page";
// import LandingPage from "../features/LandingPage/components/Page";
import CategorySelection from "../features/Categories/components/Page";
import QuizPage from "../features/Quiz/components/Page";
import LessonDashboard from "../features/Lessons/components/Page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path=":category/:lesson/quiz/:quizId" element={<QuizPage />} />
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<LandingPage />} /> */}
          {/* Lessons hierarchy */}
          <Route path=":category">
            <Route index element={<LessonDashboard />} />
            <Route path=":activeTab" element={<LessonDashboard />} />
            {/* <Route path=":activeTab/quiz/:quizId" element={<QuizPage />} /> */}
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="category" element={<CategorySelection />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
