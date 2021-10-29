

let accessToken;
const clientID = process.env.clientId;
const redirectId = 'http://localhost3000/'
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
            }).then(response=>{
                if(!response.tracks){
                    return []
                }
                return response.tracks.items.map(track=>(
                    {
                        id:track.id,
                        name:track.name,
                        artist: track.artist[0].name,
                        album:track.album.name,
                        uri:track.uri

                        
                    }))
            })
    }
}


export default Spotify;