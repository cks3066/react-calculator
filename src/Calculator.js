import React, { useState, useEffect, useCallback } from 'react';
import Button from './elements/Button';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { isOverMaxLength } from './validator';
import { add, sub, mul, div } from './utils/operations';
import { ERROR_MESSAGE } from './constants';

export default function Calculator() {
  const [screenNumber, setScreenNumber] = useState(0);
  const [recordNumber, setRecordNumber] = useState(0);
  const [isNumberStep, setIsNumberStep] = useState(true);
  const [operator, setOperator] = useState('');

  const onClickButton = () => {
    setScreenNumber(0);
    setRecordNumber(0);
  };

  const initializeCalculator = () => {
    setIsNumberStep(false);
    setRecordNumber(0);
    setOperator('');
  };

  const onClickOperator = (clickedOperator) => {
    if (clickedOperator !== '=') {
      if (isNumberStep && recordNumber !== 0) {
        alert(ERROR_MESSAGE.OVER_INPUT_NUMBER_COUNT);
        return;
      }
      setIsNumberStep(false);
      setRecordNumber(screenNumber);
      setOperator(clickedOperator);
      return;
    }

    // '=' 이 눌린 경우
    initializeCalculator();

    switch (operator) {
      case '+':
        setScreenNumber(add(recordNumber, screenNumber));
        break;
      case '-':
        setScreenNumber(sub(recordNumber, screenNumber));
        break;
      case 'X':
        setScreenNumber(mul(recordNumber, screenNumber));
        break;
      case '/':
        if (screenNumber === 0) {
          setScreenNumber(ERROR_MESSAGE.INFINITE_NUMBER);
          return;
        }
        setScreenNumber(div(recordNumber, screenNumber));
        break;
      default:
        break;
    }
  };
  const handleBeforeUnload = useCallback((e) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const addBeforeUnloadEvent = useCallback(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const removeBeforeUnloadEvent = useCallback(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const onClickDigit = (enteredDigit) => {
    if (!isNumberStep) {
      setScreenNumber(enteredDigit);
      setIsNumberStep(true);
      return;
    }
    const prevNumber = screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      setScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  useEffect(() => {
    const storedNumber = Number(localStorage.getItem('calculator-data'));
    setScreenNumber(storedNumber);
  }, []);

  useEffect(() => {
    if (screenNumber === 0) {
      localStorage.setItem('calculator-data', JSON.stringify(0));
      removeBeforeUnloadEvent();
      return;
    }
    localStorage.setItem('calculator-data', JSON.stringify(screenNumber));
    addBeforeUnloadEvent();
  }, [screenNumber, addBeforeUnloadEvent, removeBeforeUnloadEvent]);

  return (
    <div className="calculator">
      <Screen screenNumber={screenNumber} />
      <Digits onClickDigit={onClickDigit} />
      <Operators
        isNumberStep={isNumberStep}
        recordNumber={recordNumber}
        onClickOperator={onClickOperator}
      />
      <Button onClickButton={onClickButton} buttonContent="AC" />
    </div>
  );
}
