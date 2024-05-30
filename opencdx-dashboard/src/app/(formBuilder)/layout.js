import PropTypes from 'prop-types';

// PROJECT IMPORTS
import MinimalLayout from 'layout/MinimalLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ==============================||  LAYOUT ||============================== //

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <MinimalLayout>{children}</MinimalLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
