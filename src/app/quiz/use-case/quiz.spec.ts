import QuizApplication from "@/app/quiz/use-case";
import Quiz from "@/domain/quiz/entity";
import Hashing from "@/app/protocols/hashing";

describe("QuizApplication", () => {
  let quizApplication: QuizApplication;
  let quizRepository: any;
  let hashing: Hashing;

  beforeEach(() => {
    quizRepository = {
      listQuizzes: jest.fn(),
      getQuizById: jest.fn(),
      createQuiz: jest.fn(),
      updateQuiz: jest.fn(),
      deleteQuiz: jest.fn(),
      listQuizzesByParams: jest.fn(),
    };
    hashing = {
      hash: jest.fn(),
    };
    quizApplication = new QuizApplication(hashing, quizRepository);
  });

  describe("create", () => {
    it("should call quizRepository.createQuiz with the provided quiz", async () => {
      const quiz = new Quiz('1', 'type', []);
      await quizApplication.create(quiz);
      expect(quizRepository.createQuiz).toHaveBeenCalledWith(quiz);
    });

    it("should throw an error if quizRepository.createQuiz throws an error", async () => {
      const quiz = new Quiz('1', 'type', []);
      const error = new Error("Error creating quiz");
      quizRepository.createQuiz.mockRejectedValueOnce(error);
      await expect(quizApplication.create(quiz)).rejects.toThrow(error);
    });
  });

  describe("getQuizById", () => {
    it("should call quizRepository.getQuizById with the provided id", async () => {
      const id = "1";
      await quizApplication.getQuizById(id);
      expect(quizRepository.getQuizById).toHaveBeenCalledWith(id);
    });

    it("should throw an error if quizRepository.getQuizById throws an error", async () => {
      const id = "1";
      const error = new Error("Error getting quiz");
      quizRepository.getQuizById.mockRejectedValueOnce(error);
      await expect(quizApplication.getQuizById(id)).rejects.toThrow(error);
    });
  });

  describe("listQuizzes", () => {
    it("should call quizRepository.listQuizzes", async () => {
      await quizApplication.listQuizzes();
      expect(quizRepository.listQuizzes).toHaveBeenCalled();
    });

    it("should throw an error if quizRepository.listQuizzes throws an error", async () => {
      const error = new Error("Error listing quizzes");
      quizRepository.listQuizzes.mockRejectedValueOnce(error);
      await expect(quizApplication.listQuizzes()).rejects.toThrow(error);
    });
  });

  describe("deleteQuiz", () => {
    it("should call quizRepository.deleteQuiz with the provided id", async () => {
      const id = "1";
      await quizApplication.deleteQuiz(id);
      expect(quizRepository.deleteQuiz).toHaveBeenCalledWith(id);
    });

    it("should throw an error if quizRepository.deleteQuiz throws an error", async () => {
      const id = "1";
      const error = new Error("Error deleting quiz");
      quizRepository.deleteQuiz.mockRejectedValueOnce(error);
      await expect(quizApplication.deleteQuiz(id)).rejects.toThrow(error);
    });
  });

  describe("updateQuiz", () => {
    it("should call quizRepository.updateQuiz with the provided quiz", async () => {
      const quiz = new Quiz('1', 'type', []);
      await quizApplication.updateQuiz(quiz);
      expect(quizRepository.updateQuiz).toHaveBeenCalledWith(quiz);
    });

    it("should throw an error if quizRepository.updateQuiz throws an error", async () => {
      const quiz = new Quiz('1', 'type', []);
      const error = new Error("Error updating quiz");
      quizRepository.updateQuiz.mockRejectedValueOnce(error);
      await expect(quizApplication.updateQuiz(quiz)).rejects.toThrow(error);
    });
  });

  describe("listQuizByParams", () => {
    it("should call quizRepository.listQuizzesByParams with the provided params", async () => {
      const params = { name: "Test Quiz" };
      await quizApplication.listQuizByParams(params);
      expect(quizRepository.listQuizzesByParams).toHaveBeenCalledWith(params);
    });

    it("should throw an error if quizRepository.listQuizzesByParams throws an error", async () => {
      const params = { name: "Test Quiz" };
      const error = new Error("Error listing quizzes by params");
      quizRepository.listQuizzesByParams.mockRejectedValueOnce(error);
      await expect(quizApplication.listQuizByParams(params)).rejects.toThrow(error);
    });
  });
});