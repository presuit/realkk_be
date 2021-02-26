import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'y8mUhLmdjIqWxkMAR0sybURGLQ82eptD';

@Injectable()
export class JwtService {
  createJwtToken(userId: number) {
    return jwt.sign({ id: userId }, JWT_SECRET);
  }

  verifyJwtToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
