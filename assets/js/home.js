const csvForm=document.getElementById("csv-form");

csvForm.onsubmit=handleSubmit;

function handleSubmit(e){

    //putting a check on the file name
    const fileInput= document.querySelector('input[name="csv-file"]');
    //console.log(fileInput.files); //accessing the files property of input type file
    const fileName=fileInput.files[0].name;
    //console.log(fileName);
    if(fileName.length>100){
        alert("File name is too long, file name shouldn't exceed 100 Characters");
        e.preventDefault();
        return;
    }
  //  e.preventDefault();
}