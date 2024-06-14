import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as qs from 'qs';
import * as crypto from 'crypto';
import { Buffer } from 'buffer';

import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from 'src/parameters/parameter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlackGuard implements CanActivate {
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { headers, body } = context.switchToHttp().getRequest();

    const parameter = await this.parameterRepository.findOne({
        where: { type: 'slack-signing-secret' },
      });

    const hmac = crypto.createHmac('sha256', parameter.value);

    const rawBody = qs.stringify(body).replace(/%20/g, "+");
    const slackSignature = headers['x-slack-signature'];
    const requestTimestamp = headers['x-slack-request-timestamp'];
    
    // ~~ is equivalent to Math.floor()
    const timeInSeconds = ~~(new Date().getTime() / 1000);
    // Reject if request is older than 5 minutes
    if (Math.abs(timeInSeconds - requestTimestamp) > 300) return false;

    const signatureBaseString = `v0:${requestTimestamp}:${rawBody}`;
    const mySignature = 'v0=' + hmac.update(signatureBaseString, 'utf8').digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(mySignature, 'utf8'),
      Buffer.from(slackSignature, 'utf8')
    );

  }
}