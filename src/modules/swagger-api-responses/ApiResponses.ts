import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    description: 'Error Response',
    type: ApiUnauthorizedResponse,
    example: 'Error Occured',
  })
  message: string;
}

export class PatientDeleteSuccessResponse {
  @ApiProperty({
    description: 'For successfult deletion',
    type: ApiUnauthorizedResponse,
    example: 'patient is successfully deleted',
  })
  message: string;
}
