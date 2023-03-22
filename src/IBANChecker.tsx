import React, { useState, ChangeEvent, FC } from 'react';

type IBAN = string;
type History = { iban: IBAN; result: boolean };

const IBAN_LENGTH = 22;
const COUNTRY_CODE = 'ME';

function calculateRemainder(iban: IBAN): number {
  if (iban.length > 9) {
    const firstNine = iban.substring(0, 9);

    const division = +firstNine % 97;

    return calculateRemainder(iban.replace(firstNine, `${division}`));
  } else {
    return +iban % 97;
  }
}

const validateIBAN = (iban: IBAN): boolean => {
  if (iban.length !== IBAN_LENGTH || iban.slice(0, 2) !== COUNTRY_CODE) {
    return false;
  }

  // Remove non-alphanumeric characters from the IBAN string
  const stripped = iban.replace(/[^a-zA-Z0-9]/g, '');

  // Move the country code and checksum to the end of the string
  const moved = stripped.substring(4) + stripped.substring(0, 4);

  // Convert letters to numbers, according to the IBAN specification
  const converted = moved
    .split('')
    .map(char => {
      if (char.match(/[A-Za-z]/)) {
        return char.toUpperCase().charCodeAt(0) - 55;
      } else {
        return char;
      }
    })
    .join('');

  return calculateRemainder(converted) === 1;
};

export const IBANChecker: FC = () => {
  const [iban, setIBAN] = useState('');
  const [checkHistory, setCheckHistory] = useState<History[]>([]);

  const handleIBANChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIBAN(event.target.value);
  };

  const handleCheckIBAN = () => {
    const isIBANIsValid = validateIBAN(iban);

    setCheckHistory([...checkHistory, { iban, result: isIBANIsValid }]);
  };

  return (
    <div>
      <input type={'text'} value={iban} onChange={handleIBANChange} />
      <button onClick={handleCheckIBAN}>Check</button>
      <ul>
        {checkHistory.map(({ iban, result }, index) => (
          <li key={index}>
            {iban}: {result ? 'Valid' : 'Invalid'}
          </li>
        ))}
      </ul>
    </div>
  );
};
