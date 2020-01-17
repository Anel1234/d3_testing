var margin, width, height;
var data;
var svg;
var x, y;
var users = [];
var gameWeek = 0;
var currentUser = 0;

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
    //league = 494658;

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
                        // let person = {
                        //     "entry_id": user.entry,
                        //     "total_pts": [],
                        //     "week_pts": []
                        // };
                        // userData.history.forEach((week) => {
                        //     person.total_pts.push(week.total_points);
                        //     person.week_pts.push(week.points);
                        // })
                        // users.push(person);
                        userData.color = getRandomColor();
                        userData.history.unshift({
                            "event": 0,
                            "event_transfers": 0,
                            "points": 0,
                            "total_points": 0,
                            "points_on_bench": 0,
                            "overall_rank": 0,
                            "rank": 0,
                            "value": 1000
                        });
                        users.push(userData);
                        console.log(userData);
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
    createCombobox();
    createChartPL(users);
});

createChartPL = (users) => {

    users = reorderPL();

    margin = {
            top: 20,
            right: 20,
            bottom: 130,
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

        console.log(x);
        console.log(y);

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
        return d.entry.id;
    }));
    y.domain([0, 100]);
    // y.domain([0, d3.max(users, function (d) {
    //     return d.history[0].total_points;
    // })]);

    //tooltip div
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(users)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            console.log(x);
            return x(d.entry.id);
        })
        .attr("width", x.bandwidth())
        .attr("y", function (d) {
            console.log(y);
            return y(0);
        })
        .attr("height", function (d) {
            return height - y(0);
        })
        .attr("fill", (d) => {
            return d.color;
            //return getRandomColor();
        })
        .on("mouseenter", (d) => {
            currentUser = d;
            d3.select(d3.event.target).attr("fill", "#afeeee")
            let rect = d3.event.target.getBoundingClientRect();

            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div.html(`
                <table>
                <tr>
                <td>Points:</td>
                <td>${d.history[gameWeek].points}</td>
                </tr>
                <tr>
                <td>Bench Points:</td>
                <td>${d.history[gameWeek].points_on_bench}</td>
                </tr>
                <tr>
                <td>Transfers:</td>
                <td>${d.history[gameWeek].event_transfers}</td>
                </tr>
                <tr>
                <td>Transfers Cost:</td>
                <td>${d.history[gameWeek].event_transfers_cost}</td>
                </tr>
                <tr>
                <td>Overall Rank:</td>
                <td>${d.history[gameWeek].overall_rank}</td>
                </tr>
            `)
                // replace style if you want tooltip to appear near where you hover
                // .style("left", (d3.event.pageX) + "px")
                // .style("top", (d3.event.pageY - 28) + "px");
                .style("left", rect.left + 0.5 * rect.width + "px")
                .style("top", rect.top + 0.2 * rect.height + "px");
        })
        .on("mouseout", (d) => {
            d3.select(d3.event.target).attr("fill", d.color)
            div.transition()
                .duration(500)
                .style("opacity", 0)
        })
    // .attr("fill", (d) => {
    //     return getColor(1 - d.total_pts[gameWeek] / 100);
    // });

    svg.selectAll("text.chartLabel")
        .data(users)
        .enter()
        .append("text")
        .text(0)
        .attr("class", "chartLabel")
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.entry.id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(0) - 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");

    svg.selectAll("text.wildcard")
        .data(users)
        .enter()
        .append("text")
        .text((d) => {
            d.chips.forEach(chip => {
                if (chip.event == gameWeek) {
                    return chip.name;
                }
            })
            return "";
        })
        .attr("class", "wildcard")
        .attr("x", function (d, i) {
            return x(d.entry.id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(0) - 10;
        })


    //add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "xAxis")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y));

    //makes x Axis labels horizontal
    svg.select(".xAxis").selectAll("g").select("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.5em")
        .attr("transform", "rotate(-90)")
    // .attr("dy", width/2)

}

reorderPL = () => {
    users.sort((a, b) => {
        return b.history[gameWeek].total_points - a.history[gameWeek].total_points;
    })
    return users;
}

updateChartPL = () => {

    // gameWeek++;
    d3.select('.select')
        .property('value', gameWeek);

    users = reorderPL();

    x.domain(users.map(function (d) {
        return d.entry.id;
    }));
    y.domain([d3.min(users, (d) => {
        if (d.history[gameWeek].total_points < 100) {
            return 0;
        }
        return d.history[gameWeek].total_points - 100;
    }), d3.max(users, (d) => {
        if (d.history[gameWeek].total_points == 0) {
            return 100;
        }
        return d.history[gameWeek].total_points;
    })]);

    svg.selectAll("rect")
        .transition()
        .duration(2000)
        .attr("x", (d) => {
            return x(d.entry.id);
        })
        .attr("y", (d) => {
            return y(d.history[gameWeek].total_points);
        })
        .attr("height", function (d) {
            return height - y(d.history[gameWeek].total_points);
        })
    // .attr("fill", (d) => {
    //     return getColor(1 - d.history[gameWeek].total_points / 100);
    // });

    svg.selectAll(".chartLabel")
        .transition().duration(2000)
        .text(function (d) {
            return d.history[gameWeek].total_points;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return x(d.entry.id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.history[gameWeek].total_points) - 10;
        })

    svg.selectAll(".wildcard")
        .text((d) => {
            let chipName = ""
            d.chips.forEach(chip => {
                if (chip.event == gameWeek) {
                    chipName = chip.name;
                }
            })
            return chipName;
        })
        .attr("x", function (d, i) {
            return x(d.entry.id) + x.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return y(d.history[gameWeek].total_points) - 10;
        })

    d3.select(".xAxis")
        .attr("transform", "translate(0," + height + ")")
        .transition().duration(2000)
        .call(d3.axisBottom(x));


    d3.select(".yAxis")
        .transition().duration(2000)
        .call(d3.axisLeft(y));


    //if the tooltip has been assigned then update it with new data
    if (currentUser) {
        d3.select(".tooltip")
            .html(
                `<table>
            <tr>
            <td>Points:</td>
            <td>${currentUser.history[gameWeek].points}</td>
            </tr>
            <tr>
            <td>Bench Points:</td>
            <td>${currentUser.history[gameWeek].points_on_bench}</td>
            </tr>
            <tr>
            <td>Transfers:</td>
            <td>${currentUser.history[gameWeek].event_transfers}</td>
            </tr>
            <tr>
            <td>Transfers Cost:</td>
            <td>-${currentUser.history[gameWeek].event_transfers_cost}</td>
            </tr>
            <tr>
            <td>Overall Rank:</td>
            <td>${currentUser.history[gameWeek].overall_rank}</td>
            </tr>`
            )
    }



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
    let playSeason = setInterval(() => {
        if (gameWeek < users[0].history.length - 1) {
            gameWeek++;
            updateChartPL()
        } else {
            clearInterval(playSeason);
        }
    }, 2000)
};

goForwardOne = () => {
    if (gameWeek < users[0].history.length - 1) {
        gameWeek++;
        updateChartPL();
    }
};

goToLast = () => {
    gameWeek = users[0].history.length - 1;
    updateChartPL();
};

createCombobox = () => {

    let select = d3.select(".selectDiv")
        .append('select')
        .attr('class', 'select')
        .on('change', selectChange)

    select.selectAll('option')
        .data(users[0].history).enter()
        .append('option')
        .text((d) => {
            return d.event;
        })
}

selectChange = () => {
    gameWeek = d3.select('select').property('value');
    updateChartPL()
}