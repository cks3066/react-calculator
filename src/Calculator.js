import React from 'react';
import Button from './elements/Button';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { useCalculator } from './hooks/useCalculator';

export default function Calculator() {
  const {
    screenNumber,
    recordNumber,
    isNumberStep,
    onClickClearButton,
    onClickDigit,
    onClickOperator,
  } = useCalculator();

  return (
    <div className="calculator">
      <Screen screenNumber={screenNumber} />
      <Digits onClickDigit={onClickDigit} />
      <Operators
        isNumberStep={isNumberStep}
        recordNumber={recordNumber}
        onClickOperator={onClickOperator}
      />
      <Button onClickButton={onClickClearButton} buttonContent="AC" />
    </div>
  );
}
