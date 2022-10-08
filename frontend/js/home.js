// filter drop-down js
const filter_dropdown = document.querySelector('.filter-dropdown');
const filter_drop_down_btn = document.getElementById('filter_drop_down_btn');
const apply_filter = document.getElementById('apply_filter');

filter_drop_down_btn.addEventListener('click', ()=>{
    if(filter_dropdown.style.display != 'block'){
        filter_dropdown.style.display = 'block';
    }else{
        filter_dropdown.style.display = 'none';
    }
})

apply_filter.addEventListener('click', ()=>{
    filter_dropdown.style.display = 'none';
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

let planet_var = 'earth';
let gender_var = 'female';
let min_age_var = 0;
let max_age_var = 100;

fetch(`http://localhost/interstellar_date_server/users.php?planet=${planet_var}&gender=${gender_var}&min_age=${min_age_var}&max_age=${max_age_var}`)
.then(response => response.json())
.then((data)=>{
    console.log(data)
});