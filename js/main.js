
let colors         = ['#c63939','#03147b', '#7bbdcf', '#833e3e', '#314e52'];
let subjectsValues = Array.from( document.getElementsByClassName("input-subject"));
let btnCalc        = document.getElementById("btnCalc");
let subjectData = {};
btnCalc.addEventListener('click', drawCharts);
function barChart(  ){
  
    let canvas         = document.getElementById("bar");
    let context        = canvas.getContext('2d');   
    let colorIndex     = 0;
    let subject        = Object.keys( subjectData );
    let padding        = 10;
    let canvasWidth    = canvas.clientWidth ;
    let canvasHeight   = canvas.clientHeight;
    let startX         = 40;
    let barWidth       = (canvasWidth  - ( 20 * subject.length ) ) / subject.length ;
    let greatestDegree = 0;
    let barHeight      = 0;


    //Iterate through subject to get the heighest value
    for( subject in subjectData ) {
        // Default greatest degree is zero 
        greatestDegree = Math.max( greatestDegree, subjectData[subject]  );
    }   
    
    // Iterator Thorugh subject to draw bar and print percentage text
    for( subject in subjectData ) {
        // Get the fraction for each degree
        barHeight = subjectData[subject] / greatestDegree * canvasHeight   

        /*
         === Padding variable increase bar height if it exceed the canvas height
         === this if condition check if bar is 10 percentage so no apply padding on it
        */

        if( (canvasHeight - barHeight )  < canvasHeight - 30  ) {
            barHeight = canvasHeight - (barHeight - padding * 2 );
        } else {
            barHeight = canvasHeight - barHeight;
        }

        context.fillStyle = colors[ colorIndex ];   
        context.fillRect( startX , barHeight, barWidth , canvasHeight );

        //Draw text
        context.font = "14px arial bold";
        context.fillText( `${subject[0]}${subjectData[subject]}%`, startX, barHeight - 5 )
        startX += barWidth + 5 ;        
        colorIndex++;
   
    }
   
}
function pieChart(){
    let canvas       = document.getElementById("piechart");
    let ctx          = canvas.getContext("2d");
    let subjectSum   = 0;
    let prevAngle    = 0;
    let fraction     = 0
    let counter      = 0;
    let canvasHeight = canvas.clientHeight;
    let canvasWidth  = canvas.clientWidth;
    
    // Get the total subjecte degree
   for( let subject in subjectData ) {
         subjectSum += subjectData[subject]
   }

   console.log( subjectSum );

   // Draw each segment of data
   for( let subject in subjectData) {
        // Get fraction for each subject
        fraction = subjectData[subject] / subjectSum; 
        angle = prevAngle + fraction * Math.PI * 2;
        ctx.fillStyle= colors[counter];
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2,canvasHeight / 2);
        ctx.arc(canvasWidth / 2 ,canvasHeight / 2, canvasWidth * 0.25, prevAngle,angle);
        ctx.lineTo(canvasWidth / 2 ,canvasHeight / 2);
        ctx.fill(); 
        prevAngle=angle;
        counter++;
   }   
   
   
}
function donutChart(){
    let canvas       = document.getElementById("donutchart");
    let ctx          = canvas.getContext("2d");
    // Set width and height canvas
    let subjectSum   = 0;
    let prevAngle    = 0;
    let fraction     = 0
    let counter      = 0;
    let canvasHeight = canvas.clientHeight;
    let canvasWidth  = canvas.clientWidth;
   
    
    // Get the total subjecte degree
   for( let subject in subjectData ) {
         subjectSum += subjectData[subject]
   }


   // Draw each segment of data
   for( let subject in subjectData) {
        // Get fraction for each subject
        fraction = subjectData[subject] / subjectSum; 
        angle = prevAngle + fraction * Math.PI * 2;
        ctx.fillStyle= colors[counter];
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2,canvasHeight / 2);
        ctx.arc(canvasWidth / 2 ,canvasHeight / 2, canvasWidth * 0.25, prevAngle,angle);
        ctx.lineTo(canvasWidth / 2 ,canvasHeight / 2);
        ctx.fill(); 
        prevAngle=angle;
        counter++;
   }   
   
    // Draw white circle
     ctx.beginPath();
     ctx.arc(canvasWidth / 2 ,canvasHeight / 2, 50, 0, Math.PI * 2);
     ctx.fillStyle = "#fff";
     ctx.fill();
   
}

function lineChart() {

    let canvas            = document.getElementById("linechart");
    let ctx               = canvas.getContext("2d");
    let canvasWidth       = canvas.clientWidth;
    let canvasHeight      = canvas.clientHeight;
    let startPoint        = 0;
    let greatestDegree    = 0;
    let spaceBetweenpoint = canvasWidth / 5;
    let counter           = 0
    for( let subject in subjectData) {
        greatestDegree = Math.max( greatestDegree, subjectData[subject] )
    } 

    ctx.beginPath();
    ctx.moveTo( startPoint,canvasHeight );
        
    for( let subject in subjectData ) {
        let fraction = subjectData[subject] / greatestDegree;
        let lineHeight = fraction * canvasHeight;
        lineHeight = canvasHeight - lineHeight;
        startPoint += spaceBetweenpoint
        ctx.lineWidth = "2";
        ctx.strokeStyle= colors[0]
        ctx.lineTo( startPoint  , lineHeight );
        ctx.stroke();
    }
}

function drawCharts()
{
   let chemistInput  = document.getElementById("chemistry");
   let mathInput     = document.getElementById("math");
   let scienceInput  = document.getElementById("science");
   let arabicInput   = document.getElementById("arabic");
   let physicsInput  = document.getElementById("physics");

   // clear all canvas
    let  barCanvas  = document.getElementById("bar");
    let  barContext = barCanvas.getContext("2d")
   
    let  piechartCanvas = document.getElementById("piechart");
    let  pieContext = piechartCanvas.getContext("2d")

    let  donutchartCanvas = document.getElementById("donutchart");  
    let  donutContext  = donutchartCanvas.getContext("2d")

    let  linechartCanvas = document.getElementById("linechart");
    let  lineContext = linechartCanvas.getContext("2d")

    barContext.clearRect(0,0,500, 500);
    pieContext.clearRect(0,0,500, 500);
    donutContext.clearRect(0,0,500, 500);
    lineContext.clearRect(0,0,500, 500);
    //Set object subject data
    subjectData.Chemistry  = parseInt( Math.abs(chemistInput.value));
    subjectData.Math       = parseInt( Math.abs( mathInput.value));
    subjectData.Science    = parseInt( Math.abs( scienceInput.value));
    subjectData.Arabic     = parseInt( Math.abs( arabicInput.value));
    subjectData.Physics    = parseInt( Math.abs( physicsInput.value))
    
    // Get checkbox
    let checkChart = Array.from( document.getElementsByClassName("check-chart") );

    // Loop throug checkbox to get checked 
    checkChart.forEach( check => {
        if( check.id == 'column' && check.checked == true ) {
            barChart();
        }
        if( check.id == 'line' && check.checked == true ) {
            lineChart();
        }
        if( check.id =='pie' && check.checked == true ) {
            pieChart();
        }
        if( check.id == 'donut' && check.checked == true ) {
            donutChart();

        }
    })

    
}
