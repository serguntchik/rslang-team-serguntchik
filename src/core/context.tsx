import React from 'react';
import { IContextValue } from '../utils/alias';

export const MyContext = React.createContext<IContextValue>({ currentUser: null });
