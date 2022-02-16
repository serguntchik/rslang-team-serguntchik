import React from 'react';
import { IGetCurrentUser } from '../utils/alias';

export const MyContext = React.createContext<IGetCurrentUser | null>(null);
