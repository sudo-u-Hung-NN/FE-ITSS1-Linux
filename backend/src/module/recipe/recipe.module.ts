import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { RecipeRawMaterial } from './entities/recipe-raw-material.entity';
import { Nation } from './entities/nation.entity';
import { Taste } from './entities/taste.entity';
import { RecipeTaste } from './entities/taste-recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RawMaterial, RecipeRawMaterial, Nation, Taste, RecipeTaste])],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule { }
