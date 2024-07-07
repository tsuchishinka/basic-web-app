import { ReactNode } from 'react'
import { Header } from '../../common/Header'
import styles from './index.module.scss'
import { SideMenu } from '@/components/common/SideMenu'

interface Props {
  children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <SideMenu />
        {children}
      </div>
    </>
  )
}

export { DefaultLayout }
