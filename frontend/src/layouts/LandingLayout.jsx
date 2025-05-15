import { Outlet } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

const LandingLayout = () => (
  <>
    <LandingHeader />
    <main>
      <Outlet />
    </main>
    <LandingFooter />
  </>
);

export default LandingLayout;