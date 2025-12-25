import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { RedisService } from '../databases/redis/redis.service';
import { HttpStatus } from '@nestjs/common';
import { SrvError } from '../services/dto';

describe('DriversService', () => {
  let service: DriversService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: RedisService,
          useValue: {
            cacheCli: {
              get: jest.fn(),
              set: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should throw SrvError when OTP already sent', async () => {
    const phone = '1234567890';
    const key = `otp:driver:${phone}`;
    
    // Mock redis.cacheCli.get to return an existing OTP
    (redisService.cacheCli.get as jest.Mock).mockResolvedValue('1234');

    const context = {
      query: { phone },
    };

    try {
      await service.requestOtp(context);
      fail('Should have thrown SrvError');
    } catch (error) {
      expect(error).toBeInstanceOf(SrvError);
      expect(error.code).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe('OTP already sent');
    }
  });

  it('should send OTP successfully when no existing OTP', async () => {
    const phone = '0987654321';
    
    // Mock redis.cacheCli.get to return null (no existing OTP)
    (redisService.cacheCli.get as jest.Mock).mockResolvedValue(null);
    (redisService.cacheCli.set as jest.Mock).mockResolvedValue('OK');

    const context = {
      query: { phone },
    };

    const result = await service.requestOtp(context);

    expect(result.message).toBe('OTP send successfully!');
    expect(result.data.phone).toBe(phone);
    expect(redisService.cacheCli.set).toHaveBeenCalled();
  });
});
