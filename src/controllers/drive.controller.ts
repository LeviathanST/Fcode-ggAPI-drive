import { Controller, Get, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DriveService } from '../services/drive.service';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @UseGuards(AuthGuard('google'))
  @Get('files')
  async listFiles(@Req() req): Promise<any> {
    if (!req.user || !req.user.accessToken) {
      throw new HttpException('User is not authenticated', HttpStatus.UNAUTHORIZED);
    }

    try {
      const files = await this.driveService.listFiles(req.user.accessToken);
      return files;
    } catch (error) {
      throw new HttpException('Failed to retrieve files', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}