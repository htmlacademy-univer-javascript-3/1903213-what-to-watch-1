import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { State } from '../types/IState';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
