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
  constructor(private readonly recipeService: RecipeService) { }
  @Public()
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
  @Public()
  @Post('/rawmaterial')
  createRawMaterial(@Body() createRecipeDto: CreateRawMaterial) {
    return this.recipeService.createRawMaterial(createRecipeDto);
  }
  @Public()
  @Post('/recipematerial')
  createRecipeMaterial(@Body() createRecipeDto: CreateRecipeRawDto[]) {
    return this.recipeService.createRecipeMaterial(createRecipeDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }
  @Public()
  @Get('getMaterial')
  findAllRawMaterial() {
    return this.recipeService.findAllRawMaterial();
  }
  @Public()
  @Get(':name')
  search(@Param('name') name: string) {
    return this.recipeService.search(name);
  }
  @Public()
  @Get('/get/:id')
  findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }
  @Public()
  @Post('/save/:id/:userId')
  saveRecipe(@Param('id') id: number, @Param('userId') userId: number) {
    return this.recipeService.saveRecipe(id, userId);
  }
  @Public()
  @Get('recipe/:id')
  filter(@Param('id') id: string) {
    
    const numlist: number[]=[];
    const abc=id.split('+')
    for (var i = 0; i < abc.length; i++){
      numlist.push(+abc[i]);
  }
    return this.recipeService.filter(numlist);
  }
  @Public()
  @Get('getrecipe/:id')
  getRecipe(@Param('id') id: number) {
    return this.recipeService.getRecipe(+id);
  }
  @Public()
  @Get('getrecipes/:id')
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
