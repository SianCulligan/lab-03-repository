'use strict';

// Feature 1:
// - As a user, I want to view the images on the page so that I can browse the photo collection

// 1. X open an Array
// 2. X create a constructor function
// 3. Build a prototype
// 4. .Get using AJAX
// 5. .append to the DOM

let imgArr = [];

function Image (imgObject) {
  this.image_url = imgObject.image_url;
  this.title = imgObject.title;
  this.description = imgObject.description;
  this.keyword = imgObject.keyword;
  this.horns = imgObject.horns;
}

// render function
Image.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let imageClone = $('div[class="clone"]');
  let imageHtml = $('#photo-template').html();
  imageClone.html(imageHtml);
  imageClone.find('h2').text(this.title);
  imageClone.find('img').attr('src', this.image_url); imageClone.find('img').attr('alt', this.title);
  imageClone.find('p').text(this.description);
  imageClone.removeClass('clone');
  imageClone.attr('class' , this.keyword);
};

Image.readJson = (path) => {
  // let pageLocation = '';
  $.ajax(path,'json')
    .then(imgData => {
      console.log(imgData);
      imgData.forEach(imageItem => {
        imgArr.push(new Image(imageItem));
      });
    })
    .then(Image.loadImage);
};

Image.loadImage = () => {
  imgArr.forEach(imgObject => imgObject.render());
  renderList();
};

$(() => Image.readJson('../data/page-1.json'));






//loop through our array to create objects
// create a render function



// populate the dropdown with our keywords
// write a function that responds to users click
// when clicked, all images w/ keywords are .show, everything else is .hide
let keywordFilter = [];

function renderList () {
  keywordFilter = [];
  imgArr.forEach((keywordCheck) => {
    if(!keywordFilter.includes(keywordCheck.keyword)) {
      // console.log(keywordCheck.keyword);
      keywordFilter.push(keywordCheck.keyword);
      $('select').append(`<option>${keywordCheck.keyword}</option>`);
    }
  });
}








// check if keyword already exists (.include!!!),
//if not .push to the array
//render it to the DOM





// Xbutton for page 1 & page 2
// hide images when button 2 is clicked


// $('#pageOne').on('click', function() {
//   $('img').hide();
//   $('h2').hide();
//   $('p').hide();

// });

// $('#pageOne' ).on('click', function () {
//   $('img').hide();
//   $('h2').hide();
//   $('p').hide();
//   $('#pageOne').fadeIn(750);
// });

// connect the .json page file to appropriate button
//get the images from page-2 to pass through readJson prototype


// $('#pageTwo' ).on('click', function () {

// acting on page 2 button
// hide all images from page-1.json
// show all images from page-2


//   $('img').hide();
//   $('h2').hide();
//   $('p').hide();
//   console.log('Hello');
//   $(() => Image.readJsonTwo());
//   $('img', '.pageTwo').show();
// });








// render function
// Image.prototype.renderTwo = function() {
//   $('main').append('<div class="clone"></div>');
//   let imageClone = $('div[class="clone"]');
//   let imageHtml = $('#photo-template').html();
//   imageClone.html(imageHtml);
//   imageClone.find('h2').text(this.title);
//   imageClone.find('img').attr('src', this.image_url); imageClone.find('img').attr('alt', this.title);
//   imageClone.find('p').text(this.description);
//   imageClone.removeClass('clone');
//   imageClone.attr('class' , 'pageTwo');
// };

$('#pageTwo' ).on('click', function (e) {
  e.preventDefault();
  imgArr = [];
  keywordFilter = [];
  $('div').remove();
  $('option').remove();
  $('select').prepend(`<option value="default"></option>`);
  $('option').text('Filter by Page Two Keywords');
  let pathTwo = '../data/page-2.json';
  Image.readJson (pathTwo);
});

$('#pageOne').on('click', function (e) {
  e.preventDefault();
  imgArr = [];
  keywordFilter = [];
  $('div').remove();
  $('option').remove();
  $('select').prepend(`<option value="default"></option>`);
  $('option').text('Filter by Page One Keywords');
  let pathOne = '../data/page-1.json';
  Image.readJson (pathOne);
});



















//     //selecting the parent & creating an option
//     $('select').append('<option class="clone"></option>');
//     $('option').append('<p></p>');
//     let $listClone = $('option[class="clone"]');
//     //fill the option
//     $listClone.find('option').text(this.keyword)
//     $listClone.removeClass('clone');
//     $listClone.attr('class', this.keyword);
//     //find the option
//     $listClone.find('p').text(this.keyword)



// Feature #2:
// 1. 'Listen' for click, on(click) run the event listener function
// 2. .show or .fadein anything that is equal to that keyword (?? .includes ??)
// 3. Reset button?

// create a global array holding unique arrays
// use unique array to make dropdown
// on('select change'), collect .this .hide all, .show classes that match keyword


// Image.prototype.renderList = function() {
//   //selecting the parent & creating an option
//   imgArr.forEach()

//   $('option').append('<p></p>');
//   let $listClone = $('option[class="clone"]');
//   //fill the option
//   $listClone.find('option').text(this.keyword)
//   $listClone.removeClass('clone');
//   $listClone.attr('class', this.keyword);
//   //find the option
//   $listClone.find('p').text(this.keyword)
