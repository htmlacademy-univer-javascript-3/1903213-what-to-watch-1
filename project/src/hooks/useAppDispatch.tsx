import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../types/IState';

export const useAppDispatch = () => useDispatch<AppDispatch>();
