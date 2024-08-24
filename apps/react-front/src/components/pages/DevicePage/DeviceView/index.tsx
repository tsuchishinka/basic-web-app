import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { Button, TextInput, SimpleTable } from '@packages/ui-library'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import styles from './index.module.scss'
import { fetchDevices, searchDevices } from '@/store/redux/device/middleware'
import { useDeviceDispatch } from '@/store/redux/device/useDeviceDispatch'
import { RootState } from '@/store/redux/store'

const _DeviceView = () => {
  const [searchWords, setSearchWords] = useState('')
  const state = useSelector((s: RootState) => s.devicePage)
  const dispatch = useDeviceDispatch()

  useEffect(() => {
    ;(async () => {
      dispatch(fetchDevices())
    })()
  }, [dispatch])

  const onClick = useCallback(async () => {
    dispatch(searchDevices({ name: searchWords }))
  }, [dispatch, searchWords])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWords(e.target.value)
  }, [])

  const tableList = state.devices.map((device) => {
    return [device.model, device.name]
  })

  return (
    <>
      <div className={styles['serch-form']}>
        <div style={{ width: '30rem' }}>
          <TextInput value={searchWords} onChange={onChange} />
        </div>
        <Button color='blue' variant='secondary' size='medium' onClick={onClick}>
          検索
        </Button>
      </div>
      <div className={styles.list}>
        <SimpleTable headerList={['モデル', '名前']} list={tableList} />
      </div>
    </>
  )
}

export const DeviceView = React.memo(_DeviceView)
