import React from 'react'
import { SimpleTable } from './SimpleTable'

export default {
  title: 'Table/SimpleTable',
  component: SimpleTable,
  args: {},
}

export const All = () => {
  const headerList = ['モデル', '名前']
  const list = [
    ['CC2L', '大阪デバイス'],
    ['SafieOne', '東京デバイス'],
  ]
  return (
    <>
      <div style={buttonWrapStyle}>
        <SimpleTable list={list} headerList={headerList} />
      </div>
    </>
  )
}

const buttonWrapStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  padding: '10px',
}
