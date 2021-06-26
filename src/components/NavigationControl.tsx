import React, { ReactElement } from 'react';
import { ItemProps } from '../types/types';

// @ts-ignore
import { Block } from 'vcc-ui';

export type Props = {
    fnc: (number: number) => void;
};

const NavigationControl = ({fnc}: Props): ReactElement => {
    return (
        <div className="navigation-controls">
            <button onClick={() => fnc(0)}><i className="icon icon-nav-chevron rotate-180">&nbsp;</i></button>
            <button onClick={() => fnc(1)}><i className="icon icon-nav-chevron">&nbsp;</i></button>
        </div>
    );
}

export default NavigationControl;