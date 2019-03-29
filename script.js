console.log("test");

var margin, width, height;
var data;

window.onload = () => {

    margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data

    d3.csv("sales.csv")
        .then((_data) => {
            data = _data;

            // format the data
            data.forEach(function (d) {
                d.sales = +d.sales;
            });

            // Scale the range of the data in the domains
            x.domain(data.map(function (d) {
                return d.salesperson;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.sales;
            })]);

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.salesperson);
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.sales);
                })
                .attr("height", function (d) {
                    return height - y(d.sales);
                })
                .attr("fill", (d) => {
                    return getColor(1 - d.sales / 100);
                });

            //add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "xAxis")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
                .attr("class", "yAxis")
                .call(d3.axisLeft(y));
        })
        .catch((error) => {
            throw error;
        })

    // setInterval(() => {
    //     updateChart();
    // }, 2000);

    /*
    d3.csv("sales.csv", function (error, _data) {
        data = _data;
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.sales = +d.sales;
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d.salesperson;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.sales;
        })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.salesperson);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.sales);
            })
            .attr("height", function (d) {
                return height - y(d.sales);
            });

        //add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "xAxis")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(y));

    });
    */

}

// updateChartRepeat = () => {
//     setInterval(() => {
//         updateChart();
//     }, 2000);
// }


updateChart = () => {

    data = randomiseData(data);
    data = reorderData(data);

    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    x.domain(data.map(function (d) {
        return d.salesperson;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.sales;
    })]);

    d3.select(".xAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisBottom(x));

    d3.select(".yAxis")
        .transition().duration(2000)
        .call(d3.axisLeft(y));


    var bars = d3.select("svg").select("g").selectAll("rect")
        .data(data);

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", width)
        .attr("y", function (d) {
            return y(d.sales);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.sales);
        })
        .merge(bars)
        .transition().duration(2000)
        .attr("x", function (d) {
            return x(d.salesperson);
        })
        .attr("y", function (d) {
            return y(d.sales);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.sales);
        })
        .attr("fill", (d) => {
            return getColor(1 - d.sales / 100);
        });
    // .attr("fill", getRandomColor());

    bars.exit()
        .transition().duration(2000)
        .attr("width", 0)
        .attr("x", width)
        .remove()
        // .attr("y", function (d) {
        //     return y(d.sales);
        // })
        // .attr("height", 0)

    // .remove();
    // .remove()


}

swapAxis = () => {

    margin = {
            top: 40,
            right: 30,
            bottom: 20,
            left: 20
        },
        width = 500 - margin.left - margin.right,
        height = 960 - margin.top - margin.bottom;


    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    d3.select(".chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([0, width]);


    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    y.domain(data.map(function (d) {
        return d.salesperson;
    }));
    x.domain([0, d3.max(data, function (d) {
        return d.sales;
    })]);

    d3.select(".xAxis")
        // .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisLeft(y));

    d3.select(".yAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisBottom(x));
}



randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

getColor = value => {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
}

randomiseData = data => {

    data.forEach((person) => {
        person.sales = randomIntFromInterval(0, 100);
    })

    //data.pop();

    // data.splice(randomIntFromInterval(0, data.length), 1);
    // data.splice(randomIntFromInterval(0, data.length), 1);
    // data.splice(randomIntFromInterval(0, data.length), 1);
    // data.splice(randomIntFromInterval(0, data.length), 1);
    // data.splice(randomIntFromInterval(0, data.length), 1);
    // data.splice(randomIntFromInterval(0, data.length), 1);


    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});
    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});
    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});
    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});
    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});
    // data.push({ salesperson: randomName(), sales: randomIntFromInterval(0, 100)});



    return data;
}

reorderData = data => {
    data.sort((a,b) => {
        return b.sales - a.sales;
    })
    return data;
}

randomName = () => {
    return Math.random().toString(36).substr(2, 5);
}