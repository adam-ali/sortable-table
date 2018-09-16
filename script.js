$(document).ready(function() {
    /* get JSON data using Jquery */
    $.getJSON("https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data", function(data) {
        console.log(data);
        let tableHeaderList;

        data.products.forEach(product => {
            if(tableHeaderList===undefined) tableHeaderList = Object.keys(product); //created array of the table headers

            let tableRowData = '';
            tableHeaderList.forEach(currentHeaderName =>{

                let rowDataItem = product[currentHeaderName];
                let rowItem = '';                    
                
                // handles logic if table data item is an object such as the variants and images
                if (typeof rowDataItem === 'object' && rowDataItem!=null) {
                    let nestedRowData = ''

                    if(currentHeaderName ==='image'){//creates html from the image object
                        nestedRowData+="<p> width: "+  rowDataItem.width +"</p>" +
                        "<p> height: "+  rowDataItem.height +"</p>" +
                        "<a target='_blank' href='"+rowDataItem.src +"'>"+rowDataItem.src+"</a>";                        
                    } else { //creats html if the data is an array of objects
                        rowDataItem.forEach(rowDataItemObj => {
                            for (var key in rowDataItemObj) {
                                if (currentHeaderName === 'variants') {
                                    if (key === 'title' || key ==='price') nestedRowData+="<p>" +key+ ": "+  rowDataItemObj[key] +"</p>";                        
                                }
                                else if(currentHeaderName === 'options'){
                                    if (key === 'name' || key ==='position' || key==='values')
                                        nestedRowData+="<p>" +key+ ": "+  rowDataItemObj[key] +"</p>"; //ive selected only the main fields from the object so the table wasnt unnecessarily long                         
                                }
                                else if(currentHeaderName === 'images'){
                                    if (key === 'width' || key ==='height' || key==='values') 
                                        nestedRowData+="<p>" +key+ ": "+  rowDataItemObj[key] +"</p>";                        
                                    else if (key ==='src')
                                        nestedRowData+="<a target='_blank' href='"+rowDataItemObj[key] +"'>"+rowDataItemObj[key]+"</a>";                                                            
                                }
                            }
                            nestedRowData+="<hr>";
                        });
                    }
                    rowItem = "<td class='"+currentHeaderName+"'>"+ nestedRowData +"</td>"                                         
                } else rowItem = "<td class='"+currentHeaderName+"'>"+rowDataItem+"</td>"; // if item isnt an object creats a simpe table data tag
                tableRowData += rowItem;
            });
        
            $("#data-table tbody").append("<tr>"+tableRowData+"</tr>");  //adds row html to the table body   
        });
        tableHeaderList.forEach(headerName => $("#data-table thead tr").append("<th>"+headerName+"</th>")); //create the table Header Row
        $("#data-table").tablesorter({// plugin to make the Table sortable
            headers: {  
                1: { sorter: false }, 
                2: { sorter: false }, 
                3: { sorter: false }, 
                5: { sorter: false }, 
                6: { sorter: false }, 
                7: { sorter: false }, 
                8: { sorter: false }, 
                9: { sorter: false }, 
                10: { sorter: false }, 
                11: { sorter: false },
                12: { sorter: false }, 
                13: { sorter: false }, 
                14: { sorter: false },    
            }
        });  
      });

})
