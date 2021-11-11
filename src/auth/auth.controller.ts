import { Controller, Get, Redirect, Req, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "src/helper/types";
import { GithubAuthGuard } from "./guard/githubGuard";

@Controller("auth")
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(GithubAuthGuard)
  @Redirect()
  @Get("/callback")
  getUserfromGithub(@Req() req) {
    const payload: JWTPayload = {
      id: req.user.id,
      username: req.user.username,
    };

    const token = this.jwtService.sign(payload);
    return {
      url: `http://localhost:3000/home/${token}`,
    };
  }
}
