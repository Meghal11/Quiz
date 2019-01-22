redirect();
window.addEventListener("DOMContentLoaded", init);

var sequence, counter;
var lang;
var name;
var numberq;
var numq;
var valid;

function init() {
    document.getElementById("container1").style.height = (screen.height + "px");
    sequence = autoGen();
    counter = 1;
    document.getElementById("create").addEventListener("click", startApp);
    document.getElementById("logout").addEventListener("click", logOff);
}

function redirect() {
    if (!localStorage.teacher)
        location.href = "index.html";
}

function logOff() {
    localStorage.removeItem("teacher");
    location.href = "index.html";
}

function startApp() {
    document.getElementById("createTest").className = 'hide';
    document.getElementById("instrctn").className = 'hide';
    document.getElementById("main1").className = 'hide';
    document.getElementById("addDiv").className = 'show';
    document.getElementById("ct").addEventListener("click", getValues);
}

function getValues() {
    document.getElementById("req1").setAttribute("class", 'hide');
    document.getElementById("req2").setAttribute("class", 'hide');
    document.getElementById("req3").setAttribute("class", 'hide');
    valid = true;
    lang = document.getElementById("language").value;
    name = document.getElementById("not").value;
    var num = document.getElementById("tnoq").value;
    numberq = parseInt(num);
    if (lang == "") {
        valid = false;
        document.getElementById("req1").setAttribute("class", 'show red');
    }
    if (name == "") {
        valid = false;
        document.getElementById("req2").setAttribute("class", 'show red');
    }
    if (num == "") {
        valid = false;
        document.getElementById("req3").setAttribute("class", 'show red');
    }
    if (valid == true) {
        document.getElementById("addDiv").className = 'hide';
        document.getElementById("quesDiv").className = 'show';
        questionValues();
    }
}

function questionValues() {
    document.getElementById("question").value = "";
    document.getElementById("op1").value = "";
    document.getElementById("op2").value = "";
    document.getElementById("op3").value = "";
    document.getElementById("op4").value = "";
    document.getElementById("ans").value = "";
    document.getElementById("qno").innerHTML = counter;
    if (counter <= numberq) {
        document.getElementById("addbtn").addEventListener("click", ABC);
    }
    if (counter > numberq) {
        document.getElementById("addbtn").disabled = true;
        document.getElementById("quesDiv").className = 'hide';
        document.getElementById("endTest").className = 'show';
        endTest();
    }
}

function ABC() {
    document.getElementById("question").removeAttribute("class", 'bred');
    document.getElementById("op1").removeAttribute("class", 'bred');
    document.getElementById("op2").removeAttribute("class", 'bred');
    document.getElementById("op3").removeAttribute("class", 'bred');
    document.getElementById("op4").removeAttribute("class", 'bred');
    document.getElementById("ans").removeAttribute("class", 'bred');
    valid = true;
    var id = sequence.next().value;
    var ques = document.getElementById("question").value;
    var opt1 = document.getElementById("op1").value;
    var opt2 = document.getElementById("op2").value;
    var opt3 = document.getElementById("op3").value;
    var opt4 = document.getElementById("op4").value;
    var ans = document.getElementById("ans").value;
    if (ques == "") {
        valid = false;
        document.getElementById("question").setAttribute("class", 'bred');
    }
    if (opt1 == "") {
        valid = false;
        document.getElementById("op1").setAttribute("class", 'bred');
    }
    if (opt2 == "") {
        valid = false;
        document.getElementById("op2").setAttribute("class", 'bred');
    }
    if (opt3 == "") {
        valid = false;
        document.getElementById("op3").setAttribute("class", 'bred');
    }
    if (opt4 == "") {
        valid = false;
        document.getElementById("op4").setAttribute("class", 'bred');
    }
    if (ans == "") {
        valid = false;
        document.getElementById("ans").setAttribute("class", 'bred');
    }
    if (opt1 != "" && opt2 != "")
        if (valid == true) {
            var obj = new Question(id, ques, opt1, opt2, opt3, opt4, ans);
            dbOperations.addQuestion(obj, lang, name);
            counter++;
            questionValues();
        }
}

function endTest() {
    document.getElementById("next").addEventListener("click", nextTest);
    document.getElementById("end").addEventListener("click", end);
    document.getElementById("logou").addEventListener("click", logOff);
}

function end() {
    javascript: window.close();
}

function nextTest() {
    location.href = "test.html";
}