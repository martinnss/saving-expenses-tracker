import axios from 'axios';

async function fetchMessages(userInfo, token) {
    try {
        const today = new Date();
        const fromDate = new Date(today);
        fromDate.setDate(today.getDate() - 60); // Resta 60 días a la fecha actual
    
        // Formatea las fechas en el formato YYYY-MM-DD para usarlas en la URL
        const formattedToday = today.toISOString().split('T')[0];
        const formattedFromDate = fromDate.toISOString().split('T')[0];
    
        const senders = ['enviodigital@bancochile.cl']      /////////////////////////// agregar emails de bancos

        const fromFilter = senders.map(sender => `from:${sender}`).join('|');

        const url = `https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages?q=${fromFilter} after:${formattedFromDate} before:${formattedToday}`;


        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const messages = response.data.messages;
        console.log(response)
        const nextPageToken = response.data.nextPageToken;

        return { messages, nextPageToken };
    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching messages:', error.message);
        throw error; // Re-throw the error for further handling
    }
}

async function getAllMessages(userInfo, token) {
    let allMessages = [];
    let nextPageToken = '';

    for (let i = 0; i < 3; i++) {
        try {
            const { messages, nextPageToken: nextToken } = await fetchMessages(userInfo, token);
            allMessages = allMessages.concat(messages);

            // Break the loop if there are no more pages
            if (!nextToken) {
                break;
            }

            nextPageToken = nextToken;
        } catch (error) {
            // Handle errors during the iteration
            console.error('Error during iteration:', error.message);
            // You might want to implement additional error handling or logging here
            break; // Break the loop in case of an error
        }
    }

    return allMessages;
}


export default getAllMessages