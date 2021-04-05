import React from 'react'
import styles from './styles.module.scss'

const AppLoading: React.FC = () => (
  <div className={styles.loading}>
    <span>Application is loading, please wait...</span>
  </div>
)

export default AppLoading
