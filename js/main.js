/* getting the HTML elements */
var userNameInput = document.querySelector('#userName');
var userEmailInput = document.querySelector('#userMail');
var userPassInput = document.querySelector('#userPass');
var signUpBtn = document.querySelector('#signUpBtn');
var loginBtn = document.querySelector('#loginBtn');
var succeedMsg = document.querySelector('#login-succeeded-msg');
var logoutBtn = document.querySelector('#logout'); 
var errorMsg = document.querySelector('#error-msg');

/* user index */
var userIndex = -1;
if(localStorage.getItem('userIndex')){
    userIndex = JSON.parse(localStorage.getItem('userIndex'));
}

/* list to save the users data */
var users = [];

/* checking if there is local storage or not */
if(localStorage.getItem('users')){
    users = JSON.parse(localStorage.getItem('users'));
}

/* adding events to the corresponding element */
if(signUpBtn){
    signUpBtn.addEventListener('click' , function(){
        var userMailResult = searchUserMail();
        var validationResult = validateInputs();
        if( validationResult ){
            errorMsg.innerHTML = 'All inputs required';
            errorMsg.classList.replace('d-none' , 'd-block');
        } else if( userMailResult ){
            errorMsg.innerHTML = 'email already exists';
            errorMsg.classList.replace('d-none' , 'd-block');
        } else{
            errorMsg.classList.replace('d-block' , 'd-none');
            addUser();
        }
    });
}

if(loginBtn){
    loginBtn.addEventListener('click' , function(){
        var userMailResult = searchUserMail();
        var userPassResult = validateUserPass();
        localStorage.setItem('userIndex' , userIndex);
        if(userMailResult &&
            userPassResult ){
                window.open('./login.html', '_self');
                errorMsg.classList.replace('d-block' , 'd-none');
        }else{
            errorMsg.classList.replace('d-none' , 'd-block');
        }
    });
}

if(userIndex >= 0 && succeedMsg){
    succeedMsg.innerHTML += `${users[userIndex].name}`;
}

if(logoutBtn){
    logoutBtn.addEventListener('click' , function(){
        window.open('./index.html' , '_self');
    });
}

/**
 * Function to add a user
 */
function addUser(){
    var LocalName = userNameInput? userNameInput.value: null;
    var user = {
        name: LocalName,
        email: userEmailInput.value,
        pass: userPassInput.value
    }
    users.push(user);
    localStorage.setItem('users' , JSON.stringify(users));
    clearForm();
}

/**
 * Function to search if the user exists or not
 */
function searchUserMail(){
    var result = false;
    for( var i = 0 ; i<users.length ; i++){
        if( users[i].email === userEmailInput.value
        ){
            result = true;
            userIndex = i;
        }
    }
    return result;
}
/**
 * Function to search if the pass is correct
 */
function validateUserPass(){
    var result = false;
    for( var i = 0 ; i<users.length ; i++){
        if( users[i].email === userEmailInput.value &&
            users[i].pass === userPassInput.value
        ){
            result = true;
        }
    }
    return result;
}

/**
 * Function to validate if there is missing 
 * inputs
 */
function validateInputs(){
    var result = false;
    if( userNameInput.value  === ''  || 
        userEmailInput.value === ''  ||
        userPassInput.value  === ''
    ){
        result = true;
    }
    return result;
}

/**
 * Function to clear the form
 */
function clearForm(){
    userNameInput.value = null;
    userEmailInput.value = null;
    userPassInput.value = null;
}