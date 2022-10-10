//Configurações e leitura de API
var vals = 0;
var mes = '';
var arrayId = [];
var arrayNome = [];
var arrayValor = [];
var arrayMes = [];
var arrayAno = [];
axios.get('http://flowertech.herokuapp.com/priori/')
    .then(response => criaListaDinamica(response.data))
    .catch(error => console.log(error))
const criaListaDinamica = (dados) => {
    dados.map(x => {
        arrayId.push(x.id)
        arrayNome.push(x.priori)
        arrayValor.push(x.valor)
        arrayMes.push(x.mes)
        arrayAno.push(x.ano)
        console.log('All be function 2');
    })
}

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Nome');
  data.addColumn('number', 'Valor');
  data.addColumn('string', 'Mês');
  data.addColumn('number', 'Ano');
  for(i=0; i<arrayId.length; i++){
  data.addRows([
    [arrayNome[i],  {v: 1000, f: `R$ ${arrayValor[i]}`}, arrayMes[i], {v: 10000, f: `${arrayAno[i]}`}],
  ]);
}
  var table = new google.visualization.Table(document.getElementById('myTable'));

  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}