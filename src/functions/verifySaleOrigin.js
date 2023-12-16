function verifySaleOrigin(inputString){
    // Define regular expressions for date and cost patterns
    const datePattern = /\d{2}\/\d{2}\/\d{2}/;
    const costPattern = /\$\d+(\.\d{3})*(\,\d{2})?/;

    // Extract date and cost using regular expressions
    const dateMatch = inputString.match(datePattern);
    const costMatch = inputString.match(costPattern);

    // Check if there is something between the patterns
    const hasSomethingBetween = dateMatch && costMatch && dateMatch.index < costMatch.index;

    // If something is between the patterns, add "found it!" between them
    let resultString = inputString;
    if (hasSomethingBetween) {
        const somethingBetween = inputString.substring(dateMatch.index + dateMatch[0].length, costMatch.index);
        const somethingBetweenConcatenated = ' ' + somethingBetween.replace(/\s/g, '') + ' ';
        
        resultString = resultString.replace(somethingBetween, somethingBetweenConcatenated);
    }
    // concatenate everything after the cost
    resultString = resultString.split(/\s+/)

    return resultString
}

export default verifySaleOrigin