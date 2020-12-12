'use strict';
let pictureArray = [];






$.ajax('/data/page-1.json')
  .then(data => {
    console.log('Data ', data);
    data.forEach(pictureObject => {
      new PictureConstructor(pictureObject);
    });
    console.log('Picture Array ', pictureArray);
    displayPhotos();
    photoKeyword();
  });

function PictureConstructor(object) {
  this.description = object.description;
  this.horns = object.horns;
  this.imageUrl = object.image_url;
  this.keyword = object.keyword;
  this.name = object.title;
  pictureArray.push(this);
}

let displayPhotos = () => {
  //We take in the photo template element from the DOM
  let template = $('#photo-template').html();

  // Here we run a for each method on our array in order to itterate through each item and apply it to our DOM
  pictureArray.forEach(value => {
    //Apply photo template element to a let variable so that we can create multiple.
    let $newTemplate = $(`<section>${template}</section>`);
    console.log('Value ', value.description);
    $newTemplate.find('img').attr('src', value.imageUrl);
    $newTemplate.find('img').attr('alt', value.name);
    $newTemplate.find('h2').text(value.name);
    $newTemplate.addClass(value.keyword);
    $newTemplate.find('p').text(value.description);
    $('main').append($newTemplate);
    console.log($newTemplate.html());
  });
};


// This part was heavily carried by CODE REVIEW, but we now understand what is going on here.
let photoKeyword = () => {
  pictureArray.forEach(value => {

    const $keyword = $(`<option value="${value.keyword}">${value.keyword}</option>`);
    $('select').append($keyword);
    $('select').on('change', function (){
      //this.val() is grabbing the value of select.
      const keyword = $(this).val();
      $('section').hide();
      //showing anything with the class of the selected keyword.
      $(`.${keyword}`).show();
      if (keyword === 'default') {
        $('section').show();
      }
    });
  });
};
