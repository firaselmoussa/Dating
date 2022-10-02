
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
    
}, 120)
