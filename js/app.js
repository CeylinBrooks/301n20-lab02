'use strict';

$.ajax('./data/page-1.json')
.then( data=> {
    data.title.forEach(title =>{
      console.log(title);
    });
  });
