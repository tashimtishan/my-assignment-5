// getting the id's by variable
const buttons=document.querySelectorAll(".filter-btn")
const searchInput=document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn");
const issueCount = document.getElementById("issue-count");
const GithubIssueModal=document.getElementById("github-issue-modal");
const modal=document.getElementById("github-issue-modal");
const modalTitle=document.getElementById("modal-title");
const modalStatusBadge=document.getElementById("modal-status-badge");
const modalAuthor=document.getElementById("modal-author");
const modalDate=document.getElementById("modal-date");
const modalDescription=document.getElementById("modal-description");
const modalAssignee=document.getElementById("modal-assignee");
const modalPriority=document.getElementById("modal-priority");
const statusOne=document.getElementById("status-one");
const statusTwo=document.getElementById("status-two");
const statusModal=document.getElementById("status-modal");
let allIssues=[];

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        buttons.forEach(btn=>btn.classList.remove('btn-primary'))
        button.classList.add("btn-primary")
          const type = button.innerText.toLowerCase();
        filterIssues(type)
    })
})

const searchIssues=async(query) => {
    if(!query){
        displayissues(allIssues);
        return;
    }
   const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
   const data=await res.json();
    displayissues(data.data);
};


searchBtn.addEventListener("click",()=>{const query=searchInput.value.trim();
searchIssues(query);
});

searchInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchIssues(searchInput.value.trim());
    }
});

const updateIssueCount=(issues, type = "all") => {
    if(type==="open") {
        issueCount.innerText=`${issues.length} Open Issues`;
    } 
    else if (type==="closed"){
        issueCount.innerText=`${issues.length} Closed Issues`;
    } 
    else {
        issueCount.innerText=`${issues.length} Issues`;
    }
};

const LoadIssues=async()=>{
    const res=await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data=await res.json();
    allIssues=data.data
    displayissues(data.data)
};
LoadIssues()

// filter issues
const filterIssues=(type)=> {
    if (type==="all") {
        displayissues(allIssues, "all");
    }

    if (type==="open") {
        const openIssues=allIssues.filter(issue => issue.status === "open");
        displayissues(openIssues,"open");
    }

    if (type==="closed") {
        const closedIssues=allIssues.filter(issue => issue.status === "closed");
        displayissues(closedIssues,"closed");
    }
};

// open modal
const openModal=(issue)=>{
    modal.showModal();
    modalTitle.innerText=issue.title;

    
    modalStatusBadge.innerText=issue.status;
    modalStatusBadge.className=
    issue.status==="open"?"bg-green-500 text-white text-xs px-2 py-1 rounded-full":"bg-purple-500 text-white text-xs px-2 py-1 rounded-full";
    modalAuthor.innerText=`Opened by ${issue.author}`;
    modalDate.innerText=new Date(issue.createdAt).toLocaleDateString();
    modalDescription.innerText=issue.description;
    statusModal.innerHTML = (issue.labels ?? []).map(label => {let style = "bg-gray-100 text-gray-600 border-gray-300";
    if(label.toLowerCase()==="bug") {
        style="bg-[#FEECEC] border-[#FECACA] text-[#EF4444]";
    } 
    else if(label.toLowerCase()==="help wanted"){
        style = "bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]";
    }

    return `
        <span class="border rounded-full ${style} text-xs px-2 py-1">
            ${label}
        </span>
    `;
}).join("");
    modalAssignee.innerText=issue.assignee || "unassigned";
    modalPriority.innerText=issue.priority;
    modalPriority.className=issue.priority==="high"?"bg-red-500 text-white px-2 py-1 rounded-full text-sm":"bg-yellow-500 text-white px-2 py-1 rounded-full text-sm";

}


// displayissues section
const displayissues=(issues,type="all")=>{
    const container=document.getElementById("card-container");
    container.innerHTML="";
    updateIssueCount(issues, type);
    issues.forEach(issue=>{
        const card=document.createElement("div");

       card.className = `bg-white w-full max-w-[275px] rounded-lg shadow-sm border-t-4 ${
       issue.status === "open" ? "border-green-500" : "border-purple-500"
       } p-4 cursor-pointer hover:shadow-md transition`;
        card.innerHTML=`
                    <div class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                       <img src="${issue.status === "open" ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="${issue.status}"/>
                     </div>
                       ${(() => {let priorityStyle = "bg-gray-100 text-gray-600";
                       if (issue.priority.toLowerCase() === "high"){
                       priorityStyle = "bg-red-100 text-red-500";
                       } else if (issue.priority.toLowerCase() === "medium"){priorityStyle = "bg-yellow-100 text-yellow-600";}
                       return `
                       <span class="${priorityStyle} text-xs px-4 py-1 rounded-full font-medium">
                      ${issue.priority}
                      </span>
                    `;
                    })()}
                    </div>

                    <!-- title -->
                     <h2 class="font-semibold text-[16px] mb-1">${issue.title}</h2>

                     <!-- description -->
                      <p class="text-sm text-gray-500 mb-3">${(issue.description || "").slice(0, 60)}...</p>

                      <!-- label -->
                       <div class="flex gap-2 mb-3 flex-wrap">
                      ${(issue.labels ?? []).map(label => {let style = "bg-gray-100 text-gray-600";
                       if (label.toLowerCase() === "bug") {
                       style = "bg-red-100 text-red-500";
                      } else if (label.toLowerCase() === "help wanted") {
                      style = "bg-yellow-100 text-yellow-600";
                    }

                      return `
                      <span class="${style} text-xs px-3 py-1 rounded-full font-medium">
                      ${label}
                      </span>
                      `;
                      }).join("")
                      }
                      </div>

                       <!-- footer -->
                        <div class="border-t-1 border-[#E4E4E7] flex flex-col text-xs text-gray-400 mt-4">
                            <div class="mt-5 flex flex-col space-y-3 p-1">
                            <span>#${issue.id} by ${issue.author}</span><br>
                           <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
        `
        card.addEventListener("click",()=>{
            openModal(issue);
        })
        container.appendChild(card);
    })
}