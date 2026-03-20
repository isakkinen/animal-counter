window.addEventListener('DOMContentLoaded', function() {
  // Utility function to format time values with zero padding
  function padZero(num) {
    return String(num).padStart(2, '0');
  }

  // Animal counter data with display labels
  var animalsData = [
    { key: "wild_caught_fish", label: "🐟 wild caught fish", killed: 970000000000 },
    { key: "chickens", label: "🐔 chickens", killed: 61171973510 },
    { key: "farmed_fish", label: "🐠 farmed fish", killed: 38000000000 },
    { key: "ducks", label: "🦆 ducks", killed: 2887594480 },
    { key: "pigs", label: "🐷 pigs", killed: 1451856889.38 },
    { key: "rabbits", label: "🐰 rabbits", killed: 1171578000 },
    { key: "geese", label: "🦢 geese", killed: 687147000 },
    { key: "turkeys", label: "🦃 turkeys", killed: 618086890 },
    { key: "sheep", label: "🐑 sheep", killed: 536742256.33 },
    { key: "goats", label: "🐐 goats", killed: 438320370.99 },
    { key: "cattle", label: "🐄 cattle", killed: 298799160.08 },
    { key: "rodents", label: "🐭 rodents", killed: 70371000 },
    { key: "other_birds", label: "🕊️ pigeons and other birds", killed: 59656000 },
    { key: "buffalo", label: "🐃 buffalo", killed: 25798819 },
    { key: "horses", label: "🐴 horses", killed: 4863367 },
    { key: "donkeys", label: "🫏 donkeys and mules", killed: 3213400 },
    { key: "camels", label: "🐪 camels and other camelids", killed: 3243266.03 }
  ];

  // Component: Animal counter item
  function createAnimalCounterItem(animal) {
    var li = document.createElement('li');
    
    var countSpan = document.createElement('span');
    countSpan.id = 'akc-' + animal.key;
    countSpan.textContent = '0';
    
    var nameSpan = document.createElement('span');
    nameSpan.className = 'animal-name';
    nameSpan.textContent = animal.label;
    
    li.appendChild(countSpan);
    li.appendChild(nameSpan);
    return li;
  }

  // Component: Source link item
  function createSourceItem(source) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.innerHTML = source.text;
    li.appendChild(link);
    return li;
  }

  // Sources data
  var sourcesData = [
    {
      url: "http://faostat3.fao.org/download/Q/QL/E",
      text: "FAOSTAT [Region: <i>World + (Total)</i>, Element: <i>Producing Animals/Slaughtered</i>, Items Aggregated: <i>Meat, Total > (List)</i>, Year: <i>2013</i>]"
    },
    {
      url: "http://fishcount.org.uk/fish-count-estimates",
      text: "Fish count estimates (fishcount.org.uk)"
    }
  ];

  // Render animal counter list
  var counterList = document.getElementById('animal-counter-list');
  animalsData.forEach(function(animal) {
    counterList.appendChild(createAnimalCounterItem(animal));
  });

  // Render sources list
  var sourcesList = document.getElementById('sources-list');
  sourcesData.forEach(function(source) {
    sourcesList.appendChild(createSourceItem(source));
  });

  // Timer functionality
  var pageOpenTime = new Date();
  function updateTimer() {
    var now = new Date();
    var elapsed = Math.floor((now - pageOpenTime) / 1000);
    var hours = Math.floor(elapsed / 3600);
    var minutes = Math.floor((elapsed % 3600) / 60);
    var seconds = elapsed % 60;
    
    var timerDisplay = padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
    var timerElement = document.getElementById('page-timer');
    if (timerElement) {
      timerElement.textContent = timerDisplay;
    }
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);

  // Animal counter functionality
  var updatesPerSecond = 20;
  var animalsKilledPerYear = {};
  
  // Build animals killed per year from animalsData
  animalsData.forEach(function(animal) {
    animalsKilledPerYear[animal.key] = animal.killed;
  });

  var secondsPerYear = 365 * 24 * 60 * 60;
  var interval = 1000 / updatesPerSecond;
  var count = 0, start = new Date().getTime();
  var killsPerUpdateCycle = 1 / updatesPerSecond;

  function update(intervalCount) {
    var currentKillRate = intervalCount * killsPerUpdateCycle;
    for (var subset in animalsKilledPerYear) {
      var countElement = document.getElementById("akc-" + subset);
      if (countElement) {
        var numKilled = animalsKilledPerYear[subset];
        var currentCount = Math.round(currentKillRate * (numKilled / secondsPerYear));
        countElement.innerHTML = currentCount.toLocaleString();
      }
    }
  }

  function selfCorrectingTimeoutInterval() {
    update(++count);
    window.setTimeout(selfCorrectingTimeoutInterval, interval - (new Date().getTime() - start - count * interval));
  }
  window.setTimeout(selfCorrectingTimeoutInterval, interval);
});
