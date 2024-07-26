// react-router-dom
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";
import MyStories from "./components/Dashboard/MyStories.jsx";
import CreateStory from "./components/Dashboard/CreateStory.jsx";
import Story from "./components/Story/Story.jsx";
import AllStories from "./components/Dashboard/AllStories.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="" element={<CreateStory />} />
            <Route path="all-stories" element={<AllStories />} />
            <Route path="story/:id" element={<Story />} />
            <Route path="my-stories" element={<MyStories />} />
          </Route>
        </Route>
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
