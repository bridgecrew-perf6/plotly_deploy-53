function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildChart(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildChart(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
   var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
   var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
   var metadata = data.metadata
   var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
   var result = sampleArray[0];
   var result1 = metaArray[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
   var otu_ids = result.otu_ids;
   var otu_labels = result.otu_labels
   var sample_values = result.sample_values
   console.log(otu_ids)
   console.log(otu_labels)
   console.log(sample_values)
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [ {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type:'bar',
      orientation: 'h'
      
    }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {      
      title: "Top 10 Bacterial Species",
      xaxis: {title: "Sample Values"},
      yaxis: {title: "ID's"}
     
        
      };
    // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar",barData, barLayout);
  });
}
// Bar and Bubble charts
// Create the buildCharts function.
function buildChart(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    var resultArray = data
        .samples
        .filter(sampleObj => {
          return sampleObj.id == sample
        });
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bubble chart",bubbleData, bubbleLayout); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otuID,
        y: sampleValue,
        mode: 'markers',
        text: sampleLabel,
        marker: {
          size: sampleValue,
          color: otuID,
        },
      },
    ];
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "OTU ID",
      showlegend: false,
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', data, bubbleLayout); 
  });
}
// Create the buildChart function.
function buildChart(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata
    .filter(sampleObj => {
      return sampleObj.id == sample
      });
    console.log(data);
    
    // 3. Create a variable that holds the washing frequency.
      var wash_freq = result.wfreq;
     
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash_freq,
        title: {text: "Belly Button Washing Frequency <br> Scrubs per Week", font: {size: 18}},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10]},
          bar: { color: "steelblue" },
          steps: [
            { range: [0, 1], color: 'rgba(0, 0, 0, 0.5)' },
            { range: [1, 2], color: 'rgba(0, 0, 0, 0.5)' },
            { range: [2, 3], color: 'rgba(183,28,28, .5)' },
            { range: [3, 4], color: 'rgba(183,28,28, .5)' },
            { range: [4, 5], color: 'rgba(249, 168, 37, .5)' },
            { range: [5, 6], color: 'rgba(249, 168, 37, .5)' },
            { range: [6, 7], color: 'rgba(110, 154, 22, .5)' },
            { range: [7, 8], color: 'rgba(110, 154, 22, .5)' },
            { range: [8, 9], color: 'rgba(14, 127, 0, .5)' },
            { range: [9, 10], color: 'rgba(14, 127, 0, .5)' }
          ],
        }  
      }
    ];
     
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, 
      height: 500, 
      margin: { t: 0, b: 0 }
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gauge_trace, gauge_layout);
  });
}