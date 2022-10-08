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
})

// Apply filters
apply_filter.addEventListener('click', ()=>{
    filter_dropdown.style.display = 'none';

    fetch_filtered_users(planet_filter.value, gender_filter.value, min_age_filter.value, max_age_filter.value);
})

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

function fetch_filtered_users(planet, gender, min_age, max_age){

    fetch(`http://localhost/interstellar_date_server/users.php?planet=${planet}&gender=${gender}&min_age=${min_age}&max_age=${max_age}`)
    .then(response => response.json())
    .then((data)=>{
        render_users(data);
        console.log(data)
    });

}

// initial fetch
fetch_filtered_users('earth', 'male', 0, 100);

// RENDERING USERS
const user_name = document.getElementById('user_name');
const user_age = document.getElementById('user_age');
const user_gender = document.getElementById('user_gender');
const user_planet = document.getElementById('user_planet');
const user_biography = document.getElementById('user_biography');

function render_users(data){
    console.log(data.length);
    let user_index = 0;

    let current_date = new Date().getFullYear();
    let age = current_date -  parseInt(data[0].birth_date); 

    // inserting user data
    user_name.innerText = data[0].name;
    user_age.innerText = age;
    user_gender.innerText = data[0].gender;
    user_planet.innerText = data[0].planet;
    user_biography.innerText = data[0].biography;
}