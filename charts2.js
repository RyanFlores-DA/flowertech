//Configurações e leitura de API
var vals = 0;
var mes = '';
var arrayDados = [];
var arrayMes = [];
var arrayDebitos = [];
axios.get('https://flowertech.herokuapp.com/chart/')
    .then(response => criaListaDinamica(response.data))
    .catch(error => console.log(error))
const criaListaDinamica = (dados) => {
    dados.map(x => {
        arrayDados.push(x.salario)
        arrayMes.push(x.mes)
        arrayDebitos.push(x.valor)
        console.log('All be function 2');
    })
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
      
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartArea);

      function drawChartArea() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Element');
        data.addColumn('number', 'Salário');
        data.addColumn('number', 'Gastos');
        for(i=0; i<arrayDados.length; i++){
          data.addRows([
              [arrayMes[i], arrayDados[i], arrayDebitos[i]],
          ]);
        }
        var options = {
          title: 'Comparação de gastos',
          hAxis: {title: 'Mês',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'Salário',  titleTextStyle: {color: '#333'} ,minValue: 0},
          legend: 'none'
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }


      function drawChart() {
        // Define the chart to be drawn.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Element');
        data.addColumn('number', 'Percentage');
        for(i=0; i<arrayDados.length; i++){
            data.addRows([
                [arrayMes[i], arrayDados[i]],
            ]);
        }
    
        // Instantiate and draw the chart.
        var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
        chart.draw(data, null);
    }