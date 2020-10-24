// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = true;
//const images = ['00.jpg', '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg'];
let images = [];
const base = './img/';
const months = ['January','February','March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
let keyPressed=false;

function fillArrImages() {
	
	for (let j=0; j<24; j++){
		let str='';
		if (j<6) {
			do {
				str='./assets/images/night/'+`${addZero(Math.floor(Math.random()*20)+1)}`+'.jpg';	
			} while (images.includes(str));
			images.push(str);	
		}
		if(j<12 && j>5) {
			do{
				str='./assets/images/morning/'+`${addZero(Math.floor(Math.random()*20)+1)}`+'.jpg';	
			} while (images.includes(str));
			images.push(str);	
		}
		if(j<18 && j>11) {
			do {
				str='./assets/images/day/'+`${addZero(Math.floor(Math.random()*20)+1)}`+'.jpg';	
			} while (images.includes(str));
			images.push(str);	
		}
		if(j<24 && j>17) {
			do {
				str='./assets/images/evening/'+`${addZero(Math.floor(Math.random()*20)+1)}`+'.jpg';	
			} while (images.includes(str));
			images.push(str);
		}
	}
	console.log(images);
}

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    day = today.getDate();
    month = today.getMonth();
   /* year = today.getFullYear();*/
  


  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  //hour = hour % 12 || 12;

  // Output Time
  //time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
  //  sec
  //)} ${showAmPm ? amPm : ''}`;
  
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);

  date.innerHTML = `${days[today.getDay()]}`+' '+`${day}`+' '+`${months[month]}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
   //console.log(hour);
  //const imageSrc = base + images[hour];
  const imageSrc = images[hour];

  console.log('imageSrc= '+imageSrc);
  viewBgImage(imageSrc);
  if (hour < 6) {
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
  } else {
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }

  /*
  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
  */
}

// Get Name
function getName() {
	keyPressed = false;
  if (localStorage.getItem('name') === null|| localStorage.getItem('name')=='') {
    name.textContent = '[Enter Name]';
  } 
  else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
if (e.type === 'keypress') {
    // Make sure enter is pressed
      if (keyPressed==false){
      name.textContent = '';
      keyPressed=true;
    }
    
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      keyPressed = false;
      name.blur();
    }
  } else {
  	keyPressed = false;
    localStorage.setItem('name', e.target.innerText);
  } 
  
}

function clearName(){
  name.textContent = '';
 
}

// Get Focus
function getFocus() {
	keyPressed = false;
  if (localStorage.getItem('focus') === null|| localStorage.getItem('focus')=='') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
         if (keyPressed==false){
      focus.textContent = '';
      keyPressed=true;
    }
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function clearFocus(){
  focus.textContent = '';
 
}


let i = 0;
//------------------смена фона------------------
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  console.log('src= '+src);
  const img = document.createElement('img');
  img.src = src;
  console.log('onload= '+`url(${src})`);
  img.onload = () => {      
  	body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const index = i % images.length;
  //const imageSrc = base + images[index];
  const imageSrc = images[index];
  viewBgImage(imageSrc);
  i++;
} 
//----------------------------------------------

//------------------смена цитаты------------------
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn_quote = document.querySelector('.btn_quote');

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn_quote.addEventListener('click', getQuote);
//------------------------------------------------


//------------------погода------------------------

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const city = document.querySelector('.city');



async function getWeather() { 
  keyPressed=false;
  if (localStorage.getItem('city') === null|| localStorage.getItem('city')=='') {
    city.textContent = '[ENTER CITY]';
  } else {
    city.textContent = localStorage.getItem('city');
  }

  city.textContent = localStorage.getItem('city');
  console.log('city.textContent= '+city.textContent);
try{
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=5cbe72540f8b0f8b0c7ab9dc9554a630&units=metric`;
  	const res = await fetch(url);
  	const data = await res.json();
  
  	weatherIcon.className = 'weather-icon owf';
 	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
 	temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  	weatherDescription.textContent = data.weather[0].description;
 	humidity.textContent =  `${data.main.humidity} %`;
 	windSpeed.textContent = `${data.wind.speed} m/s`;
} catch (err) {
	city.textContent = '[ENTER CITY]';
	//weatherIcon.className = 'weather-icon owf';
 	//weatherIcon.classList.add(" ");
 	temperature.textContent = "";
  	weatherDescription.textContent = "";
 	humidity.textContent = "";
 	windSpeed.textContent = "";

}
  

  //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

/*
function setCity(event) {
  if (event.code === 'Enter') {
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('city', event.target.innerText);
    city.blur();
    }
    
    getWeather();
    
  }


}
*/
function setCity(event) {
	if (event.type === 'keypress') {
    // Make sure enter is pressed
         if (keyPressed==false){
      city.textContent = '';
      keyPressed=true;
    }
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('city', event.target.innerText);
      city.blur();
    }
  } else {
    localStorage.setItem('city', event.target.innerText);
  }
}



//getWeather()
//------------------------------------------------

// Run
fillArrImages();
showTime();
setBgGreet();
getName();
getFocus();

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
//изначальный вариант: name.addEventListener('blur', setName);
//-----
name.addEventListener('blur', getName);
//name.addEventListener('focus', clearName);
//-----
focus.addEventListener('keypress', setFocus);
//изначальный вариант: focus.addEventListener('blur', setFocus);
//-----
focus.addEventListener('blur', getFocus);
//focus.addEventListener('focus', clearFocus);
//-----
//document.addEventListener('DOMContentLoaded', showTime);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', getWeather);






