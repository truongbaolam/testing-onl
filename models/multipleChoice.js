class MultipleChoice extends Questions {
    constructor(type, id, content, answers) {
        super(type, id, content, answers);
    }

    render(index) {
        let answersHtml = "";
        for (let answer of this.answers) {
            answersHtml += `
            <div>
                <input value="${answer.id}" class ="answer-${this.id}" type= "radio"  name="answer-${this.id}"/>
                <label class="lead">${answer.content} </label>
            </div>
            `;
        }
        return `
        <div>
            <p class="lead font-italic" style="font-size: 30px">
                Answer${index}:  ${this.content}
            </p>
            ${answersHtml}
        </div>`;
    }
    checkExact() {
        const inputList = document.getElementsByClassName(`answer-${this.id}`);
        let    answerId;
        for (let input of inputList) {
            if (input.checked) {
                answerId = input.value;
            }
        }
        if(!answerId) {
            return false;
        } 
        for (const answer of this.answers) {
            if(answerId === answer.id){
                return answer.exact;
            }
        }
        return false;
    }
    
}
const newQuestion = new MultipleChoice();
