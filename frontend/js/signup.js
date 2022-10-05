
let txt = 'JOIN 11 TRILLION USERS ALL AROUND THE GLOBE ';
let txt_ext = ' GALAXY';
// ['G','A', 'L', 'A', 'X', 'Y']
let dynamic_txt = document.querySelector('.dynamic-txt');
let dynamic_txt_arr = [];

for (i = 0; i < txt.length; i++) {
    dynamic_txt_arr.push(txt.charAt(i));
}

let x = 0;
let y = 0
let typingInterval = setInterval(function(){
    if(x < dynamic_txt_arr.length){
        dynamic_txt.innerHTML += dynamic_txt_arr[x]
        x+=1;
    }else{
        
            dynamic_txt_arr.pop(-1);
            dynamic_txt.innerHTML = dynamic_txt_arr.join('');
            
            if(dynamic_txt_arr.length < 38){
                if(y <= txt_ext.length){
                    dynamic_txt_arr.push(txt_ext.slice(0, y));
                    y++;
                    
                    dynamic_txt.innerHTML = dynamic_txt_arr.join('');
                }else{
                    dynamic_txt.innerHTML = 'JOIN 11 TRILLION USERS ALL AROUND THE GALAXY! ';
                    clearInterval(typingInterval);
                }
            }
    }
    
}, 200)


// TYPER APPEAR_DISAPEAR EFFECT
let typer = document.querySelector('.typer');

setInterval(function(){
    if(typer.style.opacity == '1'){
        typer.style.opacity = '0';
    }else{
        typer.style.opacity = '1';
    }
}, 300)


//FORMS
const content_container = document.querySelector('.content-container');
const login_form  = document.getElementById('login_form');
const signup_form  = document.getElementById('signup_form');

// LOGIN FORM 
const outer_login_btn = document.getElementById('outer_login_btn');
const inner_login_btn = document.getElementById('inner_login_btn');

outer_login_btn.addEventListener('click', ()=>{
    content_container.style.display = 'none';
    login_form.style.display = 'flex';
})

// SIGNUP FORM 
const outer_signup_btn = document.getElementById('outer_signup_btn');
const inner_signup_btn = document.getElementById('inner_signup_btn');

outer_signup_btn.addEventListener('click', ()=>{
    content_container.style.display = 'none';
    signup_form.style.display = 'flex';
})

// CLOSING FORMS
const login_close_btn = document.getElementById('login_close_btn');
const signup_close_btn = document.getElementById('signup_close_btn');

login_close_btn.addEventListener('click', ()=>{
    content_container.style.display = 'flex';
    login_form.style.display = 'none';
})

signup_close_btn.addEventListener('click', ()=>{
    content_container.style.display = 'flex';
    signup_form.style.display = 'none';
})


// LOGIN BACKEND JS
let email_input = document.getElementById('email_input');
let password_input = document.getElementById('password_input');

inner_login_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log(email_input.value, password_input.value)
})
