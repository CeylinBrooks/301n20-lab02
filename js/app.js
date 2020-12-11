'use strict';
const pictureArray = []



function pictureConstructor(description, horns, imageUrl, keyword, name) {
  this.description = description
  this.horns = horns
  this.imageUrl = imageUrl
  this.keyword = keyword
  this.name = name
  pictureArray.push(this)
}


$.ajax('./data/page-1.json',)
  .then( data => {
  data.forEach(value => {
  let pictures = new pictureConstructor (value.description, value.horns, value.image_url, value.keyword, value.title)

  console.log(pictures)
  
  });
});

