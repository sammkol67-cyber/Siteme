import { IsString, IsBoolean, IsEnum, IsOptional, IsUrl, IsDateString } from 'class-validator';
import { AdvertisementLocation } from '@prisma/client';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsUrl()
  destinationUrl: string;

  @IsEnum(AdvertisementLocation)
  location: AdvertisementLocation;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class UpdateAdDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsUrl()
  @IsOptional()
  destinationUrl?: string;

  @IsEnum(AdvertisementLocation)
  @IsOptional()
  location?: AdvertisementLocation;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
