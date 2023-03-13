import { faker } from '@faker-js/faker';

import User from '@/domain/user/entity';
import Account from '@/domain/account/entity';
import Quiz from '@/domain/quiz/entity';
import Question from '@/domain/quiz/value-objects/question';
import Answer from '@/domain/quiz/value-objects/answer';

describe('User entity', () => {
  test('should return an error when email is not provided', () => {
    const account = new Account(
      faker.datatype.uuid(),
      '12345-1',
      0,
    )
      
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        '',
        'pass',
        account
      )
    ).toThrowError('Email must be pass')

  });

  test('should return an error when email is invalid', () => {
    const account = new Account(
      faker.datatype.uuid(),
      '12345-1',
      0,
    )
      
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        'email invalid',
        'pass',
        account
      )
    ).toThrowError('Email is invalid')

  });

  test('should return an error when name is not provided', () => {
    const account = new Account(
      faker.datatype.uuid(),
      '12345-1',
      0,
    )
      
    expect(
      () => new User(
        faker.datatype.uuid(),
        '',
        faker.name.lastName(),
        faker.internet.email(),
        'pass',
        account
      )
    ).toThrowError('Name must be pass')

  });

  test('should return an error when lastName is not provided', () => {
    const account = new Account(
      faker.datatype.uuid(),
      '12345-1',
      0,
    )
      
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        '',
        faker.internet.email(),
        'pass',
        account
      )
    ).toThrowError('LastName must be pass')

  });

  test('should return an error when account is invalid', () => {
    const account = new Account(
      faker.datatype.uuid(),
      '',
      0,
    )
      
    expect(
      () => new User(
        faker.datatype.uuid(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        'pass',
        account
      )
    ).toThrow()

  });

  test('should return an user when success', () => {
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
      account
    ) 

    expect(user.id).toBe(fakeUser.id);
    expect(user.name).toBe(fakeUser.name);
    expect(user.lastName).toBe(fakeUser.lastName);
    expect(user.email).toBe(fakeUser.email);
    expect(user.account.accountNumber).toBe(fakeAccount.accountNumber);

  });

  describe('Update Status', () => {
    it('should change status', () => {
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
        account
      ) 

      user.updateStatus('INACTIVE');

      expect(user.status).toBe('INACTIVE');
    });
  });

  describe('Finished Quiz', () => {
    test('should return a quiz added', () => {
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
        account
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
        fakerQuiz.id,
        fakerQuiz.type,
        [question]
      )

      user.addFinishedQuiz(quiz);

      expect(user.finishedQuizzes[0].id).toBe(quiz.id);
      expect(user.finishedQuizzes[0].type).toBe(quiz.type);
      expect(user.finishedQuizzes[0].questions[0].id).toBe(question.id);
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
        account
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

      question.addSelectedAnswer(answer);

      const quiz = new Quiz(
        fakerQuiz.id,
        fakerQuiz.type,
        [question]
      )

      user.addFinishedQuiz(quiz);

      expect(user.sumValueFinishedQuizzes()).toBe(100);
    });
  });
});