import { makeUserApp } from "@/main/factories/app/user";
import RankingUserController from "@/presenters/controllers/user/ranking.controller";

export const makeRankingController = (): RankingUserController => {
  return new RankingUserController(makeUserApp());
}