let icon=document.querySelector(".icon");
popup=document.querySelector(".popup-box");
remove=document.querySelector("header i");
butn=document.querySelector("form button");
input=popup.querySelector("form input");
addBox=document.querySelector(".add-box");
textArea=popup.querySelector("form textarea");
let header_text=document.querySelector("header p");
const months=["January","February","March","April","May","June","July","August","September","October","November","December"];



let update=false,index_edit;

//get infromation from local strotage and paesing it to js object else passing an empty array to it
let arr=JSON.parse(localStorage.getItem("notes")||"[]");
Show();






butn.addEventListener("click",(e)=>{
    //    e.preventDefault();
       let input_text=input.value;
       let textArea_text=textArea.value;
       if(input_text||textArea_text)
       {
            let object=new Date();
            let month=months[object.getMonth()],
            day=object.getDate(),
            year=object.getFullYear();
            let obj={
                titile:input_text,
                description:textArea_text,
                date:`${month} ${day},${year}`
            };
        // console.log(obj);
        if(!update)
        {
            arr.push(obj);
        }
        else
        {
            arr[index_edit]=obj;
        }
        
        localStorage.setItem("notes",JSON.stringify(arr));
       }
       Show();
       remove.click();
    });







//add notes to page
function Show()
{
    document.querySelectorAll(".note").forEach(note =>note.remove());
    arr.forEach(function(note,index){
       let ele=`<li class="note">
            <div class="details">
                <p>${note.titile}</p>
                <span>${note.description}</span>
            </div>
        <div class="bottom-content">
                <span>${note.date}</span>
                <div class="settings">
                    <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded' ></i>
                    <ul class="menu">
                        <li onclick="EDIT(${index})"><i class='bx bx-pencil' ></i>Edit</li>
                        <li onclick="DELETE(${index})"><i class='bx bx-trash' ></i>Delete</li>
                    </ul>
                </div>
            </div>
        </li>`;
        addBox.insertAdjacentHTML("afterend",ele);
    });
}
icon.addEventListener("click",()=>{
    popup.classList.add("show");
    input.focus();
    butn.innerHTML="Add Note";
    header_text.innerHTML="Add a new Note";
  });
remove.addEventListener("click",()=>{
    input.value="";
    textArea.value="";
    popup.classList.remove("show");
});


function showMenu(ele)
{
    ele.parentElement.classList.add("show");
    document.addEventListener("click",e => {
         if(e.target.tagName !="I" || e.target !=ele)
         {
            ele.parentElement.classList.remove("show");
         }
    })
}



function EDIT(index)
{   
    update=true;
    index_edit=index;
    console.log("hello");
    popup.classList.add("show");
    input.focus();
    input.value=arr[index].titile;
    textArea.value=arr[index].description;
    butn.innerHTML="Update Note";
    header_text.innerHTML="Update a Note";
    
}





function DELETE(index)
{   let conf=confirm("Are you sure you want to delete this note?");
    if(!conf)
    {
        return;
    }
    arr.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(arr));
    Show();
}

