import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

const PermissionsContext = React.createContext();
const SetPermissionsContext = React.createContext();

function permissionsReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE': {
      if (isEqual(state, payload)) {
        return state;
      }

      return payload;
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function PermissionsProvider({ children, initialPermissions }) {
  const [permissions, dispatch] = useReducer(
    permissionsReducer,
    initialPermissions
  );

  return (
    <PermissionsContext.Provider value={permissions}>
      <SetPermissionsContext.Provider value={dispatch}>
        {children}
      </SetPermissionsContext.Provider>
    </PermissionsContext.Provider>
  );
}

PermissionsProvider.propTypes = {
  children: PropTypes.any,
  initialPermissions: PropTypes.array,
};

function usePermissions() {
  const context = React.useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}

function usePermissionsDispatch() {
  const context = React.useContext(SetPermissionsContext);
  if (context === undefined) {
    throw new Error(
      'usePermissionsDispatch must be used within a PermissionsProvider'
    );
  }
  return context;
}

export { PermissionsProvider, usePermissions, usePermissionsDispatch };
