import { Controller, Post, Req, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { TwoFactorAuthenticationService } from '../services/two-factor-authentication.service';
import { RequestWithAppContext } from '../middlewares/app-context.middleware';

@Controller('auth')
@ApiUseTags('auth')
export class TwoFactorAuthenticationController {
  constructor(private readonly twoFactorAuth: TwoFactorAuthenticationService) {}

  @Post('tfa/generate')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Generate QR code with 16-digits' })
  async generateQRCode(@Req() req: RequestWithAppContext) {
    const { email } = req.appContext.account;
    return this.twoFactorAuth.generateQRCode({ email });
  }

  @Post('tfa/disable')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Disable Two-factor authentication' })
  async tfaDisable(@Req() req: RequestWithAppContext, @Body() { code }) {
    const { email } = req.appContext.account;
    return this.twoFactorAuth.disableTFA({ code, email });
  }

  @Post('tfa/enable')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Active Two-factor authentication' })
  async tfaEnable(@Req() req: RequestWithAppContext, @Body() { code }) {
    const { email } = req.appContext.account;
    return this.twoFactorAuth.enableTFA({
      code,
      email,
    });
  }

  @Post('tfa/verify')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Verify Two-factor authentication code' })
  async tfaVerify(
    @Req() req: RequestWithAppContext,
    @Body() body: { code: string },
  ) {
    const { email } = req.appContext.account;
    return this.twoFactorAuth.codeVerify({ code: body.code, email });
  }
}
