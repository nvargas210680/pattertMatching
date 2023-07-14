import { Navigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
