import { useEffect, useState, useContext } from 'react'
import AppContext from "./Context/AppContext"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//pages
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import AddProgramPage from './pages/AddProgram/AddProgramPage';
import AddNewCourse from './pages/AddCourse/AddCourse';
import AddStudentInfoPage from './pages/AddStudentInfo/AddStudentInfoPage';
import EnrollCoursePage from './pages/EnrollCourse/EnrollCoursePAge';
import GradePage from './pages/Grade/GradePage';
import HomePage from './pages/Home/HomePage';
import MyEnrolledCoursesPage from './pages/MyEnrolledCourses/MyEnrolledCoursesPage';
import MyGradesPage from './pages/MyGrades/MyGradesPage';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboardPAge';

function App() {

  const [token, setToken] = useState('')
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token) setToken(token)
    if (user) setUser(JSON.parse(user))
    setIsLoggedIn(!!token)
  }, [])

  const globalData = { token, setToken, user, setUser }

  return (
    <>
      <AppContext.Provider value={globalData}>
        <Router>
          <Routes>
            <Route path="/enrolled-courses" element={<MyEnrolledCoursesPage />} />
            <Route path="/my-grades" element={<MyGradesPage />} />

            {
              !isLoggedIn &&
              <Route path="/signup" element={<SignupPage />} />
            }
            {
              !isLoggedIn &&
              <Route path="/login" element={<LoginPage />} />
            }

            {
              isLoggedIn && user?.accountType == "administrator" &&
              <Route path="/" element={<AdminDashboardPage />} />
            }

            {
              isLoggedIn &&
              <Route path="/" element={<HomePage />} />
            }

            {
              user?.accountType == "administrator" &&
              <Route path="/add-new-program" element={<AddProgramPage />} />
            }

            {
              user?.accountType == "administrator" &&
              <Route path="/add-new-course" element={<AddNewCourse />} />
            }
            {
              user?.accountType == "administrator" &&
              <Route path="/add-student-info" element={<AddStudentInfoPage />} />
            }
            {
              user?.accountType == "administrator" &&
              <Route path="/enroll-course" element={<EnrollCoursePage />} />
            }
            {
              user?.accountType == "administrator" &&
              <Route path="/grades" element={<GradePage />} />
            }

            {
              <Route path="/*" element={<LoginPage />} />
            }
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  )
}

export default App
