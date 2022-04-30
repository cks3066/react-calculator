import React from 'react';
import Operator from '../elements/Operator';
import { OPERATORS } from '../constants';

export default function Operators({ onClickOperator }) {
  return (
    <div className="operations subgrid">
      {OPERATORS.map((operator, index) => (
        <Operator
          onClickOperator={onClickOperator}
          operator={operator}
          key={index}
        />
      ))}
    </div>
  );
}
