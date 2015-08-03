google.load('visualization', '1.0', {'packages':['corechart']});
$(function(){

		// Loads Google Visualization Library
	$('#find').on('click',function(){
		ticker = $('#ticker').val();
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22" + ticker + "%22%20and%20startDate%20%3D%20%22" + start_date + "%20%22%20and%20endDate%20%3D%20%22" + end_date + "%20%22&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback="
			$.getJSON(url,function(data){
				jsondata = data;

				drawChart(ticker,start_date,end_date)
	});
	});

	$('input[name="daterange"]').daterangepicker(
			{ locale: { format: 'YYYY-MM-DD' },
				startDate: '2013-01-01', endDate: '2013-12-31' }, 
				function(start, end, label) {
					alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
				});

});

var processingData = function(){
	var quotes = jsondata.query.results.quote;
	var result = []
	for (var i = 0; i < quotes.length; i ++ ){
		result.push([new Date(quotes[i].Date),parseFloat(quotes[i].Close).toFixed(2)]);
	};
return result;
}

var drawChart = function(ticker,start_date,end_date){
			///Draw Chart Right Here
				var data = processingData();
				data.unshift([{label: 'Date',id: 'date',type: 'date'},{label: ticker,id: 'price',type: "number"}]);
			var googleData = new google.visualization.arrayToDataTable(data,false);
			var options = {
					title:ticker + '      ' +   start_date + '  -  ' + end_date,
					lineWidth: 3,
				width: 1200,
				height: 600,
				animation:{
					startup: true,
					duration: 3000,
					easing:'linear'
				}
			};
			var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
			chart.draw(googleData, options);

};
