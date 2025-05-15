import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => (
  <div>
    <DashboardHeader />
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
