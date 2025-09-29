import { z } from 'zod';

import { houseDto, updateHouseDto } from '@/app/api/property/dtos/house.dto';
import { landDto, updateLandDto } from '@/app/api/property/dtos/land.dto';
import { otherPropertyDto, updateOtherPropertyDto } from '@/app/api/property/dtos/other.dto';

export const createPropertyDto = z.discriminatedUnion('propertyType', [
  houseDto,
  landDto,
  otherPropertyDto,
]);

export type CreatePropertyDto = z.infer<typeof createPropertyDto>;

export const updatePropertySchema = z.discriminatedUnion('propertyType', [
  updateHouseDto,
  updateLandDto,
  updateOtherPropertyDto,
]);
export type UpdatePropertyDTO = z.infer<typeof updatePropertySchema>;
