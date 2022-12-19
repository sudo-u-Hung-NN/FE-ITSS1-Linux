import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { CreateRawMaterial } from './dto/create-raw-material';
import { CreateRecipeRawDto } from './dto/recipe-raw-material.dto';
@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Public()
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
  @Public()
  @Post('/raw-material')
  createRawMaterial(@Body() createRecipeDto: CreateRawMaterial) {
    return this.recipeService.createRawMaterial(createRecipeDto);
  }
  @Public()
  @Post('/recipe-raw-material')
  createRecipeMaterial(@Body() createRecipeDto: CreateRecipeRawDto[]) {
    return this.recipeService.createRecipeMaterial(createRecipeDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }
  @Public()
  @Get('get-all-materials')
  findAllRawMaterial() {
    return this.recipeService.findAllRawMaterial();
  }
  @Public()
  @Get('search/:name')
  search(@Param('name') name: string) {
    return this.recipeService.search(name);
  }
  @Public()
  @Get('/get-by-id/:id')
  findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }
  @Public()
  @Post('/save/:id/:userId')
  saveRecipe(@Param('id') id: number, @Param('userId') userId: number) {
    return this.recipeService.saveRecipe(id, userId);
  }
  @Public()
  @Get('get-recipes-for-filter/:id')
  filter(@Param('id') id: string) {
    const num_list: number[] = [];
    const abc = id.split('+');
    for (const element of abc) {
      num_list.push(+element);
    }
    return this.recipeService.filter(num_list);
  }
  @Public()
  @Get('get-recipes-for-current-user/:id')
  getRecipe(@Param('id') id: number) {
    return this.recipeService.getRecipe(+id);
  }
  @Public()
  @Get('get-recipes-for-other-users/:id')
  getRecipes(@Param('id') id: number) {
    return this.recipeService.getRecipes(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
  //   return this.recipeService.update(+id, updateRecipeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recipeService.remove(+id);
  // }
}
