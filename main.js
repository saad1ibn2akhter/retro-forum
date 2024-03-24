const getData = async(textSearch=`posts`) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/${textSearch}`);
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    showAllpost(posts , true);
}

const showAllpost = (posts , shouldCleanCode ) =>{
    console.log(posts);
    const mainContainer = document.getElementById('news-container');
    toggleLoader(false);

        posts.forEach(post => {
            console.log(post);
            const postcard = document.createElement('div');
            postcard.classList = `p-2 flex flex-col space-x-1 space-y-2  items-start bg-blue-50 mb-5 rounded-lg hover:bg-green-200 transition-all shadow-2xl lg:flex-row lg:p-6 lg:space-x-6 lg:space-y-0`;
            
                postcard.innerHTML =
            `
            <div class="relative">
            <div>
              <img src="${post.image}" class="w-[64px] h-[64px] rounded-2xl online avatar placeholder bg-neutral text-neutral-content relative" alt="">
            </div>
            <div id="status" class="w-[3px] h-[3px] p-[9px] rounded-full bg-red-300 absolute bottom-[80%] left-[80%]"></div>
            </div>
                            <div class="mb-3 mx-1">
                                <div class="flex space-x-3 text-[14px] font-medium text-gray-700 pb-2">
                                    <h1># ${post.category}</h1>
                                    <h1>Author : ${post.author.name}</h1>
                                </div>
                                <div class="pb-2">
                                    <h1 class="text-[18px] font-semibold">${post.title}</h1>
                                    <h1 class="text-[14px] text-gray-700 lg:text-[15px]">${post.description}</h1>
                                </div>
                                <hr>
                                <div class="flex justify-between items-center pt-2">
                                    <div class="flex space-x-3">
                                        <div class="flex space-x-3">
                                            <img class="w-[28px] h-[28px]" src="message.png" alt="">
                                            <h1>${post.comment_count}</h1>
                                        </div>
                                        <div class="flex space-x-3">
                                            <img class="w-[28px] h-[28px]" src="eye.png" alt="">
                                            <h1>${post.view_count}</h1>
                                        </div>
                                        <div class="flex space-x-3">
                                            <img class="w-[28px] h-[28px]" src="time.png" alt="">
                                            <h1>${post.posted_time}</h1>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div class="flex items-center space-x-5 py-3">
                                   <h1 class="text-green-300 link link-success hover:text-white" onclick="addPost('${post.view_count}', '${post.title}')">Mark as Read</h1>
                                   <button class=""><img class="h-[36px] w-[36px] rounded-full" onclick="addPost('${post.view_count}', '${post.title}')" src="mail.jpeg" alt=""></button>
                                </div>
                            </div>
            `;
            const status = postcard.querySelector('#status');
            if(post.isActive){
                status.classList.add('bg-green-300');
                status.classList.remove('bg-red-300');
            }
            else{
                status.classList.add('bg-red-300');
                status.classList.remove('bg-green-300');
            }
           toggleLoader(false)
           
            mainContainer.appendChild(postcard);
        });
        
    
    
}
// onclick btton

const addPost = (tit, viewc) => {
    const savedPostContainer = document.getElementById('MarkedPost-container');
    const Count = document.getElementById('totalSavedPost');

    let count = parseInt(document.getElementById('totalSavedPost').innerText);

    const savedPost = document.createElement('div');
    savedPost.classList = `flex space-x-2 items-center justify-between bg-white rounded-xl p-4 mb-2 shadow-xl text-[13px]`; 

    const title = tit;
    const view = viewc;
    count++;

    savedPost.innerHTML =
    `
    <div>
        <h1>${view}</h1>
    </div>
    <div class="flex items-center space-x-2">
        <img src="eye.png" class="w-[28px] h-[28px]" alt="">
        <h1>${title}</h1>
    </div>
    `;

    console.log(title, view);
    Count.innerText = count;
    savedPostContainer.appendChild(savedPost);
}


const fetchPostAgain = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const x = data.posts;
    // console.log(x);

    showAllpost(x);
}

const handleSearchData = () =>
{
    const textelement = document.getElementById('searchText');
    const text = textelement.value;

    document.getElementById('news-container').innerHTML ='';
    document.getElementById('news-container').innerText ='';

    const cat = document.getElementById('category');
    cat.innerText = text;

    const categoryDescription = document.getElementById('category-description');

    if(text ==='coding'){
        categoryDescription.innerText = "Coding empowers dynamic websites to interact with users, fetching and displaying data through APIs seamlessly";
    }
    else if(text === 'music'){
        categoryDescription.innerText = "Music is a universal language, connecting people through emotions, memories, and shared experiences";
    }
    else if(text === 'comedy'){
        categoryDescription.innerText ="Comedy uplifts spirits, offering laughter, insight, and relief from life's complexities through clever wit and humor!";
    }
    else{
        categoryDescription.innerText = "TerTo Forum fosters creativity and connection. Users input keywords to spark engaging discussions on comedy, coding, or music.";
    }

    setTimeout(() => {
        const loader = document.getElementById('spinner');
        loader.classList.remove('hidden');
    }, -2000);
    setTimeout(() => {
        const loader = document.getElementById('spinner');
        loader.classList.add('hidden');
    }, 3000);
    fetchPostAgain(text);
    showAllpost();
}

const fetchLatest = async()  =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    console.log(data);
    // const posts  = data.posts;
    // console.log(pst)
    showLatest(data);
}

const showLatest = (posts) =>{
    console.log(posts);
    const container = document.getElementById('latest-news-container');
    posts.forEach(post =>{
        console.log(post);
        const postcard = document.createElement('div');
        postcard.innerHTML =`
        <div class="card w-93 bg-base-100 shadow-xl space-x-2 mx-3">
                    <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${post.title}</h2>
                      <div class="flex space-x-1 items-center">
                         <img src="date.png" class="w-[28px] h-[28px]">
                         <h1>${post.author.posted_date || "No Publish Date"}</h1>
                      </div>
                      <p class="text-[14px] text-gray-500 lg:text-[16px]">${post.description}</p>
                      <div class="flex space-x-2 items-start">
                        <div>
                            <img class="w-[36px] h-[36px] rounded-full" src="${post.profile_image}" alt="">
                        </div>
                        <div>
                            <h1 class="text-[14px] text-gray-800 font-bold lg:text-[16px]">${post.author.name || "Unknown"}</h1>
                            <h1 class="text-[13px] text-gray-700 lg:text-[15px]">${post.author.designation || "Unknown "}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
        `;
        container.appendChild(postcard);
    });

}
const toggleLoader = (isloading) =>{
    const loader = document.getElementById('main-spinner');
    if(isloading){
        loader.classList.remove('hidden');
    }
    else{
        loader.classList.add('hidden');
    }
}
// fetchPostAgain('coding');
fetchLatest();

getData();

