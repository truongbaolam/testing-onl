let questionList = [];
const fetchQuestion = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/questions",
            method: "GET",
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
const renderQuestion = () => {
    let htmlContent = "";
    for (let i in questionList) {
        htmlContent += questionList[i].render(+i + 1);
    }
    document.getElementById("questionsContainer").innerHTML = htmlContent;
};
const mapData = (data = []) => {
    //  item is object of array data
    questionList = data.map((item, i) => {
        const { questionType, id, content, answers } = item;
        if (item.questionType === 1) {
            return new MultipleChoice(questionType, id, content, answers);
        } else {
            return new fillBlank(questionType, id, content, answers);
        }
    });
};
const submit = () => {
    let result  = 0;
    for (const item of  questionList) {
        if(item.checkExact()){
            result++;
        }
    }
    alert('Ket Qua:' + result + '/' +questionList.length);
};
fetchQuestion().then((data) => {
    //  code when have question list
    mapData(data);
    renderQuestion();
});
