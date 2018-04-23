var url="https://birulik.github.io/ITMO/hw2/countries_2012.json"
d3.json(url, function(error, data){
  //console.log(data[0]['name'])
    
	var isAscending = true;
  var columns = Object.keys(data[0]);
  //columns=columns.splice(1, 2, 4, 7, 8);
	var colnames = ["name", "continent", "gdp", "life_expectancy", "population", "year"]
  var table = d3.select("body").append("table"),
    thead = table.append("thead")
                 .attr("class", "thead");
    tbody = table.append("tbody");

  table.append("caption")
    .html("World Countries Ranking");

  thead.append("tr").selectAll("th")
    .data(colnames)  //new header
  .enter()
    .append("th")
    .text(function(d) { return d; })
    .on("click", function(header, i) {
      d3.selectAll('th').attr("class","")
      console.log(1)
      if (isAscending) {
    	 tbody.selectAll("tr").sort(function(a, b) {
        return d3.descending(a[header], b[header]);
      });
        isAscending = false;
        this.className = 'aes'
      } else {
        tbody.selectAll("tr").sort(function(a, b) {
        return d3.ascending(a[header], b[header]);
      });
      	isAscending = true;
        this.className = "des"
      }
    });

  var rows = tbody.selectAll("tr.row")
    .data(data)
    .enter()
    .append("tr").attr("class", "row");

  var cells = rows.selectAll("td")
    .data(function(row) {   
      

      var newrow = []
      for (i=0;i<colnames.length;i++) {
        newrow.push(row[colnames[i]])
      }
      

     // console.log(newrow)
      return newrow
        /*return d3.range(Object.keys(row).length).map(function(column, i) {
            return row[Object.keys(row)[i]];
        });*/
    })
    .enter()
    .append("td")
    .text(function(d, i) {
    	switch(i) {
    		case 2:
    			return d3.format(".2s")(d);//gdp
    			break;
    		case 30:
    			return d3.format(".1f")(d);//lt
    			break;
    		case 3:
    			return d3.format(".1f")(d);//life
    			break;
    		case 50:
    			return d3.format(".1f")(d);//long
    			break;
    		case 4:
    			return d3.format(",")(d);//pop
    			break;
    		default:
    			return d;
    	}
     })

d3.selectAll('tr.row').each(function(row){
  this.className += ' '+row['continent']
})
d3.selectAll(".f1").each(function(d) { 
  console.log(d3.select(this).attr("name"))
})

d3.selectAll(".f1").on("change", function(e){
  console.log(this.checked, this.name)
  if (this.checked){
    d3.selectAll("."+this.name).attr("class", "row "+this.name)
  }
  else {
    d3.selectAll("."+this.name).attr("class", "row "+this.name+" hide")
  }
})

});
