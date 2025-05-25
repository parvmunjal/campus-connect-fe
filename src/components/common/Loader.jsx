import React from 'react';
import { Bars } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <Bars
        height="80"
        width="80"
        color="#2E3A59"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
  />
    </div>
  );
};

export default Loader;
        
