import { IsInt, IsString } from 'class-validator';

export class RedeemDto {
  @IsInt()
  userId: number;

  @IsString()
  slug: string;
}
