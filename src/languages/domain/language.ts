import { ApiProperty } from '@nestjs/swagger';

export class Language {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  is_active: boolean;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  native_name: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  code: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
