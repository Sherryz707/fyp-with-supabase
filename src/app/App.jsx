// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout";
// import Lessons from "../features/Lessons/components/Page";
// import Profile from "../features/Profile/components/Page";
// import SignUp from "../features/Signup/Page";
// import Login from "../features/Login/Page";
// import LandingPage from "../features/LandingPage/components/Page";
// import CategorySelection from "../features/Categories/components/Page";
// import QuizPage from "../features/Quiz/components/Page";
// import LessonDashboard from "../features/Lessons/components/Page";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="signup" element={<SignUp />} />
//         <Route path="login" element={<Login />} />
//         <Route path=":category/:lesson/quiz/:quizId" element={<QuizPage />} />
//         <Route path="/" element={<Layout />}>
//           <Route index element={<LandingPage />} />
//           {/* Lessons hierarchy */}
//           <Route path=":category">
//             <Route index element={<LessonDashboard />} />
//             <Route path=":activeTab" element={<LessonDashboard />} />
//             {/* <Route path=":activeTab/quiz/:quizId" element={<QuizPage />} /> */}
//           </Route>
//           <Route path="profile" element={<Profile />} />
//           <Route path="category" element={<CategorySelection />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Lessons from "../features/Lessons/components/Page";
import Profile from "../features/Profile/components/Page";
import SignUp from "../features/Signup/Page";
import Login from "../features/Login/Page";
import LandingPage from "../features/LandingPage/components/Page";
import CategorySelection from "../features/Categories/components/Page";
import QuizPage from "../features/Quiz/components/Page";
import LessonDashboard from "../features/Lessons/components/Page";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import Logout from "../components/Logout";
import Home from "../features/Room/components/Page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/my-home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:category/quiz/:quizId"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path=":category"
            element={
              <ProtectedRoute>
                <LessonDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path=":category/:activeTab"
            element={
              <ProtectedRoute>
                <LessonDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute>
                <CategorySelection />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
