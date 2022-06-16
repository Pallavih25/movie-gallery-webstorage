let cl = console.log;

const showModal = document.getElementById("showModal");
const backDrop = document.getElementById("backDrop");
const myModal = document.getElementById("myModal");
const addMovie = document.getElementById("addMovie");
const updateMovie = document.getElementById("updateMovie");
const deleteMovie = document.getElementById("deleteMovie");
const title = document.getElementById("title");
const imgurl = document.getElementById("imgurl");
const rating= document.getElementById("rating");
const info= document.getElementById("info");
const myClose = Array.from(document.querySelectorAll(".myClose"));

let movieArray =[];
if(localStorage.getItem("setMovie")){
  movieArray = JSON.parse(localStorage.getItem('setMovie'));
  templating(movieArray);
}



const showModalHandeler = (e) =>{
    // toggleShowClass(backDrop,"show");
    // toggleShowClass(myModal,"show");
  // backDrop.classList.add('show');
  // myModal.classList.add('show');
  toggleShowClass()
  
}

const onCloseHandler = (eve)=>{
  // backDrop.classList.remove('show');
  // myModal.classList.remove('show');
  // backDrop.classList.toggle('show');
  // myModal.classList.toggle('show');
  // toggleShowClass(backDrop,"show");
  // toggleShowClass(myModal,"show");
  toggleShowClass()
}

//  function toggleShowClass(ele,nameOfClass){
//        ele.classlist.toggle(nameOfClass);
//  }


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~get data~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     
const addMovieHandler =(eve)=>{
  let movieObj ={
    title :title.value,
    imgUrl :imgurl.value,
    rating :rating.value,
     id :uuid() 
  }
  movieArray.push(movieObj);
  localStorage.setItem('setMovie',JSON.stringify(movieArray));
  templating(movieArray)
  title.value ='';
  imgurl.value ='';
  rating.value ='';
  toggleShowClass();
}


// ~~~~~~~~~~~~~~~~~~~edit data~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 function onEditHandler(ele){
      let getId = ele.dataset.id;
      // cl(getId)
      localStorage.setItem('setId',getId);
      let getEditMovie = movieArray.find(movie => movie.id === getId)
      cl(getEditMovie);
      title.value =getEditMovie.title;
      imgurl.value = getEditMovie.imgUrl;
      rating.value = getEditMovie.rating;
      toggleShowClass();
      addMovie.classList.add('d-none');
      updateMovie.classList.remove('d-none');
 }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~update data~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onUpdateHandler(ele){
  let updateId = localStorage.getItem('setId')
  cl(updateId)
  movieArray.forEach(ele =>{
    if(ele.id === updateId){
      ele.title = title.value;
      ele.imgUrl =imgurl.value;
      ele.rating = rating.value;
    }
  })
  localStorage.setItem('setMovie',JSON.stringify(movieArray));
  templating(movieArray);
  toggleShowClass();
     addMovie.classList.remove('d-none');
     updateMovie.classList.add('d-none');
     title.value ='';
     imgurl.value ='';
     rating.value = '';
}

// ~~~~~~~~~~~~~~~~~~~~~delete data~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function onDeleteHandler(ele){
  let deletId = ele.dataset.id;
  cl(deletId)
  let newMovieArr = movieArray.filter(ele => ele.id != deletId);
  localStorage.setItem('setId',JSON.stringify(newMovieArr));
  templating(newMovieArr);
  toggleShowClass();
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~templating~~~~~~~~~~~~~~~~~~~~~

function templating(arr){
  let result = '';
  arr.forEach(obj =>{
      result += `<div class="col-md-4">
                    <div class="card">
                       <div class="card-body">
                          <h5>${obj.title}</h5>
                             <img src="${obj.imgUrl}" alt="">
                            <p>${obj.rating}/5</p>
                            <span class="editDelet">
                              <i class="far fa-edit" data-id=${obj.id} onclick="onEditHandler(this)"></i>
                              <i class="fas fa-trash" data-id=${obj.id} onclick="onDeletHandler(this)"></i>
                            </span>
                       </div>
                  </div>
               </div>`
  });
  info.innerHTML = result;
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 function toggleShowClass(){
    backDrop.classList.toggle('show');
    myModal.classList.toggle('show');
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

showModal.addEventListener('click',showModalHandeler);

addMovie.addEventListener('click',addMovieHandler)

updateMovie.addEventListener('click',onUpdateHandler);

deleteMovie.addEventListener('click',onDeleteHandler);

myClose.forEach((btn) =>{
  btn.addEventListener("click",onCloseHandler);
});