declare namespace Express {
    interface Request {
      isAuth: boolean,
      userInfo: string | pkg.JwtPayload
    }
}