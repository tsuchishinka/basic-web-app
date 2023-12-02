import React, { useCallback } from 'react'
import { Button, TextInput, SimpleTable } from 'ui-library'
import { useState } from 'react'
import styles from './DeviceView.module.scss'

const _DeviceView = () => {
  const [searchWords, setSearchWords] = useState('')
  const onClick = useCallback(() => {}, [])
  const onChange = useCallback((val: string) => {
    setSearchWords(val)
  }, [])
  return (
    <>
      <div className={styles['serch-form']}>
        <TextInput value={searchWords} onChange={onChange} />
        <Button label='検索' color='blue' variant='primary' size='medium' onClick={onClick} />
      </div>
      <div className={styles.list}>
        <SimpleTable headerList={['モデル', '名前']} list={[]} />
      </div>
    </>
  )
}

export const DeviceView = React.memo(_DeviceView)
