redirect();
window.addEventListener("DOMContentLoaded", init);

var ul, ul1;
var lang, test;
var count;
var score = 0;

function init() {
    document.getElementById("container2").style.height = (screen.height + "px");
    ul = document.getElementById("ll");
    ul1 = document.getElementById("lt");
    document.getElementById("listtest").className = "hide";
    document.getElementById("logout").addEventListener("click", logOff);
    showList();
}

function redirect() {
    if (!localStorage.student)
        location.href = "index.html";
}

function logOff() {
    localStorage.removeItem("student");
    location.href = "index.html";
}

function showList() {
    var pr = dbOperations.showLang();
    pr.then(data => {
        var i = 0;
        while (i < data.length) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.innerHTML = data[i];
            a.setAttribute("href", "#");
            a.setAttribute("id", data[i]);
            a.setAttribute("onclick", "getTest(this)");
            li.appendChild(a);
            ul.appendChild(li);
            i++;
        }
    }).catch(err => console.log("error is", err));
}

function getTest(i) {
    lang = i.id;
    document.getElementById("listlang").className = "hide";
    document.getElementById("listtest").className = "show";
    var pr = dbOperations.showTest(i.id);
    pr.then(data => {
        var i = 0;
        while (i < data.length) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.innerHTML = data[i];
            a.setAttribute("href", "#");
            a.setAttribute("id", data[i]);
            a.setAttribute("onclick", "getQuestion(this)");
            li.appendChild(a);
            ul1.appendChild(li);
            i++;
        }
    }).catch(err => console.log("error is", err));
}

function getQuestion(i) {
    test = i.id;
    document.getElementById("main1").className = "hide";
    document.getElementById("listtest").className = "hide";
    document.getElementById("listQues").className = "show";
    dbOperations.getQues(lang, test);
    showQuestion();
}

function showQuestion() {
    ques = dbOperations.showQues(lang, test);
    count = 0;
    show(ques);
}

function show() {
    document.getElementById("Question").innerHTML = ques[count].ques;
    document.getElementById("op1").value = ques[count].opt1;
    document.getElementById("o1").innerHTML = ques[count].opt1;
    document.getElementById("op2").value = ques[count].opt2;
    document.getElementById("o2").innerHTML = ques[count].opt2;
    document.getElementById("op3").value = ques[count].opt3;
    document.getElementById("o3").innerHTML = ques[count].opt3;
    document.getElementById("op4").value = ques[count].opt4;
    document.getElementById("o4").innerHTML = ques[count].opt4;
    document.getElementById("sq").addEventListener("click", nextShow);
}

function nextShow() {
    var ans;
    if (document.getElementById("op1").checked) {
        ans = document.getElementById("op1").value;
    } else if (document.getElementById("op2").checked) {
        ans = document.getElementById("op2").value;
    } else if (document.getElementById("op3").checked) {
        ans = document.getElementById("op3").value;
    } else if (document.getElementById("op4").checked) {
        ans = document.getElementById("op4").value;
    }
    if (ans == ques[count].ans) {
        score = score + 10;
        finalShow();
    } else {
        score = score + 0;
        finalShow();
    }
}

function finalShow() {
    count++;
    if (count < ques.length) {
        show();
    } else {
        document.getElementById("listQues").className = "hide";
        document.getElementById("result").className = "show";
        var total = ques.length * 10;
        document.getElementById("pd").innerHTML = (score / total * 100 + "%");
        document.getElementById("scans").innerHTML = ("You have scored " + score + " out of " + total);
        document.getElementById("incrt").innerHTML = (score / 10 + " answers are correct..")
    }
}