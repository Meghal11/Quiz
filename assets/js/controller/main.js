window.addEventListener("DOMContentLoaded", init);

var obj;
var type;
var valid = true;
var logvalid = true;

function init() {
    getCategory();
}

function getCategory() {
    document.getElementById("teacher").addEventListener("click", teacherEntry);
    document.getElementById("student").addEventListener("click", studentEntry);
    document.getElementById("container").style.height = (screen.height + "px");
}

function teacherEntry() {
    type = "t";
    entry();
}

function studentEntry() {
    type = "s";
    entry();
}

function entry() {
    document.querySelector("#radiobtn").className = 'hide';
    document.querySelector("#btn").className = 'show';
    document.querySelector("#login").addEventListener("click", tsLogin);
    document.querySelector("#register").addEventListener("click", tsReg);
}

function tsLogin() {
    document.querySelector("#banner").className = 'hide';
    document.querySelector("#btn").className = 'hide';
    document.querySelector("#registerDiv").className = 'hide';
    document.querySelector("#loginDiv").className = 'show';
    document.querySelector("#lo-reg").addEventListener("click", tsReg);
    document.querySelector("#log").addEventListener("click", login);
}

function tsReg() {
    document.querySelector("#banner").className = 'hide';
    document.querySelector("#btn").className = 'hide';
    document.querySelector("#loginDiv").className = 'hide';
    document.querySelector("#registerDiv").className = 'show';
    document.querySelector("#re-log").addEventListener("click", tsLogin);
    document.querySelector("#re").addEventListener("click", register);
}

function register() {
    document.getElementById("req1").setAttribute("class", 'hide');
    document.getElementById("req2").setAttribute("class", 'hide');
    document.getElementById("req3").setAttribute("class", 'hide');
    document.getElementById("req4").setAttribute("class", 'hide');
    document.getElementById("we").setAttribute("class", 'hide');
    document.getElementById("wp").setAttribute("class", 'hide');
    document.getElementById("cp").setAttribute("class", 'hide');
    valid = true;
    var useri = document.querySelector("#username").value;
    var email = document.querySelector("#eml").value;
    var password = document.getElementById('paswrd').value;
    var cpassword = document.getElementById('c-paswrd').value;
    var upperCaseLetters = /[A-Z]/g;
    var lowerCaseLetters = /[a-z]/g;
    var numbers = /[0-9]/g;
    var vmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (useri == "") {
        valid = false;
        document.getElementById("req1").setAttribute("class", 'show red');
    }
    if (email == "") {
        valid = false;
        document.getElementById("req2").setAttribute("class", 'show red');
    }
    if (password == "") {
        valid = false;
        document.getElementById("req3").setAttribute("class", 'show red');
    }
    if (cpassword == "") {
        valid = false;
        document.getElementById("req4").setAttribute("class", 'show red');
    }
    if (email != "") {
        if (!vmail.test(email)) {
            valid = false;
            document.getElementById("we").setAttribute("class", 'show red');
        }
    }
    if (password != "") {
        if (!upperCaseLetters.test(password)) {
            valid = false;
            document.getElementById("wp").setAttribute("class", 'show red');
        }
        if (!lowerCaseLetters.test(password)) {
            valid = false;
            document.getElementById("wp").setAttribute("class", 'show red');
        }
        if (!numbers.test(password)) {
            valid = false;
            document.getElementById("wp").setAttribute("class", 'show red');
        }
        if (password.length < 8) {
            valid = false;
            document.getElementById("wp").setAttribute("class", 'show red');
        }
    }
    if (password != "" && cpassword != "") {
        if (password != cpassword) {
            valid = false;
            document.getElementById("cp").setAttribute("class", 'show red');
        }
    }
    if (valid == true) {
        if (type == "t") {
            var teacherId;
            var pr = teacherOperations.getTeacher();
            pr.then(data => {
                if (data == 0) {
                    teacherId = 1;
                    localStorage.teacher = "1";
                } else {
                    var value = teacherOperations.keys[data - 1];
                    teacherId = parseInt(value) + 1;
                    localStorage.teacher = teacherId.toString();
                }
                var obj = new Teach(teacherId, useri, email, password);
                teacherOperations.addTeacher(obj);
            }).catch(err => {
                console.log("error" + err);
            });
        } else if (type == "s") {
            var studentId;
            var pr = studentOperations.getStudent();
            pr.then(data => {
                if (data == 0) {
                    studentId = 1;
                    localStorage.student = "1";
                } else {
                    var value = studentOperations.keys[data - 1];
                    studentId = parseInt(value) + 1;
                    localStorage.student = studentId.toString();
                }
                var obj = new Student(studentId, useri, email, password);
                studentOperations.addStudent(obj);
            }).catch(err => {
                console.log("error" + err);
            });
        }
    }
}

function login() {
    document.getElementById("lreq1").setAttribute("class", 'hide');
    document.getElementById("lreq2").setAttribute("class", 'hide');
    document.getElementById("lreq3").setAttribute("class", 'hide');
    document.getElementById("lwu").setAttribute("class", 'hide');
    document.getElementById("lwp").setAttribute("class", 'hide');
    logvalid = true;
    var userid = document.querySelector("#luserid").value;
    var username = document.querySelector("#lusername").value;
    var password = document.getElementById('lpassword').value;
    var upperCaseLetters = /[A-Z]/g;
    var lowerCaseLetters = /[a-z]/g;
    var numbers = /[0-9]/g;
    if (userid == "") {
        logvalid = false;
        document.getElementById("lreq1").setAttribute("class", 'show red');
    }
    if (username == "") {
        logvalid = false;
        document.getElementById("lreq2").setAttribute("class", 'show red');
    }
    if (password == "") {
        logvalid = false;
        document.getElementById("lreq3").setAttribute("class", 'show red');
    }
    if (userid != "") {
        if (!numbers.test(userid)) {
            logvalid = false;
            document.getElementById("lwu").setAttribute("class", 'show red');
        }
    }
    if (password != "") {
        if (!upperCaseLetters.test(password)) {
            logvalid = false;
            document.getElementById("lwp").setAttribute("class", 'show red');
        }
        if (!lowerCaseLetters.test(password)) {
            logvalid = false;
            document.getElementById("lwp").setAttribute("class", 'show red');
        }
        if (!numbers.test(password)) {
            logvalid = false;
            document.getElementById("lwp").setAttribute("class", 'show red');
        }
        if (password.length < 8) {
            logvalid = false;
            document.getElementById("lwp").setAttribute("class", 'show red');
        }
    }
    if (logvalid == true) {
        if (type == "t") {
            var pr = teacherOperations.searchTeacher(userid);
            pr.then(data => {
                if (data.userid == username) {
                    if (data.password == password) {
                        localStorage.teacher = userid.toString();
                        location.href = "test.html";
                    } else
                        alert("Not a Registered User...Not a Valid Password");
                } else
                    alert("Not a Registered User...Not a Valid Username");
            }).catch(err => {
                console.log("error" + err);
            })
        } else if (type == "s") {
            var pr = studentOperations.searchStudent(userid);
            pr.then(data => {
                if (data.userid == username) {
                    if (data.password == password) {
                        localStorage.student = userid.toString();
                        location.href = "quiz.html";
                    } else
                        alert("Not a Registered User...Not a Valid Password");
                } else
                    alert("Not a Registered User...Not a Valid Username");
            }).catch(err => {
                console.log("error" + err);
            })
        }
    }
}