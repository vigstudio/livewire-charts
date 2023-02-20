import ApexCharts from 'apexcharts'
import areaChart from "./areaChart"
import columnChart from "./columnChart"
import multiColumnChart from "./multiColumnChart";
import lineChart from "./lineChart"
import multiLineChart from "./multiLineChart"
import pieChart from "./pieChart"
import radarChart from "./radarChart"
import treeMapChart from "./treeMapChart"

window.ApexCharts = ApexCharts
window.livewireChartsAreaChart = areaChart
window.livewireChartsColumnChart = columnChart
window.livewireChartsLineChart = lineChart
window.livewireChartsMultiLineChart = multiLineChart
window.livewireChartsPieChart = pieChart
window.livewireChartsMultiColumnChart = multiColumnChart
window.livewireChartsRadarChart = radarChart
window.livewireChartsTreeMapChart = treeMapChart

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
