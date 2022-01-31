export default class Question{

    numQuestion;
    question;
    options;
    correct_option
    numQuiz;

    constructor(numQuestion, question, options, correct_option, numQuiz){
        this.numQuestion = numQuestion;
        this.question = question;
        this.options = options;
        this.correct_option = correct_option;
        this.numQuiz = numQuiz;
    }
}