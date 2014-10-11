'use strict';

angular.module('sbApp')
  .directive('graph', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        graph: '=graphData'
      },
      link: function(scope, element, attributes) {

        var width = element.width();
        var height = element.height();

        var force = d3.layout.force()
          .charge(-300)
          .distance(100)
          .gravity(.03)
          .friction(0.8)
          .size([width, height]);

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append('svg:g')
          .call(d3.behavior.zoom().on("zoom", function() {
            svg.attr("transform",
              "translate(" + d3.event.translate + ")"
                + " scale(" + d3.event.scale + ")");
          }))
          .append('svg:g');

        var color = d3.scale.category20();

        scope.render = function(graph) {
          svg.empty();

          //append pattern to the svg for the image
          //console.log(graph.nodes[0].image[0]);
          if(graph.nodes[0].image)
            svg.append("defs").append("pattern")
              .attr("id", "mainImage")
              .attr("x", "0")
              .attr("y", "0")
              .attr("width", "100")
              .attr("height", "100").append("image")
              .attr("xlink:href", graph.nodes[0].image[0])
              .attr("x", -10)
              .attr("y", -10)
              .attr("width", 80)
              .attr("height", 80);

          var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", function(d){ return "node " + d.group;})
            .call(force.drag);

          console.log(node);

          node.append("circle")
            .attr("class", "node")
            .attr("r", function(d){
              if(d.group == 'main')
                return 30;
              return 12;
            })
            .style("fill", function(d) {
              if(d.group == "main"){
                return "url(#mainImage)";
              }
              return color(d.group);
            });

          node.append("text")
            .attr("dx", function(d){
              var dimension = 16;
              if(d.group == 'main')
                dimension = 30;
              return dimension;
            })
            .attr("dy", function(d){
              var dimension = 6;
              if(d.group == 'main')
                dimension = 15;
              return dimension;
            })
            .attr('class', 'text')
            .text(function(d) { return d.name.substring(d.name.lastIndexOf('/')+1, d.name.length) })
            .style('opacity', 1);
          //.style("fill", 'green');

          svg.select(".node")
            .append("svg:image")
            .attr("xlink:href", function (d) {
              if(d.image)
                return d.image[0];
              return "./public/images/noimg.jpg";
            })
            .attr("x", "-12px")
            .attr("y", "-12px")
            .attr("width", "24px")
            .attr("height", "24px");

          node.on("dblclick", function (d) {
            if(d.group == 'property' || d.group == 'main')
              return;
            loader.show();
            force.stop();

            $('#txtResourceUri').val(d.name);
            $('#btnResourceURI').trigger('click');
          });

          node.on("click", function (d) {
            //console.log("single click: ");
            //console.log(d);
          });

          node.on('mouseover', function(d){
            force.stop();

            var text = d3.select(this).select("text");
            text.transition()
              .duration(500)
              .attr("transform","scale(1.5)");
            //.style('opacity', 1);

            var image = d3.select(this).select("circle");
            image.transition()
              .duration(250)
              .attr("transform","scale(1.5)");
          });

          node.on('mouseout', function(d){
            force.start();
            var text = d3.select(this).select("text");
            text.transition()
              .duration(250)
              .attr("transform","scale(1)");
            //.style('opacity', 0);

            var image = d3.select(this).select("circle");
            image.transition()
              .duration(250)
              .attr("transform","scale(1)");

          });

          force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
        };

        scope.render(scope.graph);
      }
    };
  });