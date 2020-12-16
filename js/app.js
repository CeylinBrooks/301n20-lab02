'use strict';
let pictureArray = [];
let pictureArray2 = [];
let currentPage = 0;




$.ajax('/data/page-1.json')
  .then(data => {
    console.log('Data ', data);
    data.forEach(pictureObject => {
      new PictureConstructor(pictureObject, pictureArray);
    });
    console.log('Picture Array ', pictureArray);
    displayPhotos(pictureArray, 'page1');
    photoKeyword(pictureArray);
  });

$.ajax('./data/page-2.json')
  .then(data => {
    console.log('Data ', data);
    data.forEach(pictureObject => {
      new PictureConstructor(pictureObject, pictureArray2);
    });
    console.log('Picture Array ', pictureArray2);
    displayPhotos(pictureArray2, 'page2');
    photoKeyword(pictureArray2);
  });


function PictureConstructor(object, whichArray) {
  this.description = object.description;
  this.horns = object.horns;
  this.imageUrl = object.image_url;
  this.keyword = object.keyword;
  this.name = object.title;
  whichArray.push(this);
}

// GET RID OF THIS SECTION HERE!
let displayPhotos = (arr, picturePage) => {
  //We take in the photo template element from the DOM
  // let template = $('#photo-template').html();

  // Here we run a for each method on our array in order to itterate through each item and apply it to our DOM
  arr.forEach(value => {
    //Apply photo template element to a let variable so that we can create multiple.
<<<<<<< HEAD
    let $newTemplate = $(`<section>${template}</section>`);
    console.log('Value ', value.description);
    $newTemplate.find('img').attr('src', value.imageUrl);
    $newTemplate.find('img').attr('alt', value.name);
    $newTemplate.find('h2').text(value.name);
    $newTemplate.addClass(value.keyword);
    let template = $('#template').html();
    let html = Mustache.render(template, { :value.description})
    // $newTemplate.find('p').text(value.description);
    $('main').append($newTemplate);
    console.log($newTemplate.html());
=======
    let $newTemp = $('#Temp1').html();
    let $render = Mustache.render($newTemp, {
      keyword: value.keyword,
      horns: value.horns,
      page: picturePage,
      name: value.name,
      imageUrl: value.imageUrl,
      description: value.description
    });
    $('main').append($render);
>>>>>>> 0d7a58f374e2e56238d6f790c1eefc580e0e18ff
  });
  $('.page2').hide();
};


// This part was heavily carried by CODE REVIEW, but we now understand what is going on here.
let photoKeyword = (arr) => {
  arr.forEach(value => {

    // const $keyword = $(`<option value="${value.keyword}">${value.keyword}</option>`);
    let $newTemp = $('#Temp2').html();
    let $render = Mustache.render($newTemp, {
      keyword: value.keyword
    });
    $('#keywords').append($render);
  });
};

$('#keywords').on('change', function () {
  //this.val() is grabbing the value of select.
  let keyword = $(this).val();
  $('section').hide();
  //showing anything with the class of the selected keyword.
  $(`.${keyword}`).show();
  if (keyword === 'default') {
    $('.page1').show();
  }
});

$('#sorting').on('change', function () {
  let keyword = $(this).val();
  $('main').empty();
  if (keyword === 'alphabetical') {
    displayPhotos(sortAb(pictureArray), 'page1');
    displayPhotos(sortAb(pictureArray2), 'page2');
    $('main').
  } else if (keyword === 'horns') {
    displayPhotos(sortHorns(pictureArray), 'page1');
    displayPhotos(sortHorns(pictureArray2), 'page2');
  }
  else {
    displayPhotos(pictureArray, 'page1');
  }
  if (currentPage === 1) {
    $('.page2').hide();
  } else if (currentPage === 2) {
    $('.page1').hide();
  } else if (currentPage === 0) {
    $('.page2').show();
    $('.page1').show();
  }
});

function sortAb(arr) {
  arr.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  });
  return arr;
}

function sortHorns(arr) {
  return arr.sort((a, b) => a.horns > b.horns ? 1 : -1);
}


$('button').on('click', function () {
  let $page = $(this).attr('id');

  if ($page === 'page1') {
    $('section').hide();
    $('.page1').show();
    currentPage = 1;
  }
  else if ($page === 'page2') {
    $('section').hide();
    $('.page2').show();
    currentPage = 2;
  }
});
