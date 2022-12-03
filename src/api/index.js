const FEEDS_URL = "http://172.29.1.1:5000/"
const ARQUIVOS_URL = "http://172.29.1.3/"


export const acessarUrl = async (url) => {
    let promisse = null;


    try {
        resposta = await fetch(url, { method: "GET" });

        if(resposta.ok){
            console.log(resposta)
            promisse = Promise.resolve(resposta.json())
        } else {
            promisse = Promise.reject(resposta);
        }
    } catch(erro) {
        promisse = Promise.reject(erro);
    }

    return promisse;
}

export const getFeeds = async (pagina) => {
    return acessarUrl(FEEDS_URL + "feeds/" + pagina);
}

export const getFeed = async (feedId) => {
    return acessarUrl(FEEDS_URL + "feed/" + feedId);
}

export const getImagem = (imagem) => {
    return { uri: ARQUIVOS_URL + imagem };
}
