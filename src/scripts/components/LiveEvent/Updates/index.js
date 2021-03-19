import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Update from '../../Update';

function Updates({ updates }) {
  return (
    <div className="atom atom-updates">
      {updates.map(update => (
        <motion.div
          {...{
            key: update.id,
            animate: {
              height: 'auto',
              opacity: 1,
              y: 0,
            },
            initial: {
              height: 0,
              opacity: 0,
              y: -100,
            },
            transition: {
              stiffness: 300,
              damping: 50,
            },
          }}
          aria-live="polite"
        >
          <Update {...{ update }} />
        </motion.div>
      ))}
    </div>
  );
}

Updates.propTypes = {
  updates: PropTypes.array,
  firstRender: PropTypes.object,
};

export default Updates;
