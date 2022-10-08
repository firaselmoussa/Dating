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