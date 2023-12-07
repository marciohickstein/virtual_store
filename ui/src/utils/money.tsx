export function formatMoney(amount: string) {
    if (typeof amount !== 'string') {
        throw new Error('Invalid input. Please provide a valid number.');
    }

    let value;

    try {
        value = parseFloat(amount);    
    } catch (error) {
        throw new Error('Invalid input. Please provide a valid number.');
    }

    // Format the number as currency with two decimal places
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // You can change the currency code as needed
        minimumFractionDigits: 2,
    }).format(value);

    return formattedAmount;
}

