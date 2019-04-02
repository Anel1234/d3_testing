var margin, width, height;
var data;
var svg;
var x, y;
var users = [];
var gameWeek = -1;

window.onload = () => {


    /*

    margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select(".chart").append("svg")
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

            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function (d) {
                    return d.sales;
                })
                .attr("class", "chartLabel")
                .attr("text-anchor", "middle")
                .attr("x", function (d, i) {
                    return x(d.salesperson) + x.bandwidth() / 2;
                })
                .attr("y", function (d) {
                    return y(d.sales) - 10;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black");

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

        */

}

updateChartRepeat = () => {
    setInterval(() => {
        randomlyAddToData();
        slideBars();
    }, 2000);
}

randomlyAddToData = () => {
    data.forEach(d => {
        d.sales += randomIntFromInterval(0, 5);
    });
}


updateChart = () => {

    data = randomiseData(data);
    data = reorderData(data);

    // var x = d3.scaleBand()
    //     .range([0, width])
    //     .padding(0.1);
    // var y = d3.scaleLinear()
    //     .range([height, 0]);

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
        // .attr("x", width)
        .attr("x", (d) => {
            return x(d.salesperson)
        })
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

    var bars = d3.select("svg").select("g").selectAll("text")
        .data(data);

    bars.enter()

        .append("text")
        .text(function (d) {
            return d.sales;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.salesperson) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.sales) - 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .merge(bars)
        .transition().duration(2000)
        .text(function (d) {
            return d.sales;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.salesperson) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.sales) - 10;
        })


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
    data.sort((a, b) => {
        return b.sales - a.sales;
    })
    return data;
}

randomName = () => {
    return Math.random().toString(36).substr(2, 5);
}

slideBars = () => {

    //data = randomiseData(data);
    data = reorderData(data);

    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    x.domain(data.map((d) => {
        return d.salesperson
    }))

    y.domain([0, d3.max(data, function (d) {
        return d.sales;
    })]);

    svg.selectAll("rect")
        .transition()
        .duration(2000)
        .attr("x", (d) => {
            return x(d.salesperson);
        })
        .attr("y", (d) => {
            return y(d.sales);
        })
        .attr("height", function (d) {
            return height - y(d.sales);
        })
        .attr("fill", (d) => {
            return getColor(1 - d.sales / 100);
        });

    svg.selectAll(".chartLabel")
        .transition().duration(2000)
        .text(function (d) {
            return d.sales;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.salesperson) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.sales) - 10;
        })


    d3.select(".xAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisBottom(x));

    console.table(data);

}

loadData = () => {
    d3.json("pl.json")
        .then(data => {
            console.log(data);
        });

}

plData = () => {

    let league = 494638;

    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = `https://fantasy.premierleague.com/drf/leagues-classic-standings/${league}`;

    $.ajax({
        url: proxyurl + url,
        type: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        success: function (data) {
            console.log(data);
            data.standings.results.forEach((user) => {
                // users.push(user.entry);
                $.ajax({
                    url: `${proxyurl}https://fantasy.premierleague.com/drf/entry/${user.entry}/history`,
                    type: "GET",
                    success: (userData) => {
                        let person = {
                            "entry_id": user.entry,
                            "total_pts": []
                        };
                        userData.history.forEach((week) => {
                            person.total_pts.push(week.total_points)
                        })
                        users.push(person);
                    }
                })
            })
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$(document).ajaxStop(() => {
    console.log(users);
    createChartPL(users);
});

createChartPL = (users) => {

    users = reorderPL();

    margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    y = d3.scaleLinear()
        .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // d3.select(".chart").append("div")
    // .html(
    //     "<div class='navigationDiv' ><button class='navigateButton' onclick=''>|<</button> <button class='navigateButton' onclick=''><<</button><button class='navigateButton' onclick=''>></button><button class='navigateButton' onclick=''>>></button><button class='navigateButton' onclick=''>>|</button></div>"
    // )

    x.domain(users.map(function (d) {
        return d.entry_id;
    }));
    y.domain([0, d3.max(users, function (d) {
        return d.total_pts[0];
    })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(users)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.entry_id);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            return y(0);
        })
        .attr("height", function (d) {
            return height - y(0);
        })
        .attr("fill", (d) => {
            return getRandomColor();
        });
    // .attr("fill", (d) => {
    //     return getColor(1 - d.total_pts[gameWeek] / 100);
    // });

    svg.selectAll("text")
        .data(users)
        .enter()
        .append("text")
        .text(function (d) {
            return 0;
        })
        .attr("class", "chartLabel")
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.entry_id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(0) - 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");

    //add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "xAxis")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

}

reorderPL = () => {
    users.sort((a, b) => {
        return b.total_pts[gameWeek] - a.total_pts[gameWeek];
    })
    return users;

}

updateChartPL = () => {

    // gameWeek++;

    users = reorderPL();

    x.domain(users.map(function (d) {
        return d.entry_id;
    }));
    y.domain([0, d3.max(users, function (d) {
        return d.total_pts[gameWeek];
    })]);

    svg.selectAll("rect")
        .transition()
        .duration(2000)
        .attr("x", (d) => {
            return x(d.entry_id);
        })
        .attr("y", (d) => {
            return y(d.total_pts[gameWeek]);
        })
        .attr("height", function (d) {
            return height - y(d.total_pts[gameWeek]);
        })
    // .attr("fill", (d) => {
    //     return getColor(1 - d.total_pts[gameWeek] / 100);
    // });

    svg.selectAll(".chartLabel")
        .transition().duration(2000)
        .text(function (d) {
            return d.total_pts[gameWeek];
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.entry_id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.total_pts[gameWeek]) - 10;
        })


    d3.select(".xAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisBottom(x));


    d3.select(".yAxis")
        .transition().duration(2000)
        .call(d3.axisLeft(y));
}

goToFirst = () => {
    gameWeek = 0;
    updateChartPL()
};

goBackOne = () => {
    if (gameWeek > 0) {
        gameWeek--;
        updateChartPL();
    }
};

play = () => {
    setInterval(() => {
        gameWeek++;
        updateChartPL()
    }, 2000)
};

goForwardOne = () => {
    gameWeek++;
    updateChartPL();
};

goToLast = () => {
    gameWeek = users[0].total_pts.length - 1;
    updateChartPL();
};