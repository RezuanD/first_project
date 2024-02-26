import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOkResponse({
    content: {
      'application/json': {
        example: [
          {
            message: 'pong',
          },
        ],
      },
    },
  })
  getPing(): { message: string } {
    return this.appService.getPing();
  }

  @Get()
  @Redirect('/api')
  @ApiExcludeEndpoint()
  rootPage() {}
}
