import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Workshops } from './pages/Workshops';
import { CreateWorkshop } from './pages/CreateWorkshop';
import { WorkshopView } from './pages/WorkshopView';
import { Projects } from './pages/Projects';
import { ProjectView } from './pages/ProjectView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="workshops/:id" element={<WorkshopView />} />
          <Route path="workshops/new" element={<CreateWorkshop />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;