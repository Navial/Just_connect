import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import NavBar from "../Navbar/Navbar";
import GithubPage from "../Github/GithubPage";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<GithubPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
