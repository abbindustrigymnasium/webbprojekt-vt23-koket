
let weekSpanVT = [];
let weekSpanHT = [];
let orderVT = [];
let orderHT = [];
let orderclasses = [];
let startclass = getStartClassYear();
orderclasses.push(startclass, startclass-2, startclass-1) // makes an aranged array of the classes this specific year according to the cleaning schedule


for(i = 0; i<21; i++) { // creates the array of school weeks on spring term
  startweek = 2;
  weekSpanVT.push(startweek + i)
}

for(i = 0; i<19; i++) { // creates the array of school weeks on autumn term 
  startweek = 33;
  weekSpanHT.push(startweek + i)
}

function createVTSchedule() {
  let c = 0.5; // the starting cleaning group according to the cleaning schedule
  let index = 0;
  for(i = 0; i<weekSpanVT.length; i++) { // loops spring weeks to asign each index a cleaning group
    if(i === 7 || i === 12) {
      orderVT.push(null) // pushes a null value whenever there is a holiday week
    }
    else {
      if (c === 0.1) { //push the correct cleaning group to array following the schedule pattern
        orderVT.push(orderclasses[index] + c)
        c = Number((c + 0.5).toFixed(1))
        if (index  === 2) {
          index = 0
        }
        else {
          index++;
        }
        
      }
      else {
        orderVT.push(orderclasses[index] + c)
        c = Number((c - 0.1).toFixed(1))
      }
    }
  }
}

function createHTSchedule() { // same as createVTSchedule but following the autumn schedule
  let c = 0.5;
  let index = 0;
  for(i = 0; i<weekSpanHT.length; i++) {
    if(i === 11) {
      orderHT.push(null)
    }
    else {
      if (c === 0.1) {
        orderHT.push(orderclasses[index] + c)
        c = Number((c + 0.5).toFixed(1))
        if (index  === 2) {
          index = 0
        }
        else {
          index++;
        }
        
      }
      else {
        orderHT.push(orderclasses[index] + c)
        c = Number((c - 0.1).toFixed(1))
      }
    }
  }
}

function drawScheduleVT(weeks, groups, currentWeek) { // function that draws the schedule by adding html when for looping the weeks, takes in parameteres: weeksarray, groupsarray, currentweek
    let scheduleHTML = '';
    let titleHTML = '';
    for (let i = 0; i < weeks.length; i++) {
      
        if (i === 7 || i === 12) { // checks if the week is a holiday week 
            const isHighlighted = weeks[i] === currentWeek; // determine if this number should be highlighted
        
            scheduleHTML += `
              <div class="week ${isHighlighted ? 'highlighted' : ''}">
                <div>Lov</div>
                <div class="label">${isHighlighted ? 'This week' : `Week ${i +2}`}</div>
              </div>
            `;

            if (isHighlighted) {
              titleHTML += `
              <h1>Ledigt denna vecka!</h1>
            `
            }
        }
        else {
            const group = groups[i];
            const isHighlighted = weeks[i] === currentWeek; 

            if(isHighlighted) {
              let klass = String(group).slice(0, 2) + '0s ' + 'Basgrupp ' + String(group).slice(3, 4)
              
              // adding html code for highlighting the current cleaning group
              titleHTML += `
              <h1>Köket denna vecka:</h1>
              <h1>${klass}</h1>
            `
            }
            // adding html code for the schedule
            scheduleHTML += `
              <div class="week ${isHighlighted ? 'highlighted' : ''}">
                <div>${group}</div>
                <div class="label">${isHighlighted ? 'This week' : `Week ${i + 2}`}</div>
              </div>
            `;
        }
    }
  
    document.getElementById('scheduleVT').innerHTML = scheduleHTML;
    document.getElementById('titleVT').innerHTML = titleHTML;
}

function drawScheduleHT(weeks, groups, currentWeek) { // same function as drawScheduleVT but for the autumn term with considering holiday weeks
  let scheduleHTML = '';
  let titleHTML = '';
  for (let i = 0; i < weeks.length; i++) {
    
      if (i === 11) {
          const isHighlighted = weeks[i] === currentWeek;
      
          scheduleHTML += `
            <div class="week ${isHighlighted ? 'highlighted' : ''}">
              <div>Lov</div>
              <div class="label">${isHighlighted ? 'This week' : `Week ${weeks[i]}`}</div>
            </div>
          `;

          if (isHighlighted) {
            titleHTML += `
            <h1>Ledigt denna vecka!</h1>
          `
          }
      }
      else {
          const group = groups[i];
          const isHighlighted = weeks[i] === currentWeek;

          if(isHighlighted) {
            let klass = String(group).slice(0, 2) + '0s ' + 'Basgrupp ' + String(group).slice(3, 4)

            titleHTML += `
            <h1>Köket denna vecka:</h1>
            <h1>${klass}</h1>
          `
          }
      
          scheduleHTML += `
            <div class="week ${isHighlighted ? 'highlighted' : ''}">
              <div>${group}</div>
              <div class="label">${isHighlighted ? 'This week' : `Week ${weeks[i]}`}</div>
            </div>
          `;
      }
  }

  document.getElementById('scheduleHT').innerHTML = scheduleHTML;
  document.getElementById('titleHT').innerHTML = titleHTML
}

function weekNumber(date = new Date()) // function that returns the current week
{
  let firstJanuary = new Date(date.getFullYear(), 0, 1);
  let dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
  let weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
  return weekNr;
}

function getStartClassYear(date = new Date()) // function that returns the lowest class year in the school according to month and year
{
  let year = date.getFullYear()
  let month = date.getMonth() +  1
  if (month >= 8) {
    return Number(String(year).slice(2,4))
  }
  else if (month < 8) {
    return Number(String(year-1).slice(2,4))
  }
}



createVTSchedule() // creating both schedules
createHTSchedule()

drawScheduleVT(weekSpanVT, orderVT, 10); // drawing both schedules
drawScheduleHT(weekSpanHT, orderHT, weekNumber());



