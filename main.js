(function() {

    //Creating Bubble
    var width = 1500;
        height = 2500;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("id", "svgchart")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("id", "gchart")
        .attr("transform", "translate(0,0)")

        //var radiusScale = d3.scaleSqrt().domain([1,89]).range([10,20])//89 is highest age. 10 is highest circle size

        var forceXSplit = d3.forceX(function(d) {
            if (d.gender == "male") {
                return 100
            } else {
                return 800
            }
        }).strength(0.15)
        var forceXCombine = d3.forceX(width / 2).strength(0.15)

        var forceYSplit = d3.forceY(function(d) {
            if (d.category == "chemistry") {
                return -300
            } else if (d.category == "economics") {
                return 50
            } else if (d.category == "literature") {
                return 400
            } else if (d.category == "medicine") {
                return 750
            } else if (d.category == "peace") {
                return 1100
            } else {
                return 1450
            }
        }).strength(0.15)
        var forceYCombine = d3.forceY(height / 2).strength(0.15)


    var simulation = d3.forceSimulation() //clusters circle in middle of screen
        .force('center', d3.forceCenter(width / 2, height / 2))
        //.force("x", d3.forceX(width / 2).strength(0.05)) // you can call x,y, and collide anythong you want
        //.force("y", d3.forceY(height / 2).strength(0.05))
        .force("charge", d3.forceManyBody().strength(0.5))
        .force("collide", d3.forceCollide(function(d) {
            var circle = document.getElementById("m"+d.firstname+d.surname);
            var r = Number(circle.getAttribute("r")) + 2;
            return r;
        }))

    d3.queue()
        .defer(d3.csv, "nobel_laureates.csv")
        .await(start)

    function start(error, data) {

        var tooldiv = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);

        var circles = svg.selectAll(".bubbles")
            .data(data)
            .enter().append("circle")
            .attr("class", "bubbles")
            .attr("r", function(d) {
                return 10;
            })
            .attr("id", function(d) {
                return "m" + d.firstname + d.surname;
            })
            .attr("fill", function(d) {//sorts the winners that are currently alive
                //console.log(d.is_alive)
                if (d.is_alive == "true") {
                    return "green"
                } else {
                    return "red"
                }
            })
            .on('click', function(d) { //helps examine each bubble clicked on
                console.log(d)
            })
            .on("mouseover", function(d) {
                tooldiv.transition()		
                    .duration(200)		
                    .style("opacity", .9);		
                tooldiv	.html("Name:" + "<br/>" + d.fullname + "<br/>" + "<br/>" + "Age:" + "<br/>" + d.age + "<br/>" + "<br/>" + "Gender:" + "<br/>" + d.gender + "<br/>" + "<br/>" + "Country:" + "<br/>" + d.born_country_code + "<br/>" + "<br/>" + "Affiliation:" + "<br/>" + d.affiliation)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                tooldiv.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            });

            d3.select("#gender").on('change', function() {
                if(d3.select(this).property("checked")){
                    simulation
                    .force("x", forceXSplit)
                    .force("y", d3.select("#category").property("checked") ? forceYSplit : forceYCombine)
                    .force("charge", d3.forceManyBody().strength(0.5))
                    .force("collide", d3.forceCollide(function(d) {
                        var circle = document.getElementById("m"+d.firstname+d.surname);
                        var r = Number(circle.getAttribute("r")) + 2;
                        return r;
                    }))
                    .alpha(0.5)
                    .restart()

                    for (let el of document.querySelectorAll('.genderlabels')) {
                        el.style.visibility = 'visible';
                        d3.select("#category").property("checked") ? el.style.marginTop='3em' : el.style.marginTop='44em';
                    }
                } else {
                    //combine();
                    simulation
                    .force("x", forceXCombine)
                    .force("y", d3.select("#category").property("checked") ? forceYSplit : forceYCombine)
                    .force("charge", d3.forceManyBody().strength(0.5))
                    .force("collide", d3.forceCollide(function(d) {
                        var circle = document.getElementById("m"+d.firstname+d.surname);
                        var r = Number(circle.getAttribute("r")) + 2;
                        return r;
                    }))
                    .alpha(0.5)
                    .restart()

                    for (let el of document.querySelectorAll('.genderlabels')) {
                        el.style.visibility = 'hidden';
                        d3.select("#category").property("checked") ? el.style.marginTop='3em' : el.style.marginTop='44em';
                    } 
                }
            })

            d3.select("#age").on('change', function() {
                if (d3.select(this).property("checked")) {
                    circles
                        .attr("r", function(d) {
                            if (d.age >= 80) {
                                return 14;
                            } else if (d.age >= 70) {
                                return 12;
                            } else if (d.age >= 60) {
                                return 10;
                            } else if (d.age >= 50) {
                                return 8;
                            } else if (d.age >= 40) {
                                return 6;
                            } else if (d.age >= 30) {
                                return 4;
                            } else {
                                return 2;
                            }
                        })
                    simulation
                        .force("collide", d3.forceCollide(function(d) {
                            var circle = document.getElementById("m"+d.firstname+d.surname);
                            var r = Number(circle.getAttribute("r")) + 2;
                            return r;
                        }))
                        .alpha(0.5)
                        .restart()
                    
                    for (let el of document.querySelectorAll('.agetable')) {
                        console.log("hit")
                        el.style.visibility = 'visible';
                    } 
                } else {
                    circles
                        .attr("r", function(d) {
                            return 10;
                        })
                    simulation
                        .force("collide", d3.forceCollide(function(d) {
                            var circle = document.getElementById("m"+d.firstname+d.surname);
                            var r = Number(circle.getAttribute("r")) + 2;
                            return r;
                        }))
                        .alpha(0.5)
                        .restart()

                    for (let el of document.querySelectorAll('.agetable')) {
                        el.style.visibility = 'hidden';
                    }
                }
            })

            d3.select("#category").on('change', function() {
                if(d3.select(this).property("checked")){
                    simulation
                    .force("x", d3.select("#gender").property("checked") ? forceXSplit : forceXCombine)
                    .force("y", forceYSplit)
                    .force("charge", d3.forceManyBody().strength(0.5))
                    .force("collide", d3.forceCollide(function(d) {
                        var circle = document.getElementById("m"+d.firstname+d.surname);
                        var r = Number(circle.getAttribute("r")) + 2;
                        return r;
                    }))
                    .alpha(0.5)
                    .restart()

                    for (let el of document.querySelectorAll('.catlabels')) el.style.visibility = 'visible';
                    for (let el of document.querySelectorAll('.genderlabels')) {
                        el.style.marginTop = '3em';
                    }
                } else {
                    //combine();

                    simulation
                    .force("x", d3.select("#gender").property("checked") ? forceXSplit : forceXCombine)
                    .force("y", forceYCombine)
                    .force("charge", d3.forceManyBody().strength(0.5))
                    .force("collide", d3.forceCollide(function(d) {
                        var circle = document.getElementById("m"+d.firstname+d.surname);
                        var r = Number(circle.getAttribute("r")) + 2;
                        return r;
                    }))
                    .alpha(0.5)
                    .restart()

                    for (let el of document.querySelectorAll('.catlabels')) el.style.visibility = 'hidden';
                    for (let el of document.querySelectorAll('.genderlabels')) {
                        el.style.marginTop = '44em';
                    }
                }
            })

            d3.select("#combine").on('click', combine)

            function combine() {
                simulation
                .force("x", forceXCombine)
                .force("y", forceYCombine)
                .force("collide", d3.forceCollide(function(d) {
                    var circle = document.getElementById("m"+d.firstname+d.surname);
                    var r = Number(circle.getAttribute("r")) + 2;
                    return r;
                }))
                .alpha(0.5)
                .restart()
                circles
                    .attr("r", function(d) {
                        return 10;
                    })
                document.getElementById("gender").checked = false;
                document.getElementById("age").checked = false;
                document.getElementById("category").checked = false;

                for (let el of document.querySelectorAll('.catlabels')) el.style.visibility = 'hidden';
                for (let el of document.querySelectorAll('.genderlabels')) el.style.visibility = 'hidden';
            }
            

        simulation.nodes(data)// calles the ticked method to add force
            .on('tick', ticked)

        function ticked() { //force that get circle positon
            circles
                .attr("cx", function(d) {
                    return d.x
                })
                .attr("cy", function(d) {
                    return d.y 
                })
        }
    }
})();