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
import { CreateTasteDto } from './dto/create-taste.dto';
import { CreateRecipeTasteDto } from './dto/create-recipe-taste.dto';
import {CreateNationDto} from "./dto/create-nation.dto";
@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }
  //---------------------------------------------------------------
  @Public()
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
  //----------------------------------------------------------------
  @Public()
  @Post('/raw-material')
  createRawMaterial(@Body() createRecipeDto: CreateRawMaterial) {
    return this.recipeService.createRawMaterial(createRecipeDto);
  }
  //----------------------------------------------------------------
  @Public()
  @Post('/recipe-raw-material')
  createRecipeMaterial(@Body() createRecipeDto: CreateRecipeRawDto[]) {
    return this.recipeService.createRecipeMaterial(createRecipeDto);
  }
  //----------------------------------------------------------------
  @Public()
  @Post('/create-taste')
  createTaste(@Body() createTaste: CreateTasteDto) {
    return this.recipeService.createTaste(createTaste);
  }
  //----------------------------------------------------------------
  @Public()
  @Post('/create-recipe-taste')
  createRecipeTaste(@Body() createRecipeTasteDto: CreateRecipeTasteDto[]) {
    return this.recipeService.createRecipeTaste(createRecipeTasteDto);
  }
  // ----------------------------------------------------------------
  @Public()
  @Get('get-all')
  findAll() {
    return this.recipeService.findAll();
  }
  //----------------------------------------------------------------
  @Public()
  @Get('get-all-materials')
  findAllRawMaterial() {
    return this.recipeService.findAllRawMaterial();
  }
  //---------------------------------GET ALL Taste-------------------------------
  @Public()
  @Get('get-all-tastes')
  findAllTastes() {
    return this.recipeService.getAllTastes();
  }

  //-------------------------------Search by name---------------------------------
  @Public()
  @Get('search/:name')
  search(@Param('name') name: string) {
    return this.recipeService.search(name);
  }
  //------------------------------Get Recipes By id----------------------------------
  @Public()
  @Get('/get-by-id/:id')
  findOne(@Param('id') id: number) {
    return this.recipeService.findOne(id);
  }
  //-------------------------------Create Recipe---------------------------------
  @Public()
  @Post('/save/:id/:userId')
  saveRecipe(@Param('id') id: number, @Param('userId') userId: number) {
    return this.recipeService.saveRecipe(id, userId);
  }
  //--------------------------------Filter Recipes by ingredient--------------------------------------
  @Public()
  @Get('get-recipes-for-filter/:id')
  filter(@Param('id') id: string) {

    const numlist: number[] = [];
    const abc = id.split('+')
    for (var i = 0; i < abc.length; i++) {
      numlist.push(+abc[i]);
    }
    return this.recipeService.filter(numlist);
  }
  //-------------------------------Get taste by id---------------------------------
  @Public()
  @Get('get-by-taste/:id')
  filterTaste(@Param('id') id: string) {

    const numlist: number[] = [];
    const abc = id.split('+')
    for (var i = 0; i < abc.length; i++) {
      numlist.push(+abc[i]);
    }
    return this.recipeService.filterTaste(numlist);
  }
  //-------------------------------Get recipes for current user---------------------------------
  @Public()
  @Get('get-recipes-for-current-user/:id')
  getRecipe(@Param('id') id: number) {
    return this.recipeService.getRecipe(+id);
  }
  //-------------------------------Get recipes for other users---------------------------------
  @Public()
  @Get('get-recipes-for-other-users/:id')
  getRecipes(@Param('id') id: number) {
    return this.recipeService.getRecipes(+id);
  }
  //-------------------------------Create new Nation---------------------------------
  @Public()
  @Post('create-nation/:nation')
  createNation(@Param('nation') nation: string) {
    return this.recipeService.createNation(nation)
  }

  //-------------------------------Get all nations-------------------------------------
  @Public()
  @Get('get-all-nations')
  getAllNations() {
    return this.recipeService.findAllNations();
  }
  @Public()
  @Get('get-by-nations/:id')
  findRecipeByNations(@Param('id') id:number) {
    return this.recipeService.findRecipeByNations(id);
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
