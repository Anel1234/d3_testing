let data3 = $.getJSON("./sortedUTMS2.json", data => {})

let year = 2016;
let month = 1;

window.onload = () => {
  var width = 450
  height = 450
  margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")


  svg.append("g")
    .attr("class", "labels");
  svg.append("g")
    .attr("class", "lines");

  // svg.append("g")
  //   .attr("class", "labels");
  // svg.append("g")
  //   .attr("class", "lines");

  // create 2 data_set
  var data1 = {
    a: 9,
    b: 20,
    c: 30,
    d: 8,
    e: 12
  }
  var data2 = {
    a: 6,
    b: 16,
    c: 20,
    d: 14,
    e: 19,
    f: 12
  }

  // set the color scale
  // var color = d3.scaleOrdinal()
  //   .domain(["OIC", "CAP", "PLE", "ODR", "TEM", "BHC", "DIL", "EEM", "DIL", "SUN", "I4R", "RMI", "SIA", "APL", "FAT", "BDR", "JLS"])
  //   //.range([0,10,20,30,40,50,60,70,80,90,100]);
  //   .range(d3.schemeDark2);

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  // var color = d3.scaleBand()
  //   .domain(["OIC", "CAP", "PLE", "ODR", "TEM", "BHC", "DIL", "EEM", "DIL", "SUN", "I4R", "RMI", "SIA", "APL", "FAT", "BDR", "JLS"])
  //   .rangeRound([0, 100])
  //   .padding(0.1);

  // A function that create / update the plot for a given variable:

  update = () => {

    if (month == 12) {
      month = 1,
        year++;
    } else month++;

    console.log(month);
    console.log(year);

    let data = data3.responseJSON[year][month];

    // if (num == 1) {
    //   data = data1;
    // } else data = data3.responseJSON[2016][11];

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function (d) {
        console.log(d);
        return d.value.recordCount;
      })
      .sort(function (a, b) {
        return d3.ascending(a.value.recordCount);
      })
    var data_ready = pie(d3.entries(data))

    // map to data
    var u = svg.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function (d) {
        //console.log(d);
        //console.log(d.data.value.ProjectCode, d.data.value.recordCount);
        return (color(d.data.value.ProjectCode))
      })
    // .attr("stroke", "white")
    // .style("stroke-width", "2px")
    // .style("opacity", 1)

    // remove the group that is not present anymore
    u
      .exit()
      .remove()

    //   console.log(data_ready);
    // var text = svg.select(".labels").selectAll("text")
    //   .data(data_ready, data => {
    //     console.log(data.data.value.ProjectCode);
    //   });
    //   .data(data_ready, data.data.value.ProjectCode);

    // text.enter()
    // 	.append("text")
    // 	.attr("dy", ".35em")
    // 	.text(function(d) {
    //     console.log(d);
    // 		return d.data.label;
    // 	});

    // function midAngle(d){
    // 	return d.startAngle + (d.endAngle - d.startAngle)/2;
    // }

    // text.transition().duration(1000)
    // 	.attrTween("transform", function(d) {
    // 		this._current = this._current || d;
    // 		var interpolate = d3.interpolate(this._current, d);
    // 		this._current = interpolate(0);
    // 		return function(t) {
    // 			var d2 = interpolate(t);
    // 			var pos = outerArc.centroid(d2);
    // 			pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    // 			return "translate("+ pos +")";
    // 		};
    // 	})
    // 	.styleTween("text-anchor", function(d){
    // 		this._current = this._current || d;
    // 		var interpolate = d3.interpolate(this._current, d);
    // 		this._current = interpolate(0);
    // 		return function(t) {
    // 			var d2 = interpolate(t);
    // 			return midAngle(d2) < Math.PI ? "start":"end";
    // 		};
    // 	});

    // text.exit()
    // 	.remove();

  }

  // Initialize the plot with the first dataset
  update(2016, 1);
}