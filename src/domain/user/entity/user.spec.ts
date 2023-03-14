import { faker } from '@faker-js/faker';

import User from '@/domain/user/entity';
import Account from '@/domain/account/entity';
import Quiz from '@/domain/quiz/entity';
import Question from '@/domain/quiz/value-objects/question';
import Answer from '@/domain/quiz/value-objects/answer';

describe('User entity', () => {
  test('should return an error when email is not provided', () => {
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        '',
        'pass',
      )
    ).toThrowError('Email must be pass')

  });

  test('should return an error when email is invalid', () => {
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        'email invalid',
        'pass',
      )
    ).toThrowError('Email is invalid')

  });

  test('should return an error when name is not provided', () => {
    expect(
      () => new User(
        faker.datatype.uuid(),
        '',
        faker.name.lastName(),
        faker.internet.email(),
        'pass',
      )
    ).toThrowError('Name must be pass')

  });

  test('should return an error when lastName is not provided', () => {
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        '',
        faker.internet.email(),
        'pass',
      )
    ).toThrowError('LastName must be pass')

  });

  test('should return an user when success', () => {
    const fakeUser = {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'pass',
    }
      
    const user = new User(
      fakeUser.id,
      fakeUser.name,
      fakeUser.lastName,
      fakeUser.email,
      fakeUser.password,
    ) 

    expect(user.name).toBe(fakeUser.name);
    expect(user.lastName).toBe(fakeUser.lastName);
    expect(user.email).toBe(fakeUser.email);

  });

  describe('Update Status', () => {
    it('should change status', () => {
      const fakeUser = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'pass',
      }
        
      const user = new User(
        fakeUser.id,
        fakeUser.name,
        fakeUser.lastName,
        fakeUser.email,
        fakeUser.password,
      ) 

      user.updateStatus('INACTIVE');

      expect(user.status).toBe('INACTIVE');
    });
  });

  describe('Finished Quiz', () => {
    test('should return a quiz added', () => {
      const fakeUser = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'pass',
      }

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
        
      const user = new User(
        fakeUser.id,
        fakeUser.name,
        fakeUser.lastName,
        fakeUser.email,
        fakeUser.password,
      )

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
        faker.datatype.uuid(),
        fakerQuiz.type,
        [question]
      )

      user.addFinishedQuiz(quiz);

      expect(user.finishedQuizzes[0].type).toBe(quiz.type);
    });
    test('should return a sum of finished quiz', () => {
      const fakeAccount = {
        id: faker.datatype.uuid(),
        accountNumber: '12345-1',
        balance: 0,
      }
      const fakeUser = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'pass',
      }

      const fakeAnswers = [
        {
          id: faker.datatype.number(),
          text: faker.lorem.text(),
        }
      ]

      const fakeQuestions = [
        {
          id: faker.datatype.number(),
          type: 'normal',
          question: faker.lorem.text(),
          value: 100
        }
      ]

      const fakerQuiz = {
        id: faker.datatype.uuid(),
        type: 'normal',
      }
  
      const account = new Account(
        fakeAccount.id,
        fakeAccount.accountNumber,
        fakeAccount.balance,
      )
        
      const user = new User(
        fakeUser.id,
        fakeUser.name,
        fakeUser.lastName,
        fakeUser.email,
        fakeUser.password,
      )

      const answer = new Answer(
        fakeAnswers[0].id,
        fakeAnswers[0].text,
      )

      const question = new Question(
        faker.datatype.uuid(),
        fakeQuestions[0].type,
        fakeQuestions[0].question,
        [answer],
        answer,
        fakeQuestions[0].value,
        false
      )

      question.addSelectedAnswer(answer);

      const quiz = new Quiz(
        faker.datatype.uuid(),
        fakerQuiz.type,
        [question]
      )

      user.addFinishedQuiz(quiz);

      expect(user.sumValueFinishedQuizzes()).toBe(100);
    });
  });

  describe('Account', () => {
    test('should add account', () => {
      const fakeAccount = {
        id: faker.datatype.uuid(),
        accountNumber: '12345-1',
        balance: 0,
      }

      const fakeUser = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'pass',
      }

      const account = new Account(
        fakeAccount.id,
        fakeAccount.accountNumber,
        fakeAccount.balance,
      )

      const user = new User(
        fakeUser.id,
        fakeUser.name,
        fakeUser.lastName,
        fakeUser.email,
        fakeUser.password,
      )
      
      user.addAccount(account);
      const createAccount = user.getAccount();

      expect(createAccount).not.toBeNull();
      expect(createAccount?.accountNumber).toBe(fakeAccount.accountNumber);
    })
  })
});