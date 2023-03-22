export type IBAN = string;
export type History = { iban: IBAN; result: boolean };

const IBAN_LENGTH = 22;
const COUNTRY_CODE = 'ME';

const calculateRemainder = (iban: IBAN): number => {
  if (iban.length > 9) {
    const firstNine = iban.substring(0, 9);

    const division = +firstNine % 97;

    return calculateRemainder(iban.replace(firstNine, `${division}`));
  } else {
    return +iban % 97;
  }
};

export const validateIBAN = (iban: IBAN): boolean => {
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
