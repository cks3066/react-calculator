import React from 'react';

export default function Button({ onClickButton, buttonContent }) {
  return (
    <div className="modifiers subgrid">
      <button className="modifier" onClick={onClickButton}>
        {buttonContent}
      </button>
    </div>
  );
}
