import axios from 'axios';

async function fetchMessages(userInfo, token) {
    try {
        const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userInfo.email}/messages?q=from:enviodigital@bancochile.cl`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const messages = response.data.messages;
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