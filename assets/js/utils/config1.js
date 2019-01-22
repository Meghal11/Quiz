class Question {
    constructor(id, ques, opt1, opt2, opt3, opt4, ans) {
        this.id = id;
        this.ques = ques;
        this.opt1 = opt1;
        this.opt2 = opt2;
        this.opt3 = opt3;
        this.opt4 = opt4;
        this.ans = ans;
    }
}
const dbOperations = {
    langge: [],
    test: [],
    ques: [],
    queslist: [],
    addQuestion(Object, lang, name) {
        firebase.database().ref('Language/' + lang + '/' + name + '/Questions/' + Object.id).set(Object);
    },
    showLang() {
        var pr = new Promise((resolve, reject) => {
            var lang1 = firebase.database().ref('Language');
            lang1.on('value', (snapShot) => {
                var obj = snapShot.val();
                dbOperations.langge = Object.keys(obj);
                resolve(dbOperations.langge);
            })
        })
        return pr;
    },
    showTest(lang) {
        var pr = new Promise((resolve, reject) => {
            var test1 = firebase.database().ref('Language/' + lang);
            test1.on('value', (snapShot) => {
                var obj = snapShot.val();
                dbOperations.test = Object.keys(obj);
                resolve(dbOperations.test);
            })
        })
        return pr;
    },
    getQues(lang, test) {
        var test1 = firebase.database().ref('Language/' + lang + '/' + test + '/Questions');
        test1.on('value', (snapShot) => {
            var obj = snapShot.val();
            dbOperations.ques = Object.keys(obj);
        })
    },
    showQues(lang, test) {
        var i = 1;
        while (i <= dbOperations.ques.length) {
            var test1 = firebase.database().ref('Language/' + lang + '/' + test + '/Questions/' + i);
            test1.on('value', (snapShot) => {
                var obj = snapShot.val();
                dbOperations.queslist.push(obj);
            })
            i++;
        }
        return dbOperations.queslist;
    }
}