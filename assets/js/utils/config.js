class Teach {
    constructor(id, userid, email, password) {
        this.id = id;
        this.userid = userid;
        this.email = email;
        this.password = password;
    }
}

class Student {
    constructor(id, userid, email, password) {
        this.id = id;
        this.userid = userid;
        this.email = email;
        this.password = password;
    }
}

const teacherOperations = {
    keys: [],
    getTeacher() {
        var pr = new Promise((resolve, reject) => {
            var id = firebase.database().ref('Users/Teachers');
            id.on('value', (snapShot) => {
                var obj = snapShot.val();
                if (obj == null) {
                    teacherOperations.keys.length = 0;
                } else {
                    teacherOperations.keys = Object.keys(obj);
                }
                resolve(teacherOperations.keys.length);
            })
        })
        return pr;
    },
    addTeacher(Object) {
        var pr = firebase.database().ref('Users/Teachers/' + Object.id).set(Object);
        pr.then(() => {
            location.href = "test.html";
        })
        alert("Welcome to Knowledge Quiz....Your UserID is " + Object.id);
    },
    searchTeacher(useri) {
        var pr = new Promise((resolve, reject) => {
            var userid = firebase.database().ref('Users/Teachers/' + useri);
            userid.on('value', (snapShot) => {
                var obj = snapShot.val();
                resolve(obj);
            })
        })
        console.log(pr);
        return pr;
    }
}

const studentOperations = {
    keys: [],
    getStudent() {
        var pr = new Promise((resolve, reject) => {
            var id = firebase.database().ref('Users/Students');
            id.on('value', (snapShot) => {
                var obj = snapShot.val();
                if (obj == null) {
                    studentOperations.keys.length = 0;
                } else {
                    studentOperations.keys = Object.keys(obj);
                }
                resolve(studentOperations.keys.length);
            })
        })
        return pr;
    },
    addStudent(Object) {
        var pr = firebase.database().ref('Users/Students/' + Object.id).set(Object);
        pr.then(() => {
            location.href = "quiz.html";
        })
        alert("Welcome to Knowledge Quiz....Your UserID is " + Object.id);
    },
    searchStudent(useri) {
        var pr = new Promise((resolve, reject) => {
            var userid = firebase.database().ref('Users/Students/' + useri);
            userid.on('value', (snapShot) => {
                var obj = snapShot.val();
                resolve(obj);
            })
        })
        return pr;
    }
}