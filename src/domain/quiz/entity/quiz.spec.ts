import { faker } from "@faker-js/faker";
import Quiz from "@/domain/quiz/entity";
import Answer from "@/domain/quiz/value-objects/answer";
import Question from "@/domain/quiz/value-objects/question";

describe('Quiz Entity', () => {
  test('Quiz class should have correct properties and methods', () => {
    const fakeAnswers = [
      {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
      }
    ]

    const fakeQuestions = [
      {
        id: faker.datatype.uuid(),
        type: 'normal',
        question: faker.lorem.text(),
        value: 100
      }
    ]

    const fakerQuiz = {
      id: faker.datatype.uuid(),
      type: 'normal',
    }

    const answer = new Answer(
      fakeAnswers[0].id,
      fakeAnswers[0].text,
    )

    const question = new Question(
      fakeQuestions[0].id,
      fakeQuestions[0].type,
      fakeQuestions[0].question,
      [answer],
      answer,
      fakeQuestions[0].value,
      false
    )

    const quiz = new Quiz(
      fakerQuiz.id,
      fakerQuiz.type,
      [question]
    )


    expect(quiz.id).toBe(fakerQuiz.id);
    expect(quiz.type).toBe(fakerQuiz.type);
    expect(quiz.questions).toEqual([question]);

    quiz.id = '1';
    quiz.type = 'a';
    quiz.questions = [];
    
    expect(quiz.id).toBe('1');
    expect(quiz.type).toBe('a');
    expect(quiz.questions).toEqual([]);


  })
});