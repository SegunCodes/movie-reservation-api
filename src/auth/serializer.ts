/* eslint-disable prettier/prettier */
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, id: string) => void): void {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: (err: Error, user: any) => void): Promise<void> {
    const user = await this.usersService.findById(+id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  }
}
