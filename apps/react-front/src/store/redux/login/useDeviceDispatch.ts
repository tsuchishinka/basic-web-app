import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const useLoginDispatch: () => ThunkDispatch<RootState, undefined, AnyAction> = useDispatch
