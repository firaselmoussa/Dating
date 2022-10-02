
let dynamic_txt = document.querySelector('.dynamic-txt');
let dynamic_txt_arr = [];

for (i = 0; i < dynamic_txt.innerHTML.length; i++) {
    dynamic_txt_arr.push(dynamic_txt.innerHTML.charAt(i));
}

console.log(dynamic_txt_arr);