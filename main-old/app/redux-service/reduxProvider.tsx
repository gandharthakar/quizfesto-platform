'use client';

import store from './store';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode
    // any props that come into the component
}

const RedProv = ({ children }:Props) => {
    return <Provider store={store}>{children}</Provider>
}

export default RedProv;