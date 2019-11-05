function init(){
    console.log("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    d3.json("./samples.json").then((data) => {
        // creating options / selection process
        Object.entries(data.names).forEach(([key,value]) => {
            d3.select("#selDataset").append("option").text(value);
            var option = key;
        });
        // demographic info
        Object.entries(data.metadata[0]).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("tbody").append("tr").append("td").text(`${key}: ${value}`);
        });

        var sample_values = data.samples[0].sample_values.slice(0,10).reverse();
        var IDs = data.samples[0].otu_ids.map(data=>"OTU " + data).slice(0,10).reverse();
        var labels = data.samples[0].otu_labels.slice(0,10).reverse();

        var bar = {
            x: sample_values,
            y: IDs,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        var data_bar = [bar];
        Plotly.newPlot("bar", data_bar);
        
        var bubble_id = data.samples[0].otu_ids;
        var bubble_values = data.samples[0].sample_values;
        var bubble_labels = data.samples[0].otu_labels;

        var bubble = {
            x: bubble_id,
            y: bubble_values,
            text: bubble_labels,
            mode: 'markers',
            marker: {
                color: bubble_id,
                size: bubble_values
            },

          };
          var data_bubble = [bubble];
        Plotly.newPlot("bubble", data_bubble) ;

    });
};

function optionChanged (changeOption){

    d3.json("./samples.json").then((data) => {
        Object.entries(data.names).forEach(([key,value]) => {
            if (value === changeOption){
                option = key;
            }
        });

        // demographic info
        Object.entries(data.metadata[option]).forEach(([key,value]) => {
            d3.select("#sample-metadata>tbody").remove()
            d3.select("#sample-metadata").append("tbody").append("tr").append("td").text(`${key}: ${value}`);
        });

        var sample_values = data.samples[option].sample_values.slice(0,10).reverse();
        var IDs = data.samples[option].otu_ids.map(data=>"OTU " + data).slice(0,10).reverse();
        var labels = data.samples[option].otu_labels.slice(0,10).reverse();

        var bar = {
            x: sample_values,
            y: IDs,
            text: labels,
            type: "bar",
            orientation: "h"
        };
        var data_bar = [bar];
        Plotly.newPlot("bar", data_bar);

        var bubble_id = data.samples[option].otu_ids;
        var bubble_values = data.samples[option].sample_values;
        var bubble_labels = data.samples[option].otu_labels;

        var bubble = {
            x: bubble_id,
            y: bubble_values,
            text: bubble_labels,
            mode: 'markers',
            marker: {
                color: bubble_id,
                size: bubble_values
            }

          };
          var data_bubble = [bubble];
        Plotly.newPlot("bubble", data_bubble) ;
    });
};

init();
