import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import Projects from "./pages/Projects";

function App() {
return ( <BrowserRouter> <Routes>


    <Route path="/" element={<DashboardLayout />} />

    <Route path="/projects" element={<Projects />} />

  </Routes>
</BrowserRouter>


);
}

export default App;
