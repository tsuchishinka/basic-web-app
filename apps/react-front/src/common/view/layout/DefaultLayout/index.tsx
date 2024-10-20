import { ReactNode } from 'react'
import { Header } from '../../component/Header'
import styles from './index.module.scss'
import { SideMenu } from '@/common/view/component/SideMenu'

interface Props {
  children: ReactNode
  hasSideBar?: boolean
}

const DefaultLayout = ({ children, hasSideBar = true }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        {hasSideBar && <SideMenu />}
        {children}
      </div>
    </>
  )
}

export { DefaultLayout }
