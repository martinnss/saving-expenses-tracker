function convertCurrencyStringToInt(currencyString) {
    // Remove the dollar sign and commas
    const stringWithoutCurrency = currencyString.replace(/[$.]/g, '');

    // Parse the string to an integer
    const resultInteger = parseInt(stringWithoutCurrency);
  
    return resultInteger;
  }

export default convertCurrencyStringToInt