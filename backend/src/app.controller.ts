import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PingDto } from './dto/ping.dto';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOkResponse({
    description: 'Endpoint to check if api is up',
    type: PingDto,
  })
  getPing(): PingDto {
    return this.appService.getPing();
  }

  @Get()
  @Redirect('/api')
  @ApiExcludeEndpoint()
  rootPage() {}
}
