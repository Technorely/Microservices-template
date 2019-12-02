import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { RequestWithAppContext } from '../middlewares/app-context.middleware';
import { AccountsService } from '../services/accounts.service';
import {
  ApiBearerAuth,
  ApiImplicitHeader,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AccountResponse, Account } from '../types';

@Controller('accounts')
@ApiUseTags('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get('/')
  @ApiResponse({ type: AccountResponse, status: HttpStatus.OK } as any)
  async getAccounts(@Body() account: Account): Promise<AccountResponse> {
    return this.accountsService.getAccounts();
  }
}
