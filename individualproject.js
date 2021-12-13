let count=0;
let error= 0;

const Supersector_Code ={
  "0000": "Total nonfarm",
  "0500": "Total private",
  "6500":"Education and health services",
  "1000": "Mining and logging",
  "7000": "Leisure and hospitality",
  "5500": "Financial activities",
  "5000": "Information",
  "6000": "Professional and business services",
  "8000": "Other services",
  "9000": "Government",
  "0700": "Service-providing",
  "0600": "Goods-producing",
  "0800": "Private service-providing",
  "2000": "Construction",
  "3000": "Manufacturing",
  "4000": "Trade, transportation, and utilities",
  "3100": "Durable Goods",
  "3200": "Nondurable Goods",
  "4300":"Transportation and warehousing",
  "4200": "Retail trade",
  "4142": "Wholesale trade",
  "4422": "Utilities"

};
  let Supersector_Keys= Object.keys(Supersector_Code);


    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      coral: 'rgb(255,87,51)',
      babypink:'rgb(255,191,191)',
      neonpink:'rgb(255,0,108)',
      black: 'rgb(0,0,0)',
      darkgrey:'rgb(112,112,112)',
      lavender: 'rgb(210,191,250)',
      lightblue: 'rgb(30,162,255)',
      teal: 'rgb(0,255,249)',
      neongreen: 'rgb(0,255,18)',
      darkgreen: 'rgb(49,152,20)',
      indigo:'rgb(53,20,152)',
      lightgrey: 'rgb(182,174,174)',
      maroon: 'rgb(150,75,75)',
      lightorange: 'rgb(255,193,115)',
      lightyellow: 'rgb(255,252,98)'
    };

  let CHART_COLORS_Keys= Object.keys(CHART_COLORS)

    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      coral: 'rgb(255,87,51, 0.5)',
      babypink:'rgb(255,191,191, 0.5)',
      neonpink:'rgb(255,0,108, 0.5)',
      black: 'rgb(0,0,0, 0.5)',
      darkgrey:'rgb(112,112,112, 0.5)',
      lavender: 'rgb(210,191,250, 0.5)',
      lightblue: 'rgb(30,162,255, 0.5)',
      teal: 'rgb(0,255,249, 0.5)',
      neongreen: 'rgb(0,255,18, 0.5)',
      darkgreen: 'rgb(49,152,20, 0.5)',
      indigo:'rgb(53,20,152, 0.5)',
      lightgrey: 'rgb(182,174,174, 0.5)',
      maroon: 'rgb(150,75,75, 0.5)',
      lightorange: 'rgb(255,193,115, 0.5)',
      lightyellow: 'rgb(255,252,98, 0.5)'
    };
    let CHART_COLORS_50_Percent_Keys= Object.keys(CHART_COLORS_50_Percent)


    const data = {
      labels: [],
      datasets: []
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };

  function responseReceivedHandler() {
    if (this.status == 200){
      console.log(this.response);
      let sectorline= {
        label: "",
        data:[],
        borderColor: "",
        backgroundColor:"",
        hidden:true
      }

    let dataArray= this.response.Results.series[0].data;
    let seriesID= this.response.Results.series[0].seriesID


      sectorline.label= (Supersector_Code[seriesID.substring(3,7)])
      sectorline.borderColor= (CHART_COLORS_Keys[count])
      sectorline.backgroundColor=(CHART_COLORS_50_Percent_Keys[count])


    for (let i = dataArray.length - 1; i >= 0; i--){
        sectorline.data.push(dataArray[i].value)
        if (count ==0){
                  data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)
      }
    }

    data.datasets.push(sectorline)
    count++

        if ( count == Supersector_Keys.length){
          const myChart = new Chart(
          document.getElementById('myChart'),
          config);
       }
       } else{
        console.log("error");
      }
    }

  for (let i=0; i < Supersector_Keys.length; i++){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType="json";
  registrationkey= "";
  if ((registrationkey=="") && (error==0)){
    alert("Please enter a registrationkey in the JavaScript code. You can register for an API key at https://www.bls.gov/developers/");
    error++
  }
  let startquery= "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
  let endquery= "000001?"+ "registrationkey=" + registrationkey;
  xhr.open("GET", startquery+ Supersector_Keys[i] + endquery)
  xhr.send();
}
