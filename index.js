
let weekSpanVT = [];
let weekSpanHT = [];
let orderVT = [];
let orderHT = [];
let orderclasses = [];
let startclass = getStartClassYear();
orderclasses.push(startclass, startclass-2, startclass-1)


for(i = 0; i<21; i++) {
  startweek = 2;
  weekSpanVT.push(startweek + i)
}

for(i = 0; i<19; i++) {
  startweek = 33;
  weekSpanHT.push(startweek + i)
}

function createVTSchedule() {
  let c = 0.5;
  let index = 0;
  for(i = 0; i<weekSpanVT.length; i++) {
    if(i === 7 || i === 12) {
      orderVT.push(null)
    }
    else {
      if (c === 0.1) {
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

function createHTSchedule() {
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

function drawScheduleVT(weeks, groups, currentWeek) {
    const numWeeks = weeks.length;
    const highlightedIndex = (currentWeek -2) % numWeeks; // Calculate the index of the highlighted number
  
    let scheduleHTML = '';
    let titleHTML = '';
    for (let i = 0; i < numWeeks; i++) {
      
        if (i === 7 || i === 12) {
            const isHighlighted = i === highlightedIndex; // Determine if this number should be highlighted
        
            scheduleHTML += `
              <div class="week ${isHighlighted ? 'highlighted' : ''}">
                <div>Lov</div>
                <div class="label">${isHighlighted ? 'This week' : `Week ${i +2}`}</div>
              </div>
            `;

        }
        else {
            const group = groups[i];
            const number = weeks[i];
            const isHighlighted = i === highlightedIndex; // Determine if this number should be highlighted

            if(isHighlighted) {
              let klass = String(group).slice(0, 2) + '0s ' + 'basgrupp ' + String(group).slice(3, 4)

              titleHTML += `
              <h1>Köket denna vecka:</h1>
              <h1>${klass}</h1>
            `
            }
        
            scheduleHTML += `
              <div class="week ${isHighlighted ? 'highlighted' : ''}">
                <div>${group}</div>
                <div class="label">${isHighlighted ? 'This week' : `Week ${i + 2}`}</div>
              </div>
            `;
        }
    }
  
    const scheduleElement = document.getElementById('scheduleVT');
    scheduleElement.innerHTML = scheduleHTML;
    document.getElementById('title').innerHTML = titleHTML
}

function drawScheduleHT(weeks, groups, currentWeek) {
  const numWeeks = weeks.length;
  const highlightedIndex = (currentWeek -2) % numWeeks; // Calculate the index of the highlighted number

  let scheduleHTML = '';
  let titleHTML = '';
  for (let i = 0; i < numWeeks; i++) {
    
      if (i === 11) {
          const number = weeks[i];
          const isHighlighted = number === currentWeek; // Determine if this number should be highlighted
      
          scheduleHTML += `
            <div class="week ${isHighlighted ? 'highlighted' : ''}">
              <div>Lov</div>
              <div class="label">${isHighlighted ? 'This week' : `Week ${weeks[i]}`}</div>
            </div>
          `;

      }
      else {
          const group = groups[i];
          const number = weeks[i];
          const isHighlighted = number === currentWeek; // Determine if this number should be highlighted

          if(isHighlighted) {
            let klass = String(group).slice(0, 2) + '0s ' + 'basgrupp ' + String(group).slice(3, 4)

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

  const scheduleElement = document.getElementById('scheduleHT');
  scheduleElement.innerHTML = scheduleHTML;
  // document.getElementById('title').innerHTML = titleHTML
}

function weekNumber(date = new Date())
{
  let firstJanuary = new Date(date.getFullYear(), 0, 1);
  let dayNr = Math.ceil((date - firstJanuary) / (24 * 60 * 60 * 1000));
  let weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7);
  return weekNr;
}

function getStartClassYear(date = new Date())
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



createVTSchedule()
createHTSchedule()

drawScheduleVT(weekSpanVT, orderVT, weekNumber());
drawScheduleHT(weekSpanHT, orderHT, weekNumber());



