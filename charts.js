//Configurações e leitura de API
var vals = 0;
var mes = '';
var arrayDados = [];
var arrayMes = [];
var arrayDebitos = [];
function axiosD(){
  axios.get('https://flowertech.herokuapp.com/v1/dados')
    .then(response => criaListaDinamica(response.data))
    .catch(error => console.log(error))
}
axiosD();
const criaListaDinamica = (dados) => {
  dados.map(x => {
    arrayDados.push(x.salario)
    arrayMes.push(x.mes)
    arrayDebitos.push(x.debito)
    console.log('All be function 2');
  })
}


var arrayId = [];
var arrayNome = [];
var arrayValor = [];
var arrayMesP = [];
var arrayAno = [];
function axiosP(){
  axios.get('https://flowertech.herokuapp.com/priori')
    .then(response => criaListaPriori(response.data))
    .catch(error => console.log(error))
}
const criaListaPriori = (dados) => {
  dados.map(x => {
      arrayId.push(x.id)
      arrayNome.push(x.priori)
      arrayValor.push(x.valor)
      arrayMesP.push(x.mes)
      arrayAno.push(x.ano)
      console.log('All be function 2');
  })
}
axiosP();



google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChartArea);


google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);


function drawChartArea() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Element');
  data.addColumn('number', 'Salário');
  data.addColumn('number', 'Gastos');
  for (i = 0; i < arrayDados.length; i++) {
    data.addRows([
      [arrayMes[i], arrayDados[i], arrayDebitos[i]],
    ]);
  }
  var options = {
    title: 'Salário x Gastos', titleTextStyle: { color: '#212529' },
    hAxis: { title: 'Mês', titleTextStyle: { color: '#212529' } },
    vAxis: { title: 'Salário', titleTextStyle: { color: '#212529' } },
    legend: { position: 'top', }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}


function drawChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Element');
  data.addColumn('number', 'Percentage');
  for (i = 0; i < arrayDados.length; i++) {
    data.addRows([
      [arrayMes[i], arrayDados[i]],
    ]);
  }

  var options = {
    title: 'Porcentágem do salário',
    is3D: true,
  };

  // Instantiate and draw the chart.
  var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
  chart.draw(data, options);
}


function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Nome');
  data.addColumn('number', 'Valor');
  data.addColumn('string', 'Mês');
  data.addColumn('number', 'Ano');
  for (i = 0; i < arrayId.length; i++) {
    data.addRows([
      [arrayNome[i], { v: 1000, f: `R$ ${arrayValor[i]}` }, arrayMesP[i], { v: 10000, f: `${arrayAno[i]}` }],
    ]);
  }
  var cssClassNames = {
    'headerRow': 'hdcell',
    'tableRow': 'tbrow', //
    'oddTableRow': 'tbrow', //
    'selectedTableRow': 'tbrow', //
    'hoverTableRow': 'tbrow', //
    'headerCell': 'none-border', //
    'tableCell': 'tbcell', //
    'rowNumberCell': 'underline-blue-font'};
  var options = {allowHtml: true,showRowNumber: true, width: '100%', height: '100%', 'cssClassNames': cssClassNames};
  var table = new google.visualization.Table(document.getElementById('myTable'));

  table.draw(data, options);

  google.visualization.events.addListener(table, 'select', function() {
    var row = table.getSelection()[0].row;
    alert('Você selecionou ' + data.getValue(row, 0));
  });  
}