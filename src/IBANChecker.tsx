import React, { useState, ChangeEvent, FC } from 'react';
import { History, validateIBAN } from './helpers/validate';

export const IBANChecker: FC = () => {
  const [iban, setIBAN] = useState('');
  const [checkHistory, setCheckHistory] = useState<History[]>([]);

  const handleIBANChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIBAN(event.target.value);
  };

  const handleCheckIBAN = () => {
    const isIBANValid = validateIBAN(iban);

    setCheckHistory([...checkHistory, { iban, result: isIBANValid }]);
  };

  return (
    <div>
      <input type={'text'} value={iban} onChange={handleIBANChange} />
      <button onClick={handleCheckIBAN}>Check</button>
      <ul>
        {checkHistory.map(({ iban, result }, index) => (
          <li key={index}>{`${iban}: ${result ? 'Valid' : 'Invalid'}`}</li>
        ))}
      </ul>
    </div>
  );
};
