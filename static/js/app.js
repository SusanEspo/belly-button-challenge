const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// sample_values
const dataSamp_val = d3.json(url);
console.log("sample_values: ", dataSamp_val);



function dropdownmenu(){
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);

  let names = data.names
  let dropdowntag = d3.select("#selDataset")

  names.forEach((sample) => {
    dropdowntag
        .append("option")
        .text(sample)
        .property("value", sample);
});
metadatatable(names[0])
charts(names[0])
//barchart(names[0])
});

}
dropdownmenu()

function optionChanged(key){
    metadatatable(key)
    charts(key)
}



function metadatatable(key){
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
      console.log(data);
    
      let metadata = data.metadata
      let metadataArray = metadata.filter(number => number.id == key)[0];
      let tabletag = d3.select("#sample-metadata")
        tabletag.html("")

      Object.entries(metadataArray).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        tabletag
            .append("h5")
            .text(`${key}: ${value}`)
      });
    
    ;
    
    
    
    });
    
    }

    function charts(key){
        // Fetch the JSON data and console log it
        d3.json(url).then(function(data) {
          console.log(data);
        
          let samples = data.samples
          let samplesarray = samples.filter(number => number.id == key)[0];


          let otu_ids = samplesarray.otu_ids

          let sample_values = samplesarray.sample_values

          let otu_labels = samplesarray.otu_labels
          
          var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text:otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              colorscale:'Earth',
              size: sample_values 
            }
          }];
          
          
          var bubblelayout = {
            title: 'Bubble Chart',
            showlegend: false,
           
          };
          
          Plotly.newPlot('bubble', bubbledata, bubblelayout);
          


          let bararray = samples.filter(number => number.id == key)[0];

          let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

          var barchartdata = [{
            type: 'bar',
            x: sample_values,
            y: yticks,
            orientation: 'h'
          }];
          
          Plotly.newPlot('bar', barchartdata);
          
        
        
        
        });
        
      }