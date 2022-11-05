import { Routes, Route } from "react-router-dom";
import EditorBlog from "./pages/EditorBlog";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EditorBlog />} />
        <Route path="myblog" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
