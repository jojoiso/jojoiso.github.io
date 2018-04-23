d3.json("countries_2012.json", function(error, data) { //Не забыть потом вставить ссылку на JSON загруженного на гит


    var columns = Object.keys(data[0]);
    var colnames = ["name", "gdp", "life_expectancy", "year"];
    var isAscending = true;
    var table = d3.select("body").append("table"),
        thead = table.append("thead")
                     .attr("class", "thead");
        tbody = table.append("tbody");

        table.append("caption")
            .html("World Countries Ranking");

        thead.append("tr").SelectorAll("th")
            .data(colnames)
            .enter()
            .append("th")
            .text(function(d) { return d; })
            .on("click", function(header, i) {
                d3.selectAll("th").attr("class", "")
                console.log(1)
                if (isAscending) {
                    tbody.selectAll("tr").sort(function (a, b) {
                        return d3.descending(a[header], b[header]);
                    });
                    isAscending = false;
                    this.className = "aes"
                } else {
                    tbody.selectAll("tr").sort(function(a,b) {
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
        for (i=0; i<colnames.length; i++) {
            newrow.push(row[colnames[i]])
        }

        return newrow
    })
    .enter()
        .append("td")
        .text(function(d, i) {
            switch(i) {
                case 2:
                        return d3.format(".2s")(d); //gdp
                        break;
                case 30:
                        return.d3.format(".1f")(d); //lt
                        break;
                case 3:
                        return d3.format(".1f")(d); // life
                        break;
                case 50:
                        return d3.format(".1f")(d); //long
                        break;
                case 4:
                        return d3.format(",")(d); //pop
                        break;
                default:
                        return d;
            }
        })

    d3.selectAll("tr.row").each(function(row){
        this.className += ""+row["continent"]
    })

    d3.selectAll(".f1").each(function(d) {
        console.log(d3.select(this).attr("name"))
    })

    d3.selectAll(".f1").on("change", function(e) {
        console.log(this.checked, this.name)
        if (this.checked) {
            d3.selectAll("."+this.name).attr("class", "row "+this.name)
        }
        else {
            d3.selectAll("."+this.name).attr("class", "row "+this.name+" hide")
        }
    })


});
