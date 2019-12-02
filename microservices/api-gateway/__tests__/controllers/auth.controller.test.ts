import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/services/auth.service';
import { AuthController } from '../../src/controllers/auth.controller';
import { EmailService } from '../../src/services/email.service';

describe('auth.controller', () => {
  let controller: AuthController;

  // @ts-ignore
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            token: jest.fn(() => 'foo'),
          },
        },
        {
          provide: EmailService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  // @ts-ignore
  it('should ...', async () => {
    expect(await controller.token()).toBe('foo');
  });
});
