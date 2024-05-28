import axios from 'axios';
const API_BASE_URL = 'https://api.elections.org.za';
async function getAccessToken(): Promise<string> {
    const response = await axios.post(
        `${API_BASE_URL}/token`,
        new URLSearchParams({
            grant_type: 'password',
            username: process.env.REACT_APP_IEC_API_USERNAME!,
            password: process.env.REACT_APP_IEC_API_PASSWORD!,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    const accessToken = response.data.access_token;
    return accessToken;

}

async function fetchData(endpoint: string, token: string) {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
    return response.data;
};
export { getAccessToken, fetchData };
