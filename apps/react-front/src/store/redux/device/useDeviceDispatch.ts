import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { DevicePageState } from '../../state/devicePageState'

export const useDeviceDispatch: () => ThunkDispatch<DevicePageState, undefined, AnyAction> =
  useDispatch
