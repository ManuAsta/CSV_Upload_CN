//when the page loads, store the table in a temporary array at the frontend, so that we can do sorting and other functions easily
const tableContainer=document.getElementById('table-container');
let filesArray=JSON.parse(tableContainer.dataset["array"]);
//console.log(filesArray);
//console.log(headings);

//for pagination
let lowerLimit=0;
let upperLimit=0;
let paginatedArray=[];
//console.log(paginatedArray);
let totalEntries=filesArray.length;


function setEntries(){
    const entries=document.getElementById("entries");
    if(filesArray.length==0){
        entries.innerHTML=`
        0-0 /[0]
        `
        return;
    }
    entries.innerHTML=`
        ${lowerLimit+1}-${upperLimit} /[${totalEntries}]
    `;
}



//table exists for the whole page
const table=document.createElement('table');
table.style.border="2px solid black";
table.className="table table-bordered border-dark";
table.id="csv-table";
let tbody=document.createElement('tbody');
tbody.id="table-body";

function appStart(){
    upperLimit=filesArray.length>10? 10:filesArray.length;
    setPageRange(0,upperLimit);
    renderTable(paginatedArray);
}   

appStart();






function renderTableHead(filesArray){
    const headings=Object.keys(filesArray[0]);
    //table heading
    const thead=document.createElement('thead');
    //append the thead first
    headings.forEach((heading)=>{
        const th=document.createElement('th');
        th.innerHTML=`
        ${heading}
        <button class="sort-button" data-sort="${heading}">
            <img src="/images/sort.png" alt="sort" width="20px">
        </button>
        `;
        thead.appendChild(th);
    });
    table.append(thead);
    //adding the tablebody here itself
    tableContainer.append(table);
}

function renderTableBody(array){
    if(filesArray.length==0)return;
    const headings=Object.keys(array[0]);
     //table body
     //clear the table body first
     tbody.innerHTML="";
     array.forEach((file)=>{
         const tr=document.createElement('tr');
         headings.forEach((heading)=>{
             const td=document.createElement('td');
             td.innerHTML=`
                 ${file[heading]}
             `;
             tr.appendChild(td);
         })
         tbody.appendChild(tr);
     });
     table.append(tbody);
 
     //table footer
     const tfoot=document.createElement('tfoot');
     table.appendChild(tfoot);
     tableContainer.append(table);
}

function renderTable(array){
    //clearing the table first
    tableContainer.innerHTML="";
    if(array.length==0){
        showNoEntries();
        return;
    }
    //head and body seperate cuz we just want to sort the body, the head remains the same
    renderTableHead(array);
    renderTableBody(array);
} 

function showNoEntries(){
    tableContainer.innerHTML=`
        <h1>No Entries on this file!</h1>
    `
}










/**implementing the sorting feature */

const sortButtons=document.querySelectorAll('.sort-button');
//console.log(sortButtons);
//adding event listeners to all the buttons

//storing the sorting order for each column
let sortingOrder={};
sortButtons.forEach((sortButton)=>{
    const columnToSort=sortButton.dataset["sort"];
    sortingOrder[columnToSort]="asc";
    sortButton.addEventListener('click',()=>sortColumn(columnToSort,paginatedArray));
});
//console.log(sortingOrder);

function sortColumn(column,array){
  // console.log(column);
  if(array.length==0)return;
  //console.log(array);
  //sort in lexographial order if not a number
  if(isNaN(array[0][column])){ 
    if(sortingOrder[column]=="asc"){
        array.sort((a,b)=>a[column]>b[column]? 1:-1);
        sortingOrder[column]="desc"
    }else{
        array.sort((a,b)=>a[column]>b[column]? -1:1);
        sortingOrder[column]="asc"
    }
  }else{
    //sort in magnitude, if a number
    if(sortingOrder[column]=="asc"){
        array.sort((a,b)=>a[column]-b[column]);
        sortingOrder[column]="desc"
    }else{
        array.sort((a,b)=>b[column]-a[column]);
        sortingOrder[column]="asc"
    }
  }
  renderTableBody(array);
}





//implementing the search feature
const searchBar=document.getElementById('search');
// console.log(searchBar);
searchBar.addEventListener("input",handleSearch);

function handleSearch(e){
   // console.log(e.target.value);
    const word=e.target.value;
   //for an empty search bar, it should show the whole list
   if(word.length==0 || word.trim().length==0){
        renderTableBody(paginatedArray);
        return;
   }
   //console.log(word);
   //else loop through all the object words and filter those array which has the word
   const headings=Object.keys(paginatedArray[0]);
   const filteredArray =paginatedArray.filter((file)=>{
        //return only those files that satisfy the condition
        return headings.some((heading)=>file[heading].toLowerCase().includes(word.toLowerCase()))
   });
   //console.log(filteredArray);
   if(filteredArray.length==0){
    showNoMatches();
    return;
   }
   renderTableBody(filteredArray);
}

function showNoMatches(){
    tbody.innerHTML=`
        <h2>No Matches for this search</h2>
    `
}






//implementing pagination
const showEntriesBtn=document.querySelectorAll('.pagination-btn');
// console.log(showEntriesBtn);

//add event listener
showEntriesBtn.forEach((showEntry)=>{
    showEntry.addEventListener('click',(e)=>{
     // console.log(e.target.innerHTML);
     const numOfRowsPerPage=Number(e.target.innerText);
     showEntriesPerPage(numOfRowsPerPage);
    })
});

function showEntriesPerPage(numOfRowsPerPage){
   // console.log(numOfRowsPerPage);
    if(numOfRowsPerPage>totalEntries)return;
    setPageRange(0,numOfRowsPerPage);
}

function setPageRange(low,high){
    lowerLimit=low;
    upperLimit=high;
   // console.log(lowerLimit);
    paginatedArray=filesArray.slice(lowerLimit,upperLimit);
    console.log(paginatedArray);
    renderTableBody(paginatedArray);
    setEntries();
    setDisabled();
}

//for setting disabled to page buttons
function setDisabled(){
    const pageBtns=document.querySelectorAll(".page-btn");
    if(lowerLimit==0){
        //no where to move to previous page, so disable the button
        pageBtns[0].disabled=true;
    }else{
        pageBtns[0].disabled=false;
    }

    if(upperLimit>=filesArray.length){
        pageBtns[1].disabled=true;
    }else{
        pageBtns[1].disabled=false;
    }
}


//for moving between pages
const pageBtns=document.querySelectorAll(".page-btn");
pageBtns.forEach((pageBtn)=>{
    pageBtn.addEventListener('click',()=>{
        //console.log("Hello");
        if(pageBtn.id==="next"){
            //console.log("hi");
            const low=lowerLimit+paginatedArray.length;
            const high=upperLimit+paginatedArray.length;
            setPageRange(low,high);
        }else{
            const low=lowerLimit-paginatedArray.length;
            const high=upperLimit-paginatedArray.length;
            setPageRange(low,high);
        }
    })
})

