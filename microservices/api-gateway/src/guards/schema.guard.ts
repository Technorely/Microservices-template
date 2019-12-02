import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { RequestWithAppContext } from '../middlewares/app-context.middleware';
import * as _ from 'lodash/fp';
import * as Joi from 'joi';

type AllowedJoiSchema = Joi.Schema | Joi.SchemaMap;

function isJoiSchema(value: any): value is Joi.Schema {
  return value.isJoi;
}

const joiOptions = {
  stripUnknown: true,
  abortEarly: false,
};

async function validate(value, schema: AllowedJoiSchema) {
  if (!schema) {
    return value;
  }

  const normalizedSchema = isJoiSchema(schema) ? schema : Joi.object(schema);
  const result = Joi.validate(value, normalizedSchema.required(), joiOptions);

  const { error } = result;
  if (error) {
    const errorMessage = error.details
      ? _.map(detail => detail.message, error.details)
      : error.message;
    throw new BadRequestException(errorMessage);
  }

  return result;
}

@Injectable()
export class SchemaGuard implements CanActivate {
  constructor(
    private readonly schema: {
      query?: AllowedJoiSchema;
      params?: AllowedJoiSchema;
      body?: AllowedJoiSchema;
    },
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as RequestWithAppContext;

    req.query = await validate(req.query, this.schema.query);
    req.params = await validate(req.params, this.schema.params);
    req.body = await validate(req.body, this.schema.body);

    return true;
  }
}
