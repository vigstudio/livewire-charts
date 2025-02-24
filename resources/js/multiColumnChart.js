
const multiColumnChart = () => {
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

            const title = component.get('columnChartModel.title')
            const stacked = component.get('columnChartModel.isStacked');
            const animated = component.get('columnChartModel.animated');
            const onColumnClickEventName = component.get('columnChartModel.onColumnClickEventName');
            const dataLabels = component.get('columnChartModel.dataLabels');
            const sparkline = component.get('columnChartModel.sparkline');
            const legend = component.get('columnChartModel.legend')
            const grid = component.get('columnChartModel.grid');
            const columnWidth = component.get('columnChartModel.columnWidth');
            const horizontal = component.get('columnChartModel.horizontal');
            const config = component.get('columnChartModel.config');
            const format_x = component.get('columnChartModel.format-x');
            const format_y = component.get('columnChartModel.format-y');
            const format_lable = component.get('columnChartModel.format-lable');

            const data = component.get('columnChartModel.data');
            const series = Object.keys(data)
                .map(seriesName => ({
                    name: seriesName,
                    data: data[seriesName].map(item => item.value)
                }))

            const categories = component.get('columnChartModel.xAxis.categories').length > 0
                ? component.get('columnChartModel.xAxis.categories')
                : data[series[0].name].map(item => item.title)
                ;

            const options = {
                series: series,

                chart: {
                    fontFamily: config.font_family,
                    type: 'bar',
                    height: '100%',
                    stacked: stacked,

                    ...sparkline,

                    toolbar: {show: false},

                    animations: {enabled: animated},

                    events: {
                        dataPointSelection: function (event, chartContext, {seriesIndex, dataPointIndex}) {
                            if (!onColumnClickEventName) {
                                return
                            }

                            const column = data[series[seriesIndex].name][dataPointIndex]
                            component.call('onColumnClick', column)
                        },
                    }
                },

                legend: legend,

                grid: grid,

                plotOptions: {
                    bar: {
                        horizontal: horizontal,
                        columnWidth: `${columnWidth}%`,
                    },
                },

                dataLabels: dataLabels,

                xaxis: {
                    categories: categories,
                },

                yaxis: {
                    title: {
                        text: title,
                    }
                },

                fill: {
                    opacity: component.get('columnChartModel.opacity'),
                },
                tooltip: {
                    y: {
                        formatter: function (value, s) {
                            return component.get('columnChartModel.data')[series[s.seriesIndex].name][s.dataPointIndex].extras.formatted || value;
                        }
                    }
                },

                theme: component.get('columnChartModel.theme') || {},

            };

            const colors = component.get('columnChartModel.colors');

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

export default multiColumnChart
