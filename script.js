let apikey = {
    key: 'coloque sua chave aqui'
}

function realizarRequisicao(){
    //GET Fetch Requisition
    fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' +
    apikey.key)
    .then((response) => {
        if(!response.ok) throw new Error('Erro ao executar a requisição, status ' + response.status);
        return response.json();
    })
    .then((api) => {

    var texto = "";
    //console.log(api.data[0]);
    // Get 10 coins and symbols
    document.getElementById("warning").style.display = "none";
    for(let i = 0; i < 10; i++){

        //console.log(api.data[i]);

        let firstHistoricalDate = new Date(api.data[i].first_historical_data)
        let lastHistoricalDate = new Date(api.data[i].last_historical_data)

    texto = texto + `
    
        <div class="media p-2 bg-light-gray col-lg-3 col-md-4 col-sm-6" style="border: 1px solid gray; box-sizing: border-box"  >
            <img src="coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60">
            <div class="media-body">
                <h5 class="mt-2">${api.data[i].name}</h5>
                <p>${api.data[i].symbol}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${i}">
                    Mais informações
                </button>
            </div>
            <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Coin Market Cap</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h3>Name: ${api.data[i].name}</h3>
                            <h5>Rank: ${api.data[i].rank}</h5>
                            <h5>Symbol: ${api.data[i].symbol}</h5>
                            <h5>First historical data: ${firstHistoricalDate.toLocaleDateString()}</h5>
                            <h5>Last historical data: ${lastHistoricalDate.toLocaleDateString()}</h5>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;

        document.getElementById("coins").innerHTML = texto;
        
    }
    })
    .catch((error) => {
    console.error(error.message);
    });

}

function addKey(){
    let input = document.getElementById("input");
    if (input.value != ""){
        apikey.key = input.value;
        realizarRequisicao();
    }
}