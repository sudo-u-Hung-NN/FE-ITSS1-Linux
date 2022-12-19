import React, { useEffect, useState } from "react";
import "../../CSS/share.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";
import { RiAddCircleFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { getAllIngredients } from "../Api/ingredient.api";
import { uploadImageToCloudinary } from "../Api/upload.api";
import { createRawMaterialApi, createRecipe } from "../Api/recipe.api";
import { AiFillWarning } from "react-icons/ai";
import { Link } from "react-router-dom";

function Share(props) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const creator = user?.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [formula, setFormula] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredient, setIngredient] = useState();
  const [listIngreDropBox, setListIngreDropBox] = useState([]);
  const [listIngreForAdd, setListIngreForAdd] = useState([]);
  const [amount, setAmount] = useState(0);

  const mockup_ingredients = listIngreDropBox.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleCreateRecipe = () => {
    createRecipe({
      name: name,
      description: description,
      image: image,
      formula: formula,
      note: note,
      creator: creator,
      price: price,
      views: 0,
    })
      .then((response) => {
        console.log("New Recipe", response.data);
        const listIngredientNew = listIngreForAdd.map((item) => ({
          recipe_id: Number(response.data.id),
          raw_material_id: item.id,
          amount: Number(item.amount),
        }));
        console.log("recipe raw: ", listIngredientNew);
        return listIngredientNew;
      })
      .then((res) => {
        createRawMaterialApi([...res]).then((response) => {
          console.log(response.data);
          toast("✅ Share Recipe success!");
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("❌ Sharing failed");
      });
  };

  const handleChangeImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    uploadImageToCloudinary(formData)
      .then((res) => {
        return res.data.url;
      })
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {
        console.error("Err: ", err);
      });
  };

  const handleChangeForm = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "formula":
        setFormula(e.target.value);
        break;
      case "note":
        setNote(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
        console.log("handleChange...");
    }
  };

  const deleteTagIngredient = (index) => {
    let listIngreForAdd2 = listIngreForAdd.filter((item, i) => i !== index);
    setListIngreForAdd(listIngreForAdd2);
  };

  const handleChangeAmount = (event) => {
    setAmount(Number(event.target.value));
  };

  console.log("Recipe: ", {
    name: name,
    description: description,
    image: JSON.stringify(image),
    formula: formula,
    note: note,
    creator: creator,
    price: price,
    views: 0,
  });

  const handleChangeIngredient = (event) => {
    setIngredient({
      id: event.value,
      name: event.label,
      amount: amount,
    });
  };

  useEffect(() => {
    setIngredient({
      ...ingredient,
      amount: amount,
    });
  }, [setAmount, amount]);

  useEffect(() => {
    getAllIngredients()
      .then((response) => {
        setListIngreDropBox(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {user ? (
        <>
          <form onSubmit={handleCreateRecipe} className="form-container-input">
            <h2>Share Your Recipes 🍔</h2>
            <div className="share-container">
              <div className="recipe-form-1">
                <div className="add-image">
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt=""
                        style={{
                          width: "400px",
                          height: "400px",
                          borderRadius: "10px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="image">
                        <AddAPhotoIcon />
                        Choose a Photo
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className="recipe-image"
                        value={image}
                        // style={{display:"none"}}
                        accept="image/*"
                        onChange={handleChangeImage}
                      />
                    </>
                  )}
                </div>
                <div className="add-text">
                  <div className="recipe-name-add">
                    <p className="recipe-name-add-item">Recipe name </p>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      className="recipe-name-add-input"
                      onChange={handleChangeForm}
                      placeholder="recipe name"
                    />
                  </div>

                  <div className="recipe-name-add">
                    <p className="recipe-name-add-item">Price </p>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={price}
                      className="recipe-name-add-input"
                      onChange={handleChangeForm}
                    />
                  </div>
                  <hr />
                  <div className="ingredient-add">
                    <p>Ingredient </p>
                    <div className="ingredient-add-item">
                      <div className="ingredient-add-item-name">
                        <label>Name:</label>
                        <Select
                          placeholder="Search..."
                          options={mockup_ingredients}
                          onChange={(e) => {
                            handleChangeIngredient(e);
                          }} // Handle here
                        />
                        {/* <GrClose size={15} className='delete-item-ingredient-add-item' onClick={() => deleteInput(item)} /> */}
                      </div>
                      <div className="ingredient-add-item-amount">
                        <label>Amount:</label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => {
                            handleChangeAmount(e);
                          }}
                        />
                      </div>
                    </div>
                    <RiAddCircleFill
                      size={26}
                      className="btn-add-ingredient"
                      onClick={() => {
                        setListIngreForAdd([...listIngreForAdd, ingredient]);
                        setAmount(0);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="other-input">
                <div>
                  <h5>List Ingredient:</h5>
                  <div className="list-ingredient-for-add">
                    <ul>
                      {listIngreForAdd.map((ingredient, index) => (
                        <li key={index} className="ingredient-for-add-item">
                          <span className="index">{index + 1}</span>
                          <span>
                            {ingredient.name} : {ingredient.amount}
                          </span>
                          <GrClose
                            className="btn-remove-tag"
                            onClick={() => deleteTagIngredient(index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="styled-input wide">
                  <textarea
                    required
                    className="description-add"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChangeForm}
                  ></textarea>
                  <label>Description</label>
                  <span></span>
                </div>
                <div className="styled-input wide">
                  <textarea
                    required
                    className="formula-add"
                    id="formula"
                    name="formula"
                    value={formula}
                    onChange={handleChangeForm}
                  ></textarea>
                  <label>Formula</label>
                  <span></span>
                </div>
                <div className="styled-input wide">
                  <textarea
                    required
                    className="note-add"
                    id="note"
                    name="note"
                    value={note}
                    onChange={handleChangeForm}
                  ></textarea>
                  <label>Note</label>
                </div>
              </div>

              <button type="submit" className="button-27">
                Share
              </button>
            </div>
          </form>
          <ToastContainer />
        </>
      ) : (
        <div className="login-after-share">
          <AiFillWarning fontSize={"120px"} color="#FD6929" />
          <p>
            You must
            <i>
              <Link to="/login"> Login </Link>
            </i>
            before sharing your recipes
          </p>
        </div>
      )}
    </>
  );
}

export default Share;
