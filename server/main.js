var SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');

const axios = require('axios');

const path = require('path');
const app = express();

let token = null;
let refresh = null;
let expires = null;

app.get('/', async (req, res) => {
    if (! token) {
        res.redirect('https://accounts.spotify.com/authorize?client_id=c8c47738b8b84cb3b2b7be4fc759ebf7&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email%20playlist-modify-public&state=34fFs29kd09');
    } else {
        res.redirect(`http://localhost:8080?token=${encodeURIComponent(token)}&expires=${encodeURIComponent(expires)}`);
    }
});

app.use(express.static(path.join(__dirname, './../app/dist')));

app.all('/auth', (req, res) => res.send(req.body));

app.get('/refresh', async (req, res) => {
    out = await auth(refresh, true);

    res.json(out);
})


const getExpiresEpoch = (exp) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + exp);
    return Math.floor(time.getTime() / 1000);
}

const auth = async (code, doRefresh = false) => {
    const params = new URLSearchParams()

    if (doRefresh) {
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', code);
    } else {
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'http://localhost:3000/callback');
    }

    //get a token
    const out = await axios.post('https://accounts.spotify.com/api/token', params, {
        auth: {
            username: 'c8c47738b8b84cb3b2b7be4fc759ebf7',
            password: '7687dc7a68124101be3d6959a56f522a'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    console.log('done!');
    token = out.data.access_token;

    console.log('token be set to');
    console.log(token);

    if (! doRefresh) {
        refresh = out.data['refresh_token'];
    }

    expires = out.data['expires_in'];

    console.log(`refresh = ${refresh}`);
    console.log(out.data);

    return {
        token,
        refresh,
        expires: getExpiresEpoch(expires)
    }
}


app.all('/callback', async (req, res) => {
	const code = req.query.code;
    const out = await auth(code);

    //redirect to root & set api token for frontend
    // res.redirect(`/?token=` + encodeURIComponent(token));
    // res.cookie('token', token);
    // res.cookie('expires', expires);
    res.redirect(`http://localhost:8080?token=${encodeURIComponent(token)}&expires=${getExpiresEpoch(expires)}`);
});

app.listen(3000, () => console.log('listening on 3000'));

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'c8c47738b8b84cb3b2b7be4fc759ebf7',
  clientSecret: '7687dc7a68124101be3d6959a56f522a',
  redirectUri: 'http://localhost:3000/callback'

});
