// SECTIONS TOGGLING
const cards_container = document.querySelector('.cards-container');
const card_users = document.getElementById('card-users');
const explore_btn = document.getElementById('explore_btn');
const lounge_btn = document.getElementById('lounge_btn');
const joined_today_btn = document.getElementById('joined_today_btn');
const chats_btn = document.getElementById('chats_btn');

// lounge html
let lounge_html = `<div class="lounge-cards">
                        <h4><span id="liked_users_count">0</span> Liked :)</h4>
                        <div class="liked_user"></div>
                        <h4><span id="liked_me_count">0</span> Liked Me ;)</h4>
                        <div class="liked_by_user"></div>
                        <h4><span id="matches_count">0</span> Matches ^_^</h4>
                        <div class="matches"></div>
                    </div>`;

// joined today html
let joined_today_html = `<div class="joined-today-cards">
                            <h4><span id="joined_today_count">0</span> Joined Today</h4>
                            <div class="joined-today"></div>
                        </div>`;

// chats html
let chats_html = `<div class="chats-cards">
                            <h4><span id="chats_count">0</span>Chats</h4>
                            <div class="chats"></div>
                        </div>`;

function render_lounge_card(userData, container){

    // calculating user's age
    let age = (new Date().getFullYear()) - parseInt(userData.birth_date);

    container.innerHTML = `<div class="lounge-card">
                        <img src="${userData.profile_image}" alt="user profile photo" class="user-profile-img" id="user_profile_img">

                        <i class="material-icons" id="remove_card">clear</i>

                            <!-- user info -->
                            <div class="user-info">

                                <div class="info-header">
                                    <h3 class="user-name" id="user_name">${userData.name}</h3>
                                    <h4>
                                        <span id="user_age">${age}</span> Years old
                                        <span id="user_gender">${userData.gender}</span> 
                                        From <span id="user_planet">${userData.planet}</span> 
                                    </h4>
                                </div>

                                <p class="user-biography" id="user_biography">${userData.biography}</p>

                                <div class="card-footer">
                                    <i class="material-icons lounge-close-btn" id="x_user">clear</i>
                                    <i class="material-icons lounge-like-btn" id="lounge_card_btn">favorite</i>
                                </div>

                        </div>`;
};

let users_data_array = [];
// declaring cards count
let liked_users_count;
let liked_me_count;
let matches_count;

// declaring lounge cards containers
let liked_users_container;
let liked_by_container;
let matches_container;

// render explore page html
explore_btn.addEventListener('click', ()=>{
    window.location.reload();
});

// render liked page html
lounge_btn.addEventListener('click', ()=>{
    
    // insert lounge html
    cards_container.innerHTML = lounge_html;

    // assigning cards count
    liked_users_count = document.getElementById('liked_users_count');
    liked_me_count = document.getElementById('liked_me_count');
    matches_count = document.getElementById('matches_count');

    // assigning cards containers
    liked_users_container = document.querySelector('.liked_user');
    liked_by_container = document.querySelector('.liked_by_user');
    matches_container = document.querySelector('.matches');

    //fetched & rendered users html
    fetch_liked();
    fetch_liked_by();
    fetch_matches();

});

// render joined today page html
joined_today_btn.addEventListener('click', ()=>{
    
    // insert lounge html
    cards_container.innerHTML = joined_today_html;

    // assigning cards count
    joined_today_count = document.getElementById('joined_today_count');

    // assigning cards containers
    joined_today_container = document.querySelector('.joined-today');

    //fetched & rendered users html
    fetch_joined_today();

});

// fetch joined today users
function fetch_joined_today(){
    
    fetch(`http://localhost/interstellar_date_server/joined_today.php`)
    .then(response => response.json())
    .then((data)=>{
        joined_today_count.innerText = data.length;
        // likes_user is default state but dont actually mean user was liked
        let state = 'likes_user';
        render_users_cards(data, state, joined_today_container);
    });
    
}

// fetch liked users
function fetch_liked(){
    
    fetch(`http://localhost/interstellar_date_server/liked_users.php?logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        liked_users_count.innerText = data.length;
        let state = 'liked_by_user';
        render_users_cards(data, state, liked_users_container);
    });
    
}

// fetch liked by users
function fetch_liked_by(){
    
    fetch(`http://localhost/interstellar_date_server/liked_by.php?logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        liked_me_count.innerText = data.length;
        let state = 'likes_user';
        render_users_cards(data, state, liked_by_container)
    });
    
}

// fetch matches users
function fetch_matches(){
    
    fetch(`http://localhost/interstellar_date_server/matches.php?logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        matches_count.innerText = data.length;
        let state = 'match';
        render_users_cards(data, state, matches_container)
    });
    
}

// render users cards
let card_index = 0;
function render_users_cards(users, state, container){

    for(user of users){

        // inserting user data in array
        users_data_array.splice(card_index, 0, user);
        
        // calculating user's age
        let age = (new Date().getFullYear()) - parseInt(user.birth_date);

        container.innerHTML +=`<div class="lounge-user-card" id="${user.id}" index="${card_index}" state="${state}">
                                <img src="${user.profile_image}" class="lounge-card-profile-photo">
                                
                                <h5 class="lounge-card-info">
                                <span class="lounge-card-username">${user.name}</span>
                                <span class="lounge-card-age">${age}</span>
                                </h5>
                            
                            </div>`;

        // increment incex of card in cards array
        card_index += 1;
    };

    // add event listener to all user cards
    const lounge_user_card = Object.values(document.getElementsByClassName('lounge-user-card'));
        
        lounge_user_card.forEach(element => {
            element.addEventListener('click', ()=>{
                // getting index of elements
                let index = element.getAttribute('index');
                render_lounge_card(users_data_array[index], cards_container);
                
                // Removing card 
                document.getElementById('remove_card').addEventListener('click', ()=>{
                    // clearing cards container
                    cards_container.innerHTML = lounge_html;
                    // assigning cards containers
                    liked_users_container = document.querySelector('.liked_user');
                    liked_by_container = document.querySelector('.liked_by_user');
                    matches_container = document.querySelector('.matches');
                    //fetched & rendered users html
                    fetch_liked();
                    fetch_liked_by();
                    fetch_matches();
                });
        
            // card's varying button
            let lounge_card_btn = document.getElementById('lounge_card_btn');

            // rendering different buttons depending on the card's state
                if(element.getAttribute('state') == 'liked_by_user'){
                    lounge_card_btn.style.display = 'none';
                    console.log(element.getAttribute('state'))
                }else if(element.getAttribute('state') == 'likes_user'){
                    lounge_card_btn.innerHTML = '<i class="material-icons lounge-like-btn" id="lounge_card_btn">favorite</i>';
                    lounge_card_btn.style.border = 'none';
                }else if(element.getAttribute('state') == 'match'){
                    lounge_card_btn.innerHTML = '<i class="material-icons lounge-like-btn" id="lounge_card_btn">chat</i>';
                    lounge_card_btn.style.border = 'none';
                }

        // add event listener to all user cards
        const lounge_like_btn = Object.values(document.getElementsByClassName('lounge-like-btn'));
        // liking user
        lounge_like_btn.forEach(element => {
            element.addEventListener('click', ()=>{
                    like_user_function(users_data_array[index].id, logged_user_id);
                    // giving it close btn functionality
                    remove_card.click();
                });
            });

        // add event listener to all user cards
        const lounge_close_btn = Object.values(document.getElementsByClassName('lounge-close-btn'));
        // liking user
        lounge_close_btn.forEach(element => {
            element.addEventListener('click', ()=>{
                    // giving it close btn functionality
                    remove_card.click();
                });
            });
        });
    });
};

    
// HOME-USERS JS
let logged_user_id = localStorage.getItem('logged_user_id');
let rendered_user_id;
let users_data;  

// filter drop-down js
const filter_dropdown = document.querySelector('.filter-dropdown');
const filter_drop_down_btn = document.getElementById('filter_drop_down_btn');
const apply_filter = document.getElementById('apply_filter');
const planet_filter = document.getElementById('planet_filter');
const gender_filter = document.getElementById('gender_filter');

filter_drop_down_btn.addEventListener('click', ()=>{
    if(filter_dropdown.style.display != 'block'){
        filter_dropdown.style.display = 'block';
    }else{
        filter_dropdown.style.display = 'none';
    }
});

// Apply filters
apply_filter.addEventListener('click', ()=>{
    filter_dropdown.style.display = 'none';

    fetch_filtered_users(planet_filter.value, gender_filter.value, min_age_filter.value, max_age_filter.value);
});

// age range
const min_age_filter = document.getElementById('min_age_filter');
const max_age_filter = document.getElementById('max_age_filter');

// min age indicator
min_age_filter.setAttribute('min_age', min_age_filter.value);
    
min_age_filter.addEventListener('input', ()=>{
    min_age_filter.setAttribute('min_age', min_age_filter.value);
});

// max age indicator
max_age_filter.setAttribute('max_age', max_age_filter.value);
    
max_age_filter.addEventListener('input', ()=>{
    max_age_filter.setAttribute('max_age', max_age_filter.value);
});


// FETCHING USERS
// filter fetch
function fetch_filtered_users(planet, gender, min_age, max_age){

    fetch(`http://localhost/interstellar_date_server/users.php?planet=${planet}&gender=${gender}&min_age=${min_age}&max_age=${max_age}&logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        users_data = data;
        render_users(data, 0);
    });

};
// search fetch
function fetch_searched_users(name){

    fetch(`http://localhost/interstellar_date_server/search_user.php?user_name=${name}&logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{

        // render search result count
        search_result.innerText = `${users_data.length} results`;

        // color result
        if(users_data.length > 0){
            search_result.style.color = 'rgb(0, 200, 0)';
        }else{
            search_result.style.color = 'red';
        }

        // empty result
        if(!search_input.value){
            search_result.innerText = ' ';
        }

        // update user data
        users_data = data;
        // render user
        render_users(data, 0);
    });
};

// initial fetch
// fetch_filtered_users('', '', '', '');
window.addEventListener('load', ()=>{
    fetch(`http://localhost/interstellar_date_server/search_user.php?logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        users_data = data;
        render_users(data, 0);
    });
});


// SEARCH USER
const search_input = document.getElementById('search_input');
const search_result = document.getElementById('search_result');

search_input.addEventListener('input', ()=>{
    fetch_searched_users(search_input.value);

});


// RENDERING USERS
const user_name = document.getElementById('user_name');
const user_age = document.getElementById('user_age');
const user_gender = document.getElementById('user_gender');
const user_planet = document.getElementById('user_planet');
const user_biography = document.getElementById('user_biography');
const user_profile_img = document.getElementById('user_profile_img');
let user_index = 0;
let current_date = new Date().getFullYear();
// NEXT & LIKE USERS
const x_user = document.getElementById('x_user');
const like_user = document.getElementById('like_user');

// RENDER USERS
function render_users(data, index){
    
    let age = current_date -  parseInt(data[index].birth_date); 
    // inserting user data
    user_name.innerText = data[index].name;
    user_age.innerText = age;
    user_gender.innerText = data[index].gender;
    user_planet.innerText = data[index].planet;
    user_biography.innerText = data[index].biography;
    user_profile_img.src = data[index].profile_image;

    // update rendered user id
    rendered_user_id = data[index].id;
};

// NEXT USER
x_user.addEventListener('click', ()=>{

    if(user_index < users_data.length-1){
        user_index += 1;
    }else{
        user_index = 0;
    }
    
    // rendering the next user
    render_users(users_data, user_index);
});


// Like user
like_user.addEventListener('click', ()=>{
        like_user_function(rendered_user_id, logged_user_id)

        // passing to the next user
        x_user.click();
});

function like_user_function(liked_user, liked_by){
            fetch(`http://localhost/interstellar_date_server/like_user.php?user_id=${liked_by}&liked_user_id=${liked_user}`)
        .then(response => response.json())
        .then((data)=>{
            let like_result = data;
            console.log(like_result)
        });
}