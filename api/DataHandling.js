//A code to get the current date
//Will prolly change because I didn't know which format these are wanted
//Also must test later that it doesn't take the time from computer clock
//By Ira

function getCurrentDate() {  
    const utcDate = new Date();

    const year = (utcDate.getFullYear()).toString();    //returns "2023"

    var month = (utcDate.getMonth()).toString();    //returns the month as a number
    if (month.length == 1) {                        //Add zero before the number to get proper format
        month = "".concat("0", month);
    }

    var day = (utcDate.getDate()).toString();
    if (day.length == 1) {
        day = "".concat("0", day);
    }

    const date = year + month + day; //date in YYYYMMDD format
   
    console.log(date); //For test purposes
   
    return {date}; 
}

//A code to get the current time
//By Ira
function getCurrentTime() {
    const utcDate = new Date();

    var hour = (utcDate.getHours()).toString(); //returns the hour in a 24-hour format
    if (hour.length == 1) {
        hour = "".concat("0", hour);
    }

    var minute = (utcDate.getMinutes()).toString();
    if (minute.length == 1) {
        minute = "".concat("0", minute);
    }

    var second = (utcDate.getSeconds()).toString();
    if (second.length == 1) {
        second = "".concat("0", second);
    }

    const time = hour + ":" + minute + ":" + second; //Time in HH:MM:SS format

    console.log(time); //for test purposes

    return {time}; 
}


//Export functions here
export { getCurrentTime, getCurrentDate }
