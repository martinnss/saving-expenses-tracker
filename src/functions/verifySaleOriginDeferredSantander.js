function verifySaleOriginDeferredSantander(inputString){
    // Define regular expressions for date and cost patterns
    const datePattern = /\d{2}\/\d{2}\/\d{2}/;
    const costPattern = /\$\d+(\.\d{3})*(\,\d{2})?/;

    // Extract date and cost using regular expressions
    const dateMatch = inputString.match(datePattern);
    const costMatch = inputString.match(costPattern);



    let resultString = inputString;

    // concatenate everything after the cost
    const wordsArray = resultString.split(/\s+/);

    // Find the index of the last element containing '$'
    const lastIndexOfDollar = wordsArray.lastIndexOf(wordsArray.find(element => element.includes('$')));

    // Concatenate the strings after the last element with '$'
    const result = wordsArray.slice(0, lastIndexOfDollar + 1).concat(wordsArray.slice(lastIndexOfDollar + 1).join(' '));

    // Access the fourth element
    const fourthElement = result[3];

    // Extract the required parts
    const [part1, price, part3] = fourthElement.split(/\$([^\s]+)/);

    const splitResult = part3.split(' ');

    const firstPart = splitResult[1];
    const secondPart = splitResult.slice(2).join(' ');
    
    const unifiedList = [part1,price, firstPart, secondPart]

    const resultList = result.slice(0,3).concat(unifiedList)

    return resultList
}

export default verifySaleOriginDeferredSantander