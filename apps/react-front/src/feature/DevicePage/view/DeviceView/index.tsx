import { deviceService } from '@/service'
import { RootState } from '@/store'
import {
  Button,
  Table,
  TableBody,
  TableBodyData,
  TableBodyRow,
  TableHeader,
  TableHeaderData,
  TableHeaderRow,
  TextInput,
} from '@packages/ui-library'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import fetchDevices from '../../controller/actions/fetchDevices'
import searchDevices from '../../controller/actions/searchDevices'
import { updateDevicePageState } from '../../controller/slice'
import styles from './index.module.scss'

const _DeviceView = () => {
  const [searchWords, setSearchWords] = useState('')
  const state = useSelector((s: RootState) => s.devicePage)
  const dispatch = useDispatch()

  const init = async () => {
    const newState = await fetchDevices(state, deviceService)
    dispatch(updateDevicePageState(newState))
  }

  useEffect(() => {
    init()
    /** eslint-disable-next-line  */
  }, [])

  const onClick = async () => {
    const newState = await searchDevices(state, deviceService, { name: searchWords })
    dispatch(updateDevicePageState(newState))
  }

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWords(e.target.value)
  }, [])

  const tableList = state.devices.map((device) => {
    return [device.model, device.name]
  })

  return (
    <div className={styles['device-view']}>
      <div className={styles['search-form']}>
        <div style={{ width: '30rem' }}>
          <TextInput value={searchWords} onChange={onChange} />
        </div>
        <Button color='blue' variant='secondary' size='medium' onClick={onClick}>
          検索
        </Button>
      </div>
      <div className={styles.list}>
        <Table columnWidthList={[]}>
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderData>デバイス名</TableHeaderData>
              <TableHeaderData>モデル</TableHeaderData>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {tableList.map(([model, name]) => {
              return (
                <TableBodyRow>
                  <TableBodyData>{name}</TableBodyData>
                  <TableBodyData>{model}</TableBodyData>
                </TableBodyRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const DeviceView = React.memo(_DeviceView)
