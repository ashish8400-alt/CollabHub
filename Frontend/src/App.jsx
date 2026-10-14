// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DashboardLayout from "./layouts/DashboardLayout";
// import Projects from "./pages/Projects";
// import Tasks from "./pages/Tasks";

// function App() {
// return ( <BrowserRouter> <Routes>
// <Route path="/" element={<DashboardLayout />} />
// <Route path="/projects" element={<Projects />} />
// <Route path="/tasks" element={<Tasks />} /> </Routes> </BrowserRouter>
// );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<DashboardLayout />} />
<Route path="/projects" element={<DashboardLayout />} />
<Route path="/tasks" element={<DashboardLayout />} /> 
<Route path="/messages" element={<DashboardLayout />} />
<Route path="/notifications" element={<DashboardLayout />} />
</Routes> 
</BrowserRouter>
);
}

export default App;
