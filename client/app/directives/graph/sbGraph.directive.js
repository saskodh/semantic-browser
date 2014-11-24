'use strict';

angular.module('sbApp')
  .directive('sbGraph', function (d3, RESOURCE_TYPE, $location, $window) {
    return {
      require: '^disableGraphAnimation',
      scope: {
        graphData: '=sbGraph'
      },
      link: function (scope, element, attrs, disableGraphAnimation) {
        // here we will do the initialization
        var svg, svgZoomableContainer;
        var d3Element = d3.select(element[0]);
        var svgWidth = $window.screen && $window.screen.availWidth ? $window.screen.availWidth : 10000;
        var svgHeight = $window.screen && $window.screen.availHeight ? $window.screen.availHeight : 10000;
        var width = element.width();
        var height = element.height();

        var NODE_SIZE = {};
        NODE_SIZE[RESOURCE_TYPE.MAIN_RESOURCE] = 30;
        NODE_SIZE[RESOURCE_TYPE.PREDICATE] = 12;
        NODE_SIZE[RESOURCE_TYPE.RESOURCE] = 15;

        // attach the svg
        svg = d3Element.append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        svgZoomableContainer = svg.append('svg:g')
          .call(d3.behavior.zoom().on("zoom", function() {
            svgZoomableContainer.attr("transform",
                "translate(" + d3.event.translate + ")"
                + " scale(" + d3.event.scale + ")");
          }))
          .append('svg:g');

        // append image pattern to be used for main node background
        var defs = svgZoomableContainer.append("defs");
          defs.append("pattern")
          .attr("id", "mainImage")
          .attr("x", "0")
          .attr("y", "0")
          .attr("width", "100")
          .attr("height", "100").append("image")
          .attr("xlink:href", '')
          .attr("x", -10)
          .attr("y", -10)
          .attr("width", 80)
          .attr("height", 80);

        // append marker used as arrow
        // build the arrow.
        defs.selectAll("marker")
          .data(["end"])      // Different link/path types can be defined here
          .enter().append("svg:marker")    // This section adds in the arrows
          .attr("id", String)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 15)
          .attr("refY", -1.5)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

        // attach the popup for later

        // init force
        var link, node, label;
        var onTick = function(e) {
          if (e.alpha < 0.03) {
            force.stop();
          } else {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          }
        };

        var force = d3.layout.force()
          .charge(-400)
          .linkDistance(70)
          /*.gravity(.03)
          .friction(0.8)*/
          .size([width, height]);
          /*.alpha([0.1]);*/

        var updateGraph = function (graphData) {
          force.stop();
          // remove old data (i think can be skipped because of how enter works)
          if(link && node) {
            link.remove();
            node.remove();
          }

          // center the main node
          if (graphData.mainNode) {
            graphData.mainNode.x = width / 2;
            graphData.mainNode.y = height / 2;
            graphData.mainNode.fixed = true;
          }

          // add links
          // TODO: check why the marker in not shown
          link = svgZoomableContainer.append('svg:g').selectAll(".link")
            .data(graphData.links)
            .enter().append("line")
            .attr("class", "link")
            .attr("marker-end", "url(#end)");

          // add nodes after the links
          node = svgZoomableContainer.selectAll(".node")
            .data(graphData.nodes)
            .enter().append("g")
            .attr("class", function(d){ return 'node ' + d.type; })
          ;

          node.append("circle")
            .attr("class", "circle")
            .attr("r", function(d){ return NODE_SIZE[d.type]; });
          node.append("foreignObject")
            .attr('x', function (d) { return NODE_SIZE[d.type] * Math.sqrt(2) / -2; })
            .attr('y', function (d) { return NODE_SIZE[d.type] * Math.sqrt(2) / -2; })
            .attr("width", function (d) { return NODE_SIZE[d.type] * 2 / Math.sqrt(2); })
            .attr("height", function (d) { return NODE_SIZE[d.type] * 2 / Math.sqrt(2); })
            .append("xhtml:div")
            .attr('class', 'node-label')
            .append('xhtml:span')
            .text(function (d) { return d.name; });

          // register events
          node.on("dblclick", function (resource) {
            d3.event.stopPropagation();
            scope.$apply(function () {
              if (resource.type === RESOURCE_TYPE.RESOURCE) {
                $location.url('resource/' + resource.uri);
              }
            });
          });
          //node.on("click", function (d) {});
          node.on('mouseover', function(d){

            link.each(function (l) {
              var thisLink = d3.select(this);
              var highlight = l.source === d || l.target === d;
              if (highlight) {
                l.source.highlight = true;
                l.target.highlight = true;
                thisLink.moveToFront();
              }
              thisLink
                .classed('highlight', highlight)
                .classed('lowlight', !highlight);
            });

            node.each(function (d) {
              var thisNode = d3.select(this);
              var highlight = !!d.highlight;
              if (highlight) {
                thisNode.moveToFront();
              }
              thisNode
                .classed('highlight', highlight)
                .classed('lowlight', !highlight);
            });

            d3.select(this).select("circle")
              .transition()
              .duration(250)
              .attr("transform","scale(1.5)");
          });

          node.on('mouseout', function(){
            link.classed('highlight', false).classed('lowlight', false);
            node.each(function (d) {
              d.highlight = false;
              d3.select(this)
              .classed('highlight', false)
              .classed('lowlight', false);
            });

            d3.select(this).select("circle")
              .transition()
              .duration(250)
              .attr("transform","scale(1)");
          });

          force.nodes(graphData.nodes).links(graphData.links).on("tick", onTick);
          force.start();
        };

        // NOTE: do not forget to set up watchers for the graphData and element size
        scope.$watch('graphData', function (newGraphData) {
          if (newGraphData && newGraphData.nodes && newGraphData.links) {
            updateGraph(newGraphData);
          }
        });

        var onResizeHandler = function () {
          width = element.width();
          height = element.height();
          svg.attr("width", width).attr("height", height);
          force.size([width, height]);
          if (scope.graphData && scope.graphData.mainNode) {
            scope.graphData.mainNode.x = width / 2;
            scope.graphData.mainNode.y = height / 2;
            force.start();
          }
        };

        // NOTE: start stop force on some element event like hover
        disableGraphAnimation.setGraph(force);
        element.on('click', function (event) {
          event.stopPropagation();
        });
        scope.$on('$destroy', function () {
          element.unbind('click');
        });
      }
    }
  });