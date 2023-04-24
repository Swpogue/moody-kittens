let kittens = []
let mood = {
  tolerant: 'tolerant',
  happy: 'happy',
  angry: 'angry',
  gone: 'gone'
}
loadKittens()
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */


function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let newKittenName = form.name.value.trim();
  if (newKittenName.length === 0) {
    return
  }

  for (let i = 0; i < kittens.length; i++) {
    if (kittens[i].name == newKittenName) {
      alert('Name already Used!')
      return
    }
  }

  let kitten = {
    id: generateId(),
    name: newKittenName,
    affection: 5,
    mood: mood.tolerant
  }


  kittens.push(kitten)
  saveKittens()
  form.reset()
  getStarted()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem('kittens', JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenData) {
    kittens = kittenData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */


function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittenTemplate = ""
  kittens.forEach(kitten => {
    kittenTemplate += `
    <div class="kitten ${kitten.mood} p-3 card text-center">
    <img class="kitten" height="150" width="150">
      <div class="d-flex center kitten-name">Name: ${kitten.name}</div>
      <div class="d-flex center">Mood: ${kitten.mood}</div>
      <div class="d-flex center">Affection: ${kitten.affection}</div>
      <div>
        <button type="button" onclick="pet('${kitten.id}')">Pet Kitten</button>
        <button type="button" onclick="catnip('${kitten.id}')">Give Catnip</button>
      </div>
      </div>
    </div>
    `
  })
  kittenListElement.innerHTML = kittenTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kit => kit.id == id);
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let rng = Math.random()
  if (rng > .5) {
    currentKitten.affection++;
    setKittenMood(currentKitten)
    saveKittens()
  } else {
    currentKitten.affection--;
    setKittenMood(currentKitten)
    saveKittens()
  }
}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = mood.tolerant
  currentKitten.affection = 5
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 8) {
    kitten.mood = mood.happy
  }
  if (kitten.affection <= 5) {
    kitten.mood = mood.tolerant
  }

  if (kitten.affection <= 3) {
    kitten.mood = mood.angry
  }

  if (kitten.affection <= 0) {
    kitten.mood = mood.gone
  }
  saveKittens()
}



/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens.length = 0
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  let welcomeElement = document.getElementById("welcome")
  if (welcomeElement) welcomeElement.remove();
  loadKittens()
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}