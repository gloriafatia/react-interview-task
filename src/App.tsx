import { BrowserRouter, Routes, Route} from "react-router-dom";
import JobsiteListPage from "./pages/JobsiteListPage";
import JobsiteDetailPage from "./pages/JobSiteDetailPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobsiteListPage />} />
        <Route path="/jobsite" element={<JobsiteDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
