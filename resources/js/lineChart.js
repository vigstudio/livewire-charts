
const lineChart = () => {
    return {
        chart: null,

        init() {
            setTimeout(() => {
                this.drawChart(this.$wire)
            }, 0)
        },

        drawChart(component) {
            if (this.chart) {
                this.chart.destroy()
            }

            const title = component.get('lineChartModel.title');
            const animated = component.get('lineChartModel.animated') || false;
            const dataLabels = component.get('lineChartModel.dataLabels') || {};
            const data = component.get('lineChartModel.data');
            const onPointClickEventName = component.get('lineChartModel.onPointClickEventName');
            const sparkline = component.get('lineChartModel.sparkline');
            const config = component.get('lineChartModel.config');
            const format_x = component.get('lineChartModel.format-x');
            const format_y = component.get('lineChartModel.format-y');
            const format_lable = component.get('lineChartModel.format-lable');

            const series = [{
                name: title,
                data: data.map(item => item.value),
            }]

            const categories = component.get('lineChartModel.xAxis.categories').length > 0
                ? component.get('lineChartModel.xAxis.categories')
                : data.map(item => item.title)

            const options = {
                series: series,

                chart: {
                    fontFamily: config.font_family,
                    type: 'line',
                    height: '100%',

                    ...sparkline,

                    zoom: {enabled: false},

                    toolbar: {show: false},

                    animations: {enabled: animated},

                    events: {
                        markerClick: function (event, chartContext, {dataPointIndex}) {
                            if (!onPointClickEventName) {
                                return
                            }

                            const point = data[dataPointIndex]
                            component.call('onPointClick', point)
                        }
                    }
                },

                dataLabels: dataLabels,

                stroke: component.get('lineChartModel.stroke') || {},

                theme: component.get('lineChartModel.theme') || {},

                title: {
                    text: title,
                    align: 'center'
                },

                xaxis: {
                    labels: component.get('lineChartModel.xAxis.labels'),
                    categories: categories,
                },

                yaxis: component.get('lineChartModel.yAxis') || {},

                annotations: {
                    points: component.get('lineChartModel.markers').map(item => {
                        return {
                            x: item.title,
                            y: item.value,
                            marker: {
                                size: 6,
                                fillColor: '#fff',
                                strokeColor: item.strokeColor,
                                radius: 2,
                            },
                            label: {
                                offsetY: 0,
                                style: {
                                    color: item.textColor,
                                    background: item.textBackgroundColor,
                                },
                                text: item.text || '',
                            }
                        }
                    }
                    )
                },

                tooltip: {
                    y: {
                        formatter: function (value, series) {
                            return data[series.dataPointIndex].extras.tooltip || value;
                        }
                    }
                },
            };

            const colors = component.get('lineChartModel.colors');

            if (colors && colors.length > 0) {
                options['colors'] = colors
            }

            if (format_x) {
                options['xaxis']['labels'] = {
                    formatter: function (value) {
                        return number_format(value);
                    }
                }
            }

            if (format_y) {
                options['yaxis']['labels'] = {
                    formatter: function (value) {
                        return number_format(value);
                    }
                }
            }

            if (format_lable) {
                options['dataLabels']['formatter'] = function (value, opts) {
                    return number_format(value);
                }
            }

            this.chart = new ApexCharts(this.$refs.container, options);
            this.chart.render();
        }
    }
}


export default lineChart
