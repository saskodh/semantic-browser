'use strict';

angular.module('sbApp')
  .factory('graphDirectiveHelper', function (d3, RESOURCE_TYPE) {

    var clickCallback = null;
    var doubleClickCallback = null;

    var svg, node, link, force, width, height;

    var render = function (element, graph) {
      element.empty();
      width = element.width() - 5;
      height = element.height() - 5;

      force = d3.layout.force()
        .charge(-300)
        .distance(100)
        .gravity(.03)
        .friction(0.8)
        .size([width, height]);

      svg = d3.select(element[0]).append("svg")
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

      //append pattern to the svg for the image
      //console.log(graph.nodes[0].image[0]);
      if(graph.mainNode.image)
        svg.append("defs").append("pattern")
          .attr("id", "mainImage")
          .attr("x", "0")
          .attr("y", "0")
          .attr("width", "100")
          .attr("height", "100").append("image")
          .attr("xlink:href", graph.mainNode.image)
          .attr("x", -10)
          .attr("y", -10)
          .attr("width", 80)
          .attr("height", 80);

      link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

      node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", function(d){
          var classes = 'node';
          if (d.type === RESOURCE_TYPE.MAIN_RESOURCE) classes += ' mainNode';
          if (d.type === RESOURCE_TYPE.PREDICATE) classes += ' predicateNode';
          return classes;
        })
        .call(force.drag);

      node.append("circle")
        .attr("class", "circle")
        .attr("r", function(d){
          if(d.type === RESOURCE_TYPE.MAIN_RESOURCE)
            return 30;
          return 12;
        })
        .style("fill", function(d) {
          if(d.type === RESOURCE_TYPE.MAIN_RESOURCE && d.image){
            return "url(#mainImage)";
          }
          return color(d.type === RESOURCE_TYPE.PREDICATE);
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
        .text(function(d) { return d.name; })
        .style('opacity', 1);
      //.style("fill", 'green');


      // in case we decide to have images instead of circles
      /*svg.select(".node")
        .append("svg:image")
        .attr("xlink:href", function (d) {
          if(d.image)
            return d.image[0];
          return "./public/images/noimg.jpg";
        })
        .attr("x", "-12px")
        .attr("y", "-12px")
        .attr("width", "24px")
        .attr("height", "24px");*/

      node.on("dblclick", function (d) {
        d3.event.stopPropagation();
        if (doubleClickCallback !== null) {
          doubleClickCallback({node: d});
        }
      });

      node.on("click", function (d) {
        if (clickCallback !== null) {
          clickCallback(d);
        }
      });

      node.on('mouseover', function(d){
        force.stop();

        var text = d3.select(this).select("text")
        text.transition()
          .duration(500)
          .attr("transform","scale(1.5)");
        //.style('opacity', 1);

        var image = d3.select(this).select("circle")
        image.transition()
          .duration(250)
          .attr("transform","scale(1.5)");
      });

      node.on('mouseout', function(d){
        force.start();
        var text = d3.select(this).select("text")
        text.transition()
          .duration(250)
          .attr("transform","scale(1)");
        //.style('opacity', 0);

        var image = d3.select(this).select("circle")
        image.transition()
          .duration(250)
          .attr("transform","scale(1)");

      });

      force
        .nodes(graph.nodes)
        .links(graph.links)
        .alpha([0.1])
        .start();

      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });
    };

    return {
      renderGraph: render,
      setNodeDoubleClickCallback: function (callback) {
        doubleClickCallback = callback;
      }
    };
  });