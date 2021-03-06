/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 

let data2 = [];

const loadCSV = async function(data) { 
  d3.csv('../data/barchart.csv').then(function(data) {
    for (let i = 0; i<data.length; i++){
      data2.push(data[i]);
    }
  });
}

loadCSV()

for (let i = 0; i < data2.length; i+=1){
  console.log('prints');
  console.log(data2[i]['score']);
  data2[i]['score'] = parseInt(data2[i]['score']);
}

// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// This code creates variable for a indivudal bar with the given paramters 
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

console.log(data1)

/*
name,score
A,80
B,76
C,90
D,82
E,90
F,75
G,86
/*

/*

  Axes

*/ 

// TODO: What does this code do? 
// Creates a mallable variable which finds the max of data1 and function d, then returns the score of d
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?  
// Creates a variable that is representative of the scale of the y axis
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// Creates a variable that is representative of the scale of the x axis
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
//adds another attribute to the inital shape. Scales the shape according to the y axis
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
//adds another attribute to the inital shape. Scales the shape according to the x axis
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px');   

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
//adds another div container to the html with the given attributes.
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
//creates a function for when a bar is moused over.
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
//displays the current left px and top px of where the mouse is.
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
//sets the opacity of the tooltip to 0 (hides it).
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
//compiles all bars and adds them with functions and the correct height and width.
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);








