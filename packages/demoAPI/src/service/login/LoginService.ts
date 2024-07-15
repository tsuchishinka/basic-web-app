import { LoginRequestClient } from "./LoginRequestClient";

class LoginService extends LoginRequestClient {
  async login(params: {
    email: string | undefined;
    password: string | undefined;
  }) {
    await this.apiClient.post({
      url: "/",
      contentType: "application/json",
      headers: "Content-type: application/json; charset=utf8",
      data: {
        name: params.email,
        password: params.password,
      },
    });
  }
}

export { LoginService };
