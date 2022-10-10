// SECTIONS TOGGLING
const cards_container = document.querySelector('.cards-container');
const card_users = document.getElementById('card-users');
const explore_btn = document.getElementById('explore_btn');
const lounge_btn = document.getElementById('lounge_btn');

// lounge html
let lounge_html = `<div class="lounge-cards">
                        <h4><span id="liked_users_count">0</span> Liked :)</h4>
                        <div class="liked_by_user"></div>
                        <h4><span id="liked_me_count">0</span> Liked Me ;)</h4>
                        <div class="liked_user"></div>
                        <h4><span id="matches_count">0</span> Matches ^_^</h4>
                        <div class="matches"></div>
                    </div>`;

let lounge_card_html = `<div class="lounge-user-card">
                            <img src="../../assets/planet-bg.avif" alt="planet-bg" class="lounge-card-profile-photo">
                            
                            <h5 class="lounge-card-info">
                            <span class="lounge-card-username">John</span>
                            <span class="lounge-card-age">20</span>
                            </h5>
                            
                        </div>`

// render explore page html
explore_btn.addEventListener('click', ()=>{
    window.location.reload();
});

// render liked page html
lounge_btn.addEventListener('click', ()=>{
    // insert lounge html
    cards_container.innerHTML = lounge_html;
    // insert liked users html
    fetch_liked();

    for(i=0; i<10; i++){
        document.querySelector('.liked_by_user').innerHTML += lounge_card_html; 
        document.querySelector('.liked_user').innerHTML += lounge_card_html; 
        document.querySelector('.matches').innerHTML += lounge_card_html; 
    }
});

// fetch liked users
function fetch_liked(){
    fetch(`http://localhost/interstellar_date_server/liked_users.php?logged_user_id=${logged_user_id}`)
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        
    });
}

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
        
        users_data = data;
        render_users(data, 0);

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
        console.log(data)
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
        fetch(`http://localhost/interstellar_date_server/like_user.php?user_id=${logged_user_id}&liked_user_id=${rendered_user_id}`)
        .then(response => response.json())
        .then((data)=>{
            let like_result = data;
            console.log(like_result)
        });

        // passing to the next user
        x_user.click();
});
