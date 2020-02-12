'use strict';

let imgArr = [];

function Image (imgObject) {
  this.image_url = imgObject.image_url;
  this.title = imgObject.title;
  this.description = imgObject.description;
  this.keyword = imgObject.keyword;
  this.horns = imgObject.horns;
}

Image.prototype.create = function() {
  let source = $('#photo-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};

Image.readJson = (path) => {
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
  console.log('!!', imgArr);
  imgArr.forEach(horn => {
    console.log('!!', horn);
    $('#generateImages').append(horn.create());
  });
  renderList();
};

$(() => Image.readJson('../data/page-1.json'));

let keywordFilter = [];

function renderList () {
  keywordFilter = [];
  imgArr.forEach((keywordCheck) => {
    if(!keywordFilter.includes(keywordCheck.keyword)) {
      keywordFilter.push(keywordCheck.keyword);
      $('select').append(`<option>${keywordCheck.keyword}</option>`);
    }
  });
}

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

//filter by keyword
keywordFilter.forEach(function(value) {
  $('select') .append(`<option id="option_${value}">${value}</option>`);});

$('select').on('change', (event) => {
  let option = event.target.value;
  $('div').hide();
  $(`.${option}`).show();
});

$('input.sort').on('click', function (e) {
  e.preventDefault();
  console.log(this.value);
  if (this.value === 'horns') {
    imgArr.sort( (a,b) => {
      return b.horns - a.horns;
    });

    console.log(imgArr);
  }
  else if (this.value === 'title') {
    imgArr.sort( (a, b) => {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  }
  $('div').remove();
  Image.loadImage();
});

// Image.prototype.render = function() {
//   $('main').append('<div class="clone"></div>');
//   let $imageClone = $('div[class="clone"]');
//   let imageHtml = $('#photo-template').html();
//   $imageClone.html(imageHtml);
//   $imageClone.find('h2').text(this.title);
//   $imageClone.find('img').attr('src', this.image_url); $imageClone.find('img').attr('alt', this.title);
//   $imageClone.find('p').text(this.description);
//   $imageClone.removeClass('clone');
//   $imageClone.attr('class' , this.keyword);
// };
