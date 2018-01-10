// Varbiles
var hideShowElm = document.querySelector('.boxPop')
var store = window.localStorage
var inputCheck = document.querySelectorAll('input[type=checkbox]')

// These if statments contorl background based on the page
if (bg !== 'index') {
  document.querySelector('.bgMiddle').style.backgroundImage = 'url(assets/' + bg + '.jpg)'
  document.querySelector('.text').style.width = 'initial'
}

if (bgColor === 'black') {
  document.querySelector('body').style.background = '#000'
  document.querySelector('.titleImage').src = 'assets/title.png'
}

// This is a function to load all the eventlisteners that need to be added.
function loadEvents(inputs, ev, func) {
  for(var i = 0; i < inputCheck.length; i++) {
    inputs[i].addEventListener(ev, func);
  }
}

// Add a new song to the localStorage
function addSong(song) {
  if (!store.getItem('songs')) createStore()
  var songArray = JSON.parse(store.getItem('songs'))
  songArray.push(song)
  store.setItem('songs', JSON.stringify(songArray))
}

// Removes a song from localStorage
function removeSong(song) {
  if (!store.getItem('songs')) createStore()
  var songArray = JSON.parse(store.getItem('songs'))
  var index = songArray.indexOf(song)
  songArray.splice(index, 1)
  store.setItem('songs', JSON.stringify(songArray))
}

// Will create the localStorage
function createStore() {
  store.setItem('songs', JSON.stringify([]))
}

// Loads all songs in the localStorage to the page
function loadSongs() {
  if (!store.getItem('songs')) createStore()
  var songArray = JSON.parse(store.getItem('songs'))
  for (var i = 0; i < songArray.length; i++) {
    var para = document.createElement('P');
    var t = document.createTextNode(songArray[i]);
    para.appendChild(t);
    document.querySelector('.songs').appendChild(para);
  }
}

// Hides and shows the element
function hideShow() {
  if (hideShowElm.style.display === 'none') {
    hideShowElm.style.display = 'flex';
    hideShowElm.addEventListener('click', function() {
      hideShowElm.style.display = 'none';
    })
  } else {
    hideShowElm.style.display = 'none';
  }
}

// Calls the the function to add the event listern
loadEvents(inputCheck, 'change', function(){
  if (this.checked) {
    addSong(this.name)
  } else {
    removeSong(this.name)
  }
});
