import HttpResponse from "@/presenters/protocols/http";

export default interface BaseController {
  handle(req: any): Promise<HttpResponse>;
}