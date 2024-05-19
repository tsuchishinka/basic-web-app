import React, { useCallback, useEffect } from 'react'
import { Button, TextInput, SimpleTable } from '@packages/ui-library'
import { useState } from 'react'
import styles from './index.module.scss'
import { Device } from '@/store/DevicePage/state'
import { deviceService } from '@/service'

const _DeviceView = () => {
  const [searchWords, setSearchWords] = useState('')
  const [list, setList] = useState<string[][]>([])

  useEffect(() => {
    ;(async () => {
      const deviceList = await deviceService.fetchDeviceList({ offset: 0, limit: 10 })
      setList(deviceList.map((item) => [item.model, item.name]))
      console.log(`${deviceList.map((item) => [item.model, item.name])}`)
    })()
  }, [])
  const onClick = useCallback(async () => {
    const deviceList: Device[] = await deviceService.fetchDeviceList({ offset: 0, limit: 10 })
    setList(deviceList.map((item) => [item.model, item.name]))
  }, [])
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
        <SimpleTable headerList={['モデル', '名前']} list={list} />
      </div>
    </>
  )
}

export const DeviceView = React.memo(_DeviceView)
