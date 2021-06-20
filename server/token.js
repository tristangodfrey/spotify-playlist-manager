const axios = require('axios');

axios.get('https://accounts.spotify.com/authorize?client_id=c8c47738b8b84cb3b2b7be4fc759ebf7&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email%20playlist-modify-public&state=34fFs29kd09')
    .then(res => console.log('awesome sauce', res))
    .catch(e => console.log(e))

const code = process.argv[2] || 'AQC3vaq1NrBf4j709hXnVn2twMHGZ0U7AM8jjz7_4JKsCORJmT95aIrNrbjMLPQXEaboIJK1fdKDULbV7F_I0uoUpMnzuMcfPPz9dsfOPUM36FypNJiJYuj1uy83cGMlqCmACxAXJE99z5jL7uQowOmJA6Lzw7c2gouc6tGU3AD0UYcvPfBv1FJnvYp3Y1d1KaJG2_ursJRoQR9pJIDsSGzqdq6tS4rhyiIxFakSaCntjCiZJA9wMYrFkKNwwQ';

const params = new URLSearchParams()

params.append('grant_type', 'authorization_code');
params.append('code', code);
params.append('redirect_uri', 'http://localhost:3000/callback');

const out = axios.post('https://accounts.spotify.com/api/token', params, {
    auth: {
        username: 'c8c47738b8b84cb3b2b7be4fc759ebf7',
        password: '7687dc7a68124101be3d6959a56f522a'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(out => {
    console.log(`API Token: ${out.data.access_token}`);
    console.log(`Refresh Token: ${out.data.refresh_token}`);
}).catch(e => console.log(e));

