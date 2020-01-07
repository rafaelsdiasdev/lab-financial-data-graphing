const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"

axios
    .get(apiUrl)
    .then(responseFromAPI => {
        printTheChart(responseFromAPI.data)
        // console.log(responseFromAPI.data)
    })
    .catch(err => console.log("Error while getting the data: ", err))

const printTheChart = (stockdata) => {
    const dailyData = stockdata.bpi
    // console.log(dailyData)
    const stockDates = Object.keys(dailyData)
    // console.log(stockDates)
    const stockPrices = stockDates.map(date => dailyData[date])
    const ordened = stockDates.map(date => dailyData[date]).sort()
    const textMax = document.querySelectorAll('h3')[0]
    const textMin = document.querySelectorAll('h3')[1]
    let max = stockPrices[ordened.length-1]
    let min = ordened[0]
    textMax.innerHTML = `Max: ${max}`
    textMin.innerHTML = `Min: ${min}`
    // stockPrices.sort()
    // console.log(stockPrices.sort())

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: stockPrices
                }
            ]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()

const filterByDate = () => {
    let date1 = document.querySelectorAll('input')[0].value;
    let date2 = document.querySelectorAll('input')[1].value;
    let selected = document.querySelectorAll('option:checked')[0].value
    // console.log(selected)
    let query = ''
    // console.log(date1, date2);
    
    if (date1 && date2) {
        query = `?start=${date1}&end=${date2}&currency=${selected}`;
    }

    axios
        .get(apiUrl + query)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data)
        })
        .catch(err => console.log("Error is: ", err.status));
}
