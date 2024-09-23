let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let search=document.getElementById('search');
let search_title=document.getElementById('searchbytitle');
let search_category=document.getElementById('searchbycategory');
let mood='create';
let update_index;


// get total
function gettotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green';
    }
    else{
        total.style.background='red';

    }

}


//create product
// هنا عشان لما اضيف عنصر جديد ميمسحش القديم
let datapro;
if(localStorage.product !=null){
    datapro= JSON.parse(localStorage.product);
}
else{
    datapro=[];
}


// دي الفانكشن تحصل اول متغط عالزار
submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    
    }
    if(title.value!=''&& price.value!=''&& category.value!=''&& count.value<=100){

        if(mood==='create'){
            if(newpro.count>1){
                for(let i=1;i<newpro.count;i++){
                    datapro.push(newpro)
                }             
            }
            else {
                datapro.push(newpro)
            }
        }
        else{
            datapro[update_index]=newpro;
            mood='create';
            submit.innerHTML='create';
            count.style.display='block';
    
    
        }
        clear()


    }

    
    // localstorage
    localStorage.setItem('product',JSON.stringify(datapro))   //بس لو عملت ريلوود كل البيانات هتروح فلازم احفظ الداتا
    show();
}



// clear inputs

function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    title.value='';
    
}


// showdata 
function show(){
    gettotal();
    let table='';
    for(let i=1;i<datapro.length;i++)
        {
    table +=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="ubdate">ubdate</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>

                    
                </tr>
            `
        }
document.getElementById('tbody').innerHTML=table;
let deleteall=document.getElementById('deleteall');
if(datapro.length>0){
    deleteall.innerHTML=`<button onclick="deleteAll()" >Delete All (${datapro.length})</button>`    
}
else {
    deleteall.innerHTML=''
}

}

show();






//delete

function deletedata(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro)
    show()
    

}

//delete all
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    show()

}


// update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display='none'
    category.value=datapro[i].category;
    submit.innerHTML='update'
    mood='update';
    update_index=i;
    window.scroll({
        left:0,
        top:0,
        behavior:"smooth"
        
    })
    


    
}



// search
let searchmood='title'
function getsearchmood(id){
    if(id=='searchbytitle'){
        searchmood='title'
        search.placeholder='Search by title';

    }
    else{
        searchmood='category';
        search.placeholder='Search by category';

    }
    search.focus();
    search.value='';
    show();

}

function searchdata(value){
    let table='';
    if(searchmood==='title')  {
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="ubdate">ubdate</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>

                    
                </tr>
            `
        }

            }
        }
        else{
            for(let i=0;i<datapro.length;i++){
                if(datapro[i].category.includes(value.toLowerCase())){
                    table +=`
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="ubdate">ubdate</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    
                        
                    </tr>
                `
            }
    
                }

        }
        document.getElementById('tbody').innerHTML=table;

    }  
    
    


    




// clean data



 



