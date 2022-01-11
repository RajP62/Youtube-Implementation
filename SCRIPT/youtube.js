let dataUser = JSON.parse(localStorage.getItem("dataUser"));
let userName = dataUser[0].username;
let spanEl = document.getElementById("displayName");
spanEl.textContent = userName;
let mainCont = document.getElementById("content");
let key = "AIzaSyAnBaW48ziKnGqp-wJcZoZuyWom_CNt55M";
getTrendingData();

async function getData(){
    let inp = document.getElementById("searchInp").value;
    let body = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${inp}&type=video&key=${key}&maxResults=20&part=snippet`);
    let res = await body.json();
    appendData(res.items);
}

async function getTrendingData(){
    let body = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=${key}`);
    let res = await body.json();
    appendTrendingData(res.items);
}


function appendTrendingData(vedios){
    mainCont.innerHTML = null;
    vedios.forEach(({id,snippet:{title,channelTitle}})=>{
        let div = document.createElement("div");
        div.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}"/frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        let heading = document.createElement("h1");
        heading.textContent = title;
        let channelName = document.createElement("p");
        channelName.textContent = channelTitle;
        div.append(heading, channelName);
        mainCont.append(div)
    })
}



function appendData(vedios){
    mainCont.innerHTML = null;
    console.log(vedios)
    vedios.forEach(({id: {videoId},snippet:{title,channelTitle,description}}) =>{
        let div = document.createElement("div");
        console.log(title)
        div.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}"/frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        let heading = document.createElement("h1");
        heading.textContent = title;
        heading.style.fontSize = "15px"
        let channelName = document.createElement("p");
        channelName.innerText = channelTitle;
        channelName.style.fontSize = "10px"
        let desc = document.createElement("p");
        desc.innerText = description;
        desc.style.fontSize = "10px";
        div.append(heading,channelName,desc);
        mainCont.append(div);
    });

}

