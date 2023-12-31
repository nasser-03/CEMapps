let logs = document.querySelector('#logs-input');
let logsPara = document.querySelector('.logs-para');
let loginHitsView = document.querySelector('.login-hits');
let hoursB2M = document.querySelector('.hours-b2m');
let hoursComparison = document.querySelector('.hours-login-comparison');
let EMWarpsCount = document.querySelector('.em-warps');
let EMWarpsView = document.querySelector('.em-warps-view');
let lines; //most important line ever

function getLogs(){
    let dateRegex = /^(\d{2}-\d{2})/gm;
    let paragraph = logs.value.split(" ")
    // console.log(paragraph)
    lines = []
    let checkLinesArr = [];
    let currentLine = "";
    let lastDay;
    for (let i=0; i<paragraph.length; i++){
        if (i==0){
            lastDay = paragraph[i];
            continue;
        }
        if (!dateRegex.test(paragraph[i])){
            currentLine += paragraph[i] + ' ';
        }
        else{
            checkLinesArr.push(lastDay + ' ' + currentLine);
            currentLine = "";
            lastDay = paragraph[i];
        }
        if (i === paragraph.length-1)
            checkLinesArr.push(lastDay + ' ' + currentLine);
    }
    clearEverything();
    lines = checkLinesArr;
    // console.log(lines);
}
  
// function displayLogs(){
//     for (let i=0; i<lines.length; i++) {
//         document.querySelector('.logs-para').textContent += `${lines[i]} \n`;
//     }
// }

const dateObj = new Date();
let today = dateObj.getDate();
let currMonth = dateObj.getMonth()+1;
let currYear = dateObj.getFullYear();
let currDate = new Date(`${currYear}-${currMonth}-${today}`);
let dateTwoMonthsAgo = new Date(`${currYear}-${+currMonth-2}-${today}`);



let loginHits = [];
let EMWarps = [];
let firstPlaytime, lastPlaytime;
function getLoginHits(){
    for (let i=0; i<lines.length; i++){
        //reversing the log date to be ok with builtin js functions, I really despise doing this part
        let ithDate = '';
        for (let j=0; j<lines[0].length;j++){
            if (lines[i][j] === ' ')
                break;
            ithDate += lines[i][j];
        }
        let ithMonth = '', ithDay = '';
        for (let k=0; k<ithDate.length; k++){
            if (ithDate[k-1] === '-' || ithDate[k-2] === '-'){
                ithMonth += ithDate[k];
            }
            else if (ithDate[k] === '-')
                continue;
            else{
                ithDay += ithDate[k];
            }
        }

        if (ithDay.length === 1){
            ithDay = '0' + ithDay;
            console.log(ithDay)
        }
        if (ithMonth.length === 1){
            ithMonth = '0' + ithMonth;
        }

        let ithLogDateReversed =  new Date(`${dateObj.getFullYear()}-${ithMonth}-${ithDay}`);
        if (currDate >= ithLogDateReversed && ithLogDateReversed >= dateTwoMonthsAgo && lines[i].includes("LOGIN MISC:")){
            loginHits.push(lines[i]);
            // console.log(lines[i]);
        }
        //getting EM warps
        if (currDate >= ithLogDateReversed && ithLogDateReversed >= dateTwoMonthsAgo && lines[i].includes("warped to the current event")){
            EMWarps.push(lines[i]);
            // console.log(lines[i]);
        }
        
    }
    // console.log(loginHits.length)
    // return loginHits;
    if (loginHits.length !== 0){
        firstPlaytime = loginHits[0].split(" ")[10];
        lastPlaytime = loginHits[+loginHits.length-1].split(" ")[10];
    }

    loginHitsView.textContent = `Login Hits: ${loginHits.length}`;
    let hoursDiff2M =(+lastPlaytime-+firstPlaytime)/60;
    hoursB2M.textContent = `Hours before 2 months and Hours Currently: ${lastPlaytime}-${firstPlaytime}/60 = ${hoursDiff2M} H `;
    hoursComparison.textContent = `Hours and LOGIN hits comparison: ${+hoursDiff2M/+loginHits.length}`;
    EMWarpsCount.textContent = `Times Used /eventwarp: ${EMWarps.length}`;
}

function displayLoginHits(){
    for (let i=0; i<loginHits.length; i++) {
        document.querySelector('.logs-para').textContent += `${loginHits[i]} \n`;
    }
}
function displayEventWarps(){
    for (let i=0; i<loginHits.length; i++) {
        document.querySelector('.em-warps-view').textContent += `${EMWarps[i]} \n`;
    }
}




function clearEverything(){
    loginHits = [];
    lines = [];
    EMWarps = [];
    firstPlaytime = 0;
    lastPlaytime = 0;
    EMWarpsView.textContent = "";
    logsPara.textContent = "";
}