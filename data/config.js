//gifphy key
const getURL = (limit=25, rating='r') => {
    const endpoint = "api.giphy.com/v1/gifs/trending";
    const url = 'https://' + endpoint + '?';
    const apiKey = `deN938U4Ef66YPDtShWaEralFVTOaOlc`;
    const params = {
        api_key : apiKey,
        limit: limit,
        rating: rating
    }

    return url + encodeQueryData(params);
}

const getURLSearch = (query='looser',limit=25,rating='r',offset=0,lang='en') => {
    const endpoint = "api.giphy.com/v1/gifs/search";
    const url = 'https://' + endpoint + '?';
    const apiKey = `deN938U4Ef66YPDtShWaEralFVTOaOlc`;
    const params = {
        api_key : apiKey,
        q:query,
        limit: limit,
        rating: rating,
        offset:offset,
        lang: lang

    }

    return url + encodeQueryData(params);

}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }