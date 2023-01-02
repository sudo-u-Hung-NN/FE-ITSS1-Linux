import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryBuilder, Repository, Not, Like } from 'typeorm';
import { CreateNationDto } from './dto/create-nation.dto';
import { CreateRawMaterial } from './dto/create-raw-material';
import { CreateRecipeTasteDto } from './dto/create-recipe-taste.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateTasteDto } from './dto/create-taste.dto';
import { CreateRecipeRawDto } from './dto/recipe-raw-material.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Nation } from './entities/nation.entity';
import { RawMaterial } from './entities/raw-material.entity';
import { RecipeRawMaterial } from './entities/recipe-raw-material.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeTaste } from './entities/taste-recipe.entity';
import { Taste } from './entities/taste.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
    @InjectRepository(RawMaterial)
    private readonly rawMaterialRepo: Repository<RawMaterial>,
    @InjectRepository(RecipeRawMaterial)
    private readonly recipeRawMaterialRepo: Repository<RecipeRawMaterial>,
    @InjectRepository(Nation)
    private readonly nationRepo: Repository<Nation>,
    @InjectRepository(Taste)
    private readonly tasteRepo: Repository<Taste>,
    @InjectRepository(RecipeTaste)
    private readonly recipeTasteRepo: Repository<RecipeTaste>,
  ) { }
  /* *
  * Thêm mới công thức vào bảng công thức
  * */
  create(createRecipeDto: CreateRecipeDto) {
    return this.recipeRepo.save(createRecipeDto);
  }
  /*
  * Thêm mới quốc gia
  * */
  async createNation(nationName: string) {
    const nationObj = await this.nationRepo.findOne({where: {name: nationName}});
    if (!nationObj) {
      const createNationDTO: CreateNationDto = {name: nationName}
      return this.nationRepo.save(createNationDTO);
    } else {
      return "Quốc gia này đã tồn tại"
    }
    return "Thêm mới quốc gia thành công"
  }
  /* *
   * Lấy ra tất cả các quốc gia
   * */
  findAllNations () {
    return this.nationRepo.find();
  }
  /**
   * Thêm mới hương vị
   * */
  createTaste(createTaste: CreateTasteDto) {
    return this.tasteRepo.save(createTaste);
  }
  /*
  * Lấy ra tất cả các hương vị
  * */
  getAllTastes () {
    return this.tasteRepo.find();
  }

  /* *
   * Insert data to recipe-taste table
   * */
  createRecipeTaste(createRecipeTaste: CreateRecipeTasteDto) {
    return this.recipeTasteRepo.save(createRecipeTaste);
  }

  /* *
   * Insert data to raw-material table
   * */
  createRawMaterial(createRawMaterial: CreateRawMaterial) {
    return this.rawMaterialRepo.save(createRawMaterial);
  }

  /* *
   * Thêm dữ liệu vào bảng Recipe-Raw-Material
   * */
  createRecipeMaterial(createRecipeRawDto: CreateRecipeRawDto[]) {
    return this.recipeRawMaterialRepo.save(createRecipeRawDto);
  }

  /* *
  * Lấy công thức có tên giống chuỗi đã nhập vào
  * */
  search(name: string) {
    console.log('abc', name);
    console.log('search by name');

    return this.recipeRepo.find({ where: { name: Like(`%${name}%`) } });
  }

  /* *
  * Thêm mới công thức vào bảng công thức
  * */
  async saveRecipe(id: number, userId: number) {
    const recipe = await this.recipeRepo.findOne({ where: { id: id } });
    if (recipe.creator === 1) {
      recipe.creator = userId;
    }
    return this.recipeRepo.save(recipe);
  }

  /* *
   * Lọc công thức theo id của nguyên liệu
   * */
  async filter(id: number[]) {
    const queryBuilder = this.recipeRawMaterialRepo.createQueryBuilder(
      'recipe_raw_material',
    );
    queryBuilder.where(`recipe_raw_material.raw_material_id IN (:...id)`, {
      id: id,
    });
    queryBuilder.groupBy('recipe_raw_material.recipe_id');
    const data = await queryBuilder.getRawMany();
    return await this.findByIds(
      data.map((e) => e.recipe_raw_material_recipe_id),
    );
  }

  /* *
  * Lọc công thức theo id của hương vị
  * */
  async filterTaste(id: number[]) {
    const queryBuilder =
      this.recipeTasteRepo.createQueryBuilder('recipe_taste');
    queryBuilder.select('count(recipe_taste.recipe_id)', 'count')
    queryBuilder.addSelect('recipe_taste.recipe_id', 'recipe_id')
    queryBuilder.where(`recipe_taste.taste_id IN (:...id)`, { id: id });
    queryBuilder.groupBy('recipe_taste.recipe_id')
    queryBuilder.having('count>=:length', { length: id.length })
    const data = await queryBuilder.getRawMany();
    const proposalReview = await this.findByIds(
      data.map((e) => e.recipe_id),
    );
    return proposalReview;
  }

  /* *
  * Lấy danh sách công thức theo các id của công thức.
  * Function này sử dụng cho chức năng Filter được gọi bởi các function khác
  * @Param id của các công thức
  * */
  async findByIds(id: number[]) {
    return await this.recipeRepo.find({
      where: {
        id: In(id),
      },
    });
  }

  /* *
   * Lọc công thức theo id của nguyên liệu
   * */
  async findOne(id: number) {
    const recipe = await this.recipeRepo.findOne({
      where: {
        id: id,
      },
    });
    const queryBuilder = this.recipeRawMaterialRepo.createQueryBuilder(
      'recipe_raw_material',
    );
    queryBuilder.leftJoinAndSelect(
      `recipe_raw_material.rawmaterial`,
      `raw_material`,
    );
    queryBuilder.where(`recipe_raw_material.recipe_id = :id`, {
      id: recipe.id,
    });
    const material = await queryBuilder.getRawMany();
    console.log('a', queryBuilder.getQuery());
    console.log('ahihi', material);
    return [recipe, material];
  }

  /* *
   * Lấy ra tất cả công thức
   * */
  findAll() {
    return this.recipeRepo.find();
  }

  /* *
   * Lấy ra tất cả các nguyên liệu
   * */
  findAllRawMaterial() {
    return this.rawMaterialRepo.find();
  }

  /* *
   * Sửa công thức
   * */
  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  /* *
   * Xóa Công thức
   * */
  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }

  /* *
   * Lấy tất cả công thức cho người dùng hiện tại
   * @Param id của người dùng hiện tại
   * */
  getRecipe(id: number) {
    return this.recipeRepo.find({ where: { creator: id } });
  }

  /* *
   * Lấy tất cả các công thức của người dùng khác trừ người dùng hiện tại
   * */
  getRecipes(id: number) {
    return this.recipeRepo.find({ where: { creator: Not(id) } });
  }
}
