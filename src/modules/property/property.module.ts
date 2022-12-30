import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyLocationBlockController } from './property-location-block.controller';
import { PropertyLocationBlockService } from './property-location-block.service';
import { PropertyLocationLotController } from './property-location-lot.controller';
import { PropertyLocationLotService } from './property-location-lot.service';
import { PropertyLocationPhaseController } from './property-location-phase.controller';
import { PropertyLocationPhaseService } from './property-location-phase.service';
import { PropertyTypeController } from './property-type.controller';
import { PropertyTypeService } from './property-type.service';

@Module({
  controllers: [
    PropertyController,
    PropertyTypeController,
    PropertyLocationBlockController,
    PropertyLocationPhaseController,
    PropertyLocationLotController,
  ],
  exports: [
    PropertyService,
    PropertyTypeService,
    PropertyLocationBlockService,
    PropertyLocationPhaseService,
    PropertyLocationLotService,
  ],
  imports: [PrismaModule],
  providers: [
    PropertyService,
    PropertyTypeService,
    PropertyLocationBlockService,
    PropertyLocationPhaseService,
    PropertyLocationLotService,
  ],
})
export class PropertyModule {}
