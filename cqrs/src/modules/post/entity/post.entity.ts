import { Post } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  status: string | null;
}
