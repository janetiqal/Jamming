let accessToken;
const clientID = '60afc8ad91854bfca7e18c2a190cbd99'
const redirectId = 'http://localhost:3000'
//https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/
//dont need server side requests, its all done on client side
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])

            //clears the paramaters and allows us to grab a new access token
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectId}`

            window.location = accessURL
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(response => {
                return response.json();
            }).then(response => {
                if (!response.tracks) {
                    return []
                }
                return response.tracks.items.map(track => (
                    {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }))
            })
    },
    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers }).then(response => response.json()).then(response => {
            //saving users id 
            userId = response.id
            //using the id and maing a post request to save the playlist to the users spotify account
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    //NAME IS being passed as a parameter into the function
                    body: JSON.stringify({ name: name })
                }).then(response => response.json()
                ).then(response => {
                    const playlistId = response.id
                    //tailing this request w a post request that adds tracks to the playlist
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                        {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        })
                })
        })
    }
    
};


export default Spotify;