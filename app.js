// "data": {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }
const loadAllCards =()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=> res.json())
    .then(data=> displayAllCards(data.data));
}

const loadCardDetails = async( id)=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch (url);
    const details = await res.json()
    displayCardDetails(details.data)
}
const displayCardDetails=(details)=>{
    console.log(details)
    const detailsContainer = document.getElementById("deails-container")
    detailsContainer.innerHTML = `
    <div class="space-y-5">
                    <div>
                        <h1 class="text-3xl mb-3 font-bold">Fix broken image uploads</h1>
                        <div class=" flex items-center gap-8">
                            <button class="btn btn-active text-sm text-white bg-green-500 rounded-full"> Opened</button>
                            <li class="text-sm text-gray-500">Opened by ${details.author}</li>
                            <li class="text-sm text-gray-500">>${details.updatedAt}</li>
                        </div>
                    </div>
                    <div class="highlight-help flex items-center gap-3">
                        <li
                            class="list-none text-[14px] text-red-500 bg-red-100 rounded-full px-[6px] py-1 border border-red-300">
                            <i class="fa-solid fa-bug p-[2px] mr-1"></i>BUG
                        </li>
                        <li
                            class="list-none text-[14px] text-yellow-700 bg-yellow-100 px-[6px] py-1 rounded-full border border-yellow-300">
                            <i class="fa-solid fa-life-ring mr-1"></i>HELP
                            WANTED
                        </li>
                    </div>
                    <p class="text-md text-gray-500">
                        The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive
                        behavior.
                    </p>
                    <div class="flex w-[100%] bg-gray-100 rounded-sm p-5 ">
                        <div class="left flex-1 px-5">
                            <h4 class="text-gray-500 mb-1">Assignee:</h4>
                            <h3>Fahim ahmed</h3>
                        </div>
                        <div class="right flex-1 px-5 ">
                            <h4 class="text-gray-500 mb-1 ml-2">Priority:</h4>
                            <button class="btn priority rounded-full text-sm  px-5 ">${details.priority.toUpperCase()}</button>
                        </div>
                    </div>
                </div>
    `;
    //priority
        const priority = detailsContainer.querySelector(".priority");
        if(details.priority =="low"){
            priority.classList.add("low");
        }
        else if(details.priority =="medium"){
            priority.classList.add("medium");
        }
        else if(details.priority =="high"){
            priority.classList.add("high");
        };
    document.getElementById("my_modal_5").showModal();
}
//remove active from tab
function removeActive(){
    const tabBtn = document.querySelectorAll(".tab-btn")
        tabBtn.forEach(btn => {
            btn.classList.remove("btn-primary","text-white" )
            btn.classList.add("text-gray")
        });
}

const displayClosedcards =()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=> res.json())
    .then(data=> {
        const allCards = data.data;
        const allCardContainer = document.getElementById("all_card_container");
        allCardContainer.innerHTML =""
        allCards.forEach(card => {
            
            if(card.status === "closed"){
                const div = document.createElement("div")
                div.innerHTML= `
                <!-- card -->
                <div class="color-card  rounded-md"> <!-- for top coloring -->
                    <div onclick="loadCardDetails(${card.id})" class="card bg-[#FBFBFB] flex justify-start  shadow-md flex-col ">
                        <div class="card-main space-y-5 p-7  ">
                            <div class="uppersection flex justify-between w-[100%]">
                                <div class="status h-8 w-8  rounded-full flex justify-center items-center">
                                    <p class="status-p h-5 w-5 border-2 border-dashed 0 rounded-full "></p>
                                </div>
                                <div
                                    class="priority  rounded-full flex justify-center items-center px-5 ">
                                    ${card.priority.toUpperCase()}
                                </div>
                            </div>
                            <div class="title ">
                                <h2 class="text-xl font-semibold pb-4">${card.title} / </h2>
                                <p class="text-md text-gray-500">${card.description}
                                </p>
                            </div>
                            <div class="highlight-help flex items-center gap-3">
                                <li
                                    class="list-none text-red-500 bg-red-100 rounded-full px-2 py-1 border border-red-300">
                                    <i class="fa-solid fa-bug p-1 mr-1"></i>BUG
                                </li>
                                <li
                                    class="list-none text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full border border-yellow-300">
                                    <i class="fa-solid fa-life-ring mr-1"></i>HELP
                                    WANTED
                                </li>
                            </div>
                        </div>
                        <hr class="border border-gray-200">
                        <div class="p-3 text-gray-500 space-y-2">
                            <p id="author text-[16px]">${card.author}</p>
                            <p id="createdAt text-1xl">${card.createdAt}</p>
                        </div>
                    </div>
                </div>
        `
        //priority
        const priority = div.querySelector(".priority");
        if(card.priority =="low"){
            priority.classList.add("low");
        }
        else if(card.priority =="medium"){
            priority.classList.add("medium");
        }
        else if(card.priority ==="high"){
            priority.classList.add("high");
        };

        //status
        const status = div.querySelector(".status");
        const statusP = div.querySelector(".status-p");
        const colorCard = div.querySelector(".color-card");
        if(card.status === "open"){
            status.classList.add("bg-green-200");
            statusP.classList.add("border_color_g");   
            colorCard.classList.add("border-t-4","border-t-green-500")
        }else{
            colorCard.classList.add("border-t-4","border-t-purple-500");
            status.classList.add("bg-purple-200")
            status.innerHTML =`
            <i class="fa-regular fa-circle-check text-purple-500"></i>` 
        }
        // active clicked button
        removeActive()
        const tabClosed = document.getElementById("colsed-tab")
        tabClosed.classList.add("btn-primary", "text-white");
        allCardContainer.append(div);
        }
        });
    });
}

const displayOpenCards =()=>{

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=> res.json())
    .then(data=> {
        const allCards = data.data;
        const allCardContainer = document.getElementById("all_card_container");
        allCardContainer.innerHTML =""
        allCards.forEach(card => {
            
            if(card.status == "open"){
                const div = document.createElement("div")
                div.innerHTML= `
                <!-- card -->
                <div class="color-card rounded-md "> <!-- for top coloring -->
                    <div onclick="loadCardDetails(${card.id})" class="card bg-[#FBFBFB] flex justify-start  shadow-md flex-col ">
                        <div class="card-main space-y-5 p-7  ">
                            <div class="uppersection flex justify-between w-[100%]">
                                <div class="status h-8 w-8  rounded-full flex justify-center items-center">
                                    <p class="status-p h-5 w-5 border-2 border-dashed 0 rounded-full "></p>
                                </div>
                                <div
                                    class="priority  rounded-full flex justify-center items-center px-5 ">
                                    ${card.priority.toUpperCase()}
                                </div>
                            </div>
                            <div class="title ">
                                <h2 class="text-xl font-semibold pb-4">${card.title} / </h2>
                                <p class="text-md text-gray-500">${card.description}
                                </p>
                            </div>
                            <div class="highlight-help flex items-center gap-3">
                                <li
                                    class="list-none text-red-500 bg-red-100 rounded-full px-2 py-1 border border-red-300">
                                    <i class="fa-solid fa-bug p-1 mr-1"></i>BUG
                                </li>
                                <li
                                    class="list-none text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full border border-yellow-300">
                                    <i class="fa-solid fa-life-ring mr-1"></i>HELP
                                    WANTED
                                </li>
                            </div>
                        </div>
                        <hr class="border border-gray-200">
                        <div class="p-3 text-gray-500 space-y-2">
                            <p id="author text-[16px]">${card.author}</p>
                            <p id="createdAt text-1xl">${card.createdAt}</p>
                        </div>
                    </div>
                </div>
        `
        //priority
        const priority = div.querySelector(".priority");
        if(card.priority =="low"){
            priority.classList.add("low");
        }
        else if(card.priority =="medium"){
            priority.classList.add("medium");
        }
        else if(card.priority ==="high"){
            priority.classList.add("high");
        };

        //status
        const status = div.querySelector(".status");
        const statusP = div.querySelector(".status-p");
        const colorCard = div.querySelector(".color-card");
        if(card.status === "open"){
            status.classList.add("bg-green-200");
            statusP.classList.add("border_color_g");   
            colorCard.classList.add("border-t-4","border-t-green-500")
        }else{
            colorCard.classList.add("border-t-4","border-t-purple-500");
            status.classList.add("bg-purple-200")
            status.innerHTML =`
            <i class="fa-regular fa-circle-check text-purple-500"></i>` 
        }
        // active clicked button
        removeActive()
        const tabOpen = document.getElementById("tab-open")
        tabOpen.classList.add("btn-primary", "text-white");
        allCardContainer.append(div);
        }
        });
    });
    
}


const displayAllCards = (allCards)=>{
    removeActive()
        const allTab = document.getElementById("all-tab")
        allTab.classList.add("btn-primary", "text-white");

    const allCardContainer = document.getElementById("all_card_container");
    allCardContainer.innerHTML =""
    allCards.forEach(card => {

        const div = document.createElement("div")
        div.innerHTML= `
        <!-- card -->
                <div id="" class="color-card  rounded-md shadow-md"> <!-- for top coloring -->
                    <div onclick="loadCardDetails(${card.id})" class="card bg-[#FBFBFB] flex justify-start   flex-col ">
                        <div class="card-main space-y-5 p-7  ">
                            <div class="uppersection flex justify-between w-[100%]">
                                <div class="status h-8 w-8  rounded-full flex justify-center items-center">
                                    <p class="status-p h-5 w-5 border-2 border-dashed 0 rounded-full "></p>
                                </div>
                                <div
                                    class="priority  rounded-full flex justify-center items-center px-5 ">
                                    ${card.priority.toUpperCase()}
                                </div>
                            </div>
                            <div class="title ">
                                <h2 class="text-xl font-semibold pb-4">${card.title} / </h2>
                                <p class="text-md text-gray-500">${card.description}
                                </p>
                            </div>
                            <div class="highlight-help flex items-center gap-3">
                                <li
                                    class="list-none text-red-500 bg-red-100 rounded-full px-2 py-1 border border-red-300">
                                    <i class="fa-solid fa-bug p-1 mr-1"></i>BUG
                                </li>
                                <li
                                    class="list-none text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full border border-yellow-300">
                                    <i class="fa-solid fa-life-ring mr-1"></i>HELP
                                    WANTED
                                </li>
                            </div>
                        </div>
                        <hr class="border border-gray-200">
                        <div class="p-3 text-gray-500 space-y-2">
                            <p id="author" class ="text-[16px]">${card.author}</p>
                            <p id="createdAt " class= "text-1xl">${card.createdAt}</p>
                        </div>
                    </div>
                </div>
        `
        //priority
        const priority = div.querySelector(".priority");
        if(card.priority =="low"){
            priority.classList.add("low");
        }
        else if(card.priority =="medium"){
            priority.classList.add("medium");
        }
        else if(card.priority ==="high"){
            priority.classList.add("high");
        
        };

        //status
        const status = div.querySelector(".status");
        const statusP = div.querySelector(".status-p");
        const colorCard = div.querySelector(".color-card");
        if(card.status === "open"){
            status.classList.add("bg-green-200");
            statusP.classList.add("border_color_g");   
            colorCard.classList.add("border-t-4","border-t-green-500")
        }else{
            colorCard.classList.add("border-t-4","border-t-purple-500");
            status.classList.add("bg-purple-200")
            status.innerHTML =`
            <i class="fa-regular fa-circle-check text-purple-500"></i>` 
        }

        allCardContainer.append(div);
    });
}
loadAllCards();