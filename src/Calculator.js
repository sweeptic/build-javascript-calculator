import React from 'react';

import styles from './Calculator.module.css';

const Calculator = () => {
  return (
    <div className={styles.container}>
      <div className={styles.div1}>div1</div>
      <div className={styles.div2}>AC</div>
      <div className={styles.div3}>/</div>
      <div className={styles.div4}>*</div>
      <div className={styles.div5}>0</div>
      <div className={styles.div6}>=</div>
      <div className={styles.div7}>1</div>
      <div className={styles.div8}>2</div>
      <div className={styles.div9}>3</div>
      <div className={styles.div10}>4</div>
      <div className={styles.div11}>5</div>
      <div className={styles.div12}>6</div>
      <div className={styles.div13}>7</div>
      <div className={styles.div14}>8</div>
      <div className={styles.div15}>9</div>
      <div className={styles.div16}>-</div>
      <div className={styles.div17}>+</div>
      <div className={styles.div18}>.</div>
    </div>
  );
};

export default Calculator;
