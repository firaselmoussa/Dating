
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
let login_message = document.getElementById('login_message');

// LOGIN 
inner_login_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    login(email_input.value, password_input.value);
});

function login(email, password){

    fetch(`http://localhost/interstellar_date_server/login.php?email=${email}&password=${password}`)
        .then(response => response.json())
        .then((data)=>{
            if(data.status){
                localStorage.setItem('logged_user_id', data['logged_user_id']);
                window.location = 'home.html';
                login_message.innerText = '';
            }else{
                login_message.innerText = data.message;
            }
        });
};

// REGISTRATION BACKEND JS
let name_input = document.getElementById('name_input');
let signup_email_input = document.getElementById('signup_email_input');
let signup_password_input = document.getElementById('signup_password_input');
let birth_date_input = document.getElementById('birth_date_input');
let profile_photo_input = document.getElementById('profile_photo_input');
let gender_input = document.getElementById('gender_input');
let planet_input = document.getElementById('planet_input');
let biography_input = document.getElementById('biography_input');
let signup_message = document.getElementById('signup_message');

// REGISTRATION 
inner_signup_btn.addEventListener('click', (e)=>{
    e.preventDefault();

    let is_valid = validate_input(name_input.value, signup_email_input.value, signup_password_input.value, birth_date_input.value);

    if(is_valid == true){
        signup_message.innerText = ' ';
        
        fetch(`http://localhost/interstellar_date_server/registration.php?name=${name_input.value}&email=${signup_email_input.value}&password=${signup_password_input.value}&birth_date=${birth_date_input.value}&profile_photo=${profile_photo_input.value}&gender=${gender_input.value}&planet=${planet_input.value}&biography=${biography_input.value}`)
            .then(response => response.json())
            .then((data)=>{
                if(data.status){
                    login(signup_email_input.value, signup_password_input.value);
                    signup_message.innerText = ' ';
                }else{
                    signup_message.innerText = data.message;
                }
            });
        }else{
            signup_message.innerText = is_valid;
        }
});

// INPUT VALIDATION
function validate_input(name, email, password, birth_date){

    is_valid = true;
    // NAME VALIDATION
    if(!name){
        is_valid =  "Name can't be empty";
    }

    // EMAIL VALIDATION
    if(!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/)){
        is_valid =  "Invalid Email";
    }

    // PASSWORD VALIDATION
    if (!password.length >= 8 ||
        !password.match(/[A-Z]/) ||
        !password.match(/[a-z]/) ||
        !password.match(/[0-9]/) ||
        !password.match(/[\'^�$%&*()}{@#~?><>,|=_+�-]/)) {
        
            is_valid =  "Password should include: 8 characters, Upper case, Lower case, numbers & special characters";   
    }
    
    // BIRTH DATE VALIDATION
    if(!birth_date){
        is_valid =  "Please select your birth date.";  
    }

    // RETURNING VALIDATION RESULT
    return is_valid;
};

// SIGNUP BUTTON ESCAPING ANIMATION
// animation direction
let z = -1;
// maximum left margin
let max = 120;
// temporary position
let temp = 0; 

// Event
inner_signup_btn.addEventListener('mouseenter', ()=>{

    // inverting animation direction
    z *= -1;

    // giving the button a position
    inner_signup_btn.style.position = "relative";

    // validating input prior
    let is_valid = validate_input(name_input.value, signup_email_input.value, signup_password_input.value, birth_date_input.value);

    if(is_valid != true){

        // fixing maximum margin depending on direction
        if(temp < 0){
            max = 0;
        }else{
            max = 120;
        }

            // creating animation interval
        let btn_animate = setInterval(()=>{
            if(temp < max){
                inner_signup_btn.style.left = temp*z +"px"; 
                temp+=5;
            }else{
                temp*=-1;
                clearInterval(btn_animate)
            }
        },10);
    };
});