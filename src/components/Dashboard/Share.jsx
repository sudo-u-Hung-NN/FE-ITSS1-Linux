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
import { set } from "date-fns";
import { getAllTastesApi, postListTasteApi } from "./../Api/taste.api";
import { getAllNations } from "./../Api/nation.api";

function Share(props) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const creator = user?.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [formula, setFormula] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(1);
  const [ingredient, setIngredient] = useState({ id: 0, name: "", amount: 0 });
  const [listIngreDropBox, setListIngreDropBox] = useState([]);
  const [listIngreForAdd, setListIngreForAdd] = useState([]);
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [nation, setNation] = useState("");
  const [taste, setTaste] = useState([]);
  const [listTasteForAdd, setListTasteForAdd] = useState([]);

  const [nations, setNations] = useState([]);
  const [allTastes, setAllTastes] = useState([]);
  const mockup_ingredients = listIngreDropBox.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const handleCreateRecipe = () => {
    createRecipe({
      name: name,
      videoUrl: videoUrl,
      description: description,
      nation: nation,
      image: image,
      formula: formula,
      note: note,
      creator: creator,
      price: price,
      views: 0,
    })
      .then((response) => {
        const listIngredientNew = listIngreForAdd.map((item) => ({
          recipe_id: Number(response.data.id),
          raw_material_id: item.id,
          amount: Number(item.amount),
        }));
        const listTasteNew = listTasteForAdd.map((item) => ({
          recipe_id: Number(response.data.id),
          taste_id: item.id,
        }));
        const listShare = { listIngredientNew, listTasteNew };
        return listShare;
      })
      .then((res) => {
        createRawMaterialApi([...res.listIngredientNew]).then(() => {
          postListTasteApi([...res.listTasteNew]).then(() => {
            toast("✅ Chia sẻ thành công!");
          });
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("❌ Chia sẻ thất bại");
      });
  };

  //----------------------------------UPLOAD image for create Recipe-------------------------------
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
      case "video-url":
        setVideoUrl(e.target.value);
        break;
      case "nation":
        setNation(e.target.value);
        break;
      case "taste":
        setTaste(e.target.value);
        break;
      default:
        console.log("handleChange...");
    }
  };
  const deleteTagIngredient = (index) => {
    let listIngreForAdd2 = listIngreForAdd.filter((item, i) => i !== index);
    setListIngreForAdd(listIngreForAdd2);
  };
  const deleteTagTaste = (index) => {
    let listTasteForAdd2 = listTasteForAdd.filter((item, i) => i !== index);
    setListTasteForAdd(listTasteForAdd2);
  };
  const handleChangeAmount = (event) => {
    setAmount(Number(event.target.value));
  };
  console.log("Recipe: ", {
    name: name,
    nation: nation,
    description: description,
    image: JSON.stringify(image),
    formula: formula,
    note: note,
    creator: creator,
    price: price,
    views: 0,
    videoUrl,
  });

  const handleChangeIngredient = (event) => {
    setIngredient({
      id: event.value,
      name: event.label,
      amount: amount,
    });
  };
  const handleChangeTaste = (event) => {
    setTaste({
      id: event.value,
      name: event.label,
    });
  };

  //--------------------------------SET Ingredient to state------------------------------------
  useEffect(() => {
    setIngredient({
      ...ingredient,
      amount: amount,
    });
  }, [setAmount, amount]);

  //-------------------------------GET ALL Tastes----------------------------------
  useEffect(() => {
    getAllTastesApi()
      .then((res) => {
        return res.data.map((item) => ({ value: item.id, label: item.name }));
      })
      .then((res) => {
        setAllTastes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //--------------------------------GET ALL Nations--------------------------------
  useEffect(() => {
    getAllNations()
      .then((res) => {
        return res.data.map((item) => ({ value: item.id, label: item.name }));
      })
      .then((res) => {
        setNations(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //---------------------------------GET ALL Ingredients-------------------------------
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
            <h2>Chia sẻ công thức 🍔</h2>
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
                        Chọn ảnh món ăn
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
                    <p className="recipe-name-add-item">Tên công thức </p>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      className="recipe-name-add-input"
                      onChange={handleChangeForm}
                      placeholder="VD: Đậu sốt cà chua"
                    />
                  </div>
                  <div className="recipe-name-add">
                    <p className="recipe-name-add-item">Quốc gia</p>
                    <Select
                      className="nation-select"
                      required
                      placeholder="Tìm kiếm..."
                      options={nations}
                      onChange={(e) => {
                        setNation(e.value);
                      }}
                    />
                  </div>
                  <div className="recipe-name-add">
                    <p className="recipe-name-add-item">Giá tiền </p>
                    <input
                      required
                      min={1}
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
                    <p>Nguyên liệu </p>
                    <div className="ingredient-add-item">
                      <div className="ingredient-add-item-name">
                        <label>Tên:</label>
                        <Select
                          required
                          placeholder="Tìm kiếm..."
                          options={mockup_ingredients}
                          onChange={(e) => {
                            listIngreDropBox.find((i) => {
                              if (i?.id === e.value) {
                                setUnit(i?.unit);
                              }
                            });
                            handleChangeIngredient(e);
                          }} // Handle here
                        />
                        {/* <GrClose size={15} className='delete-item-ingredient-add-item' onClick={() => deleteInput(item)} /> */}
                      </div>
                      <div className="ingredient-add-item-amount">
                        <label>Số lượng:</label>
                        <input
                          id="amount-input"
                          min={1}
                          type="number"
                          value={amount}
                          onChange={(e) => {
                            handleChangeAmount(e);
                          }}
                        />
                      </div>
                      <div className="ingredient-add-item-unit">
                        <label for="">Đơn vị: </label>
                        <p>{unit}</p>
                      </div>
                    </div>
                    <RiAddCircleFill
                      size={26}
                      className="btn-add-ingredient"
                      onClick={() => {
                        if (ingredient.name !== "") {
                          setListIngreForAdd([...listIngreForAdd, ingredient]);
                          setAmount(1);
                          setIngredient({ id: 0, name: "", amount: 0 });
                        }
                      }}
                    />
                  </div>
                  <div className="ingredient-add">
                    <p>Hương vị món ăn </p>
                    <div className="ingredient-add-item">
                      <div className="ingredient-add-item-name">
                        <label>Tên:</label>
                        <Select
                          required
                          placeholder="Tìm kiếm..."
                          options={allTastes}
                          onChange={(e) => {
                            handleChangeTaste(e);
                          }} // Handle here
                        />
                        {/* <GrClose size={15} className='delete-item-ingredient-add-item' onClick={() => deleteInput(item)} /> */}
                      </div>
                    </div>
                    <RiAddCircleFill
                      size={26}
                      className="btn-add-ingredient"
                      onClick={() => {
                        if (taste.name !== "") {
                          setListTasteForAdd([...listTasteForAdd, taste]);
                          setTaste({ id: 0, name: "" });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="other-input">
                <div>
                  <h5>Danh sách hương vị:</h5>
                  <div className="list-ingredient-for-add">
                    <ul>
                      {listTasteForAdd.map((taste, index) => (
                        <li key={index} className="ingredient-for-add-item">
                          <span className="index">{index + 1}</span>
                          <span>{taste.name}</span>
                          <GrClose
                            className="btn-remove-tag"
                            onClick={() => deleteTagTaste(index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h5>Danh sách nguyên liệu:</h5>
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
                    className="ytb-url"
                    id="video-url"
                    name="video-url"
                    value={videoUrl}
                    onChange={handleChangeForm}
                  ></textarea>
                  <label>Link video hướng dẫn</label>
                  <span></span>
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
                  <label>Miêu tả chi tiết</label>
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
                  <label>Công thức</label>
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
                  <label>Chú ý</label>
                  <span></span>
                </div>
              </div>

              <button type="submit" className="button-27">
                Chia sẻ
              </button>
            </div>
          </form>
          <ToastContainer />
        </>
      ) : (
        <div className="login-after-share">
          <AiFillWarning fontSize={"120px"} color="#FD6929" />
          <p>
            Bạn phải
            <i>
              <Link to="/login"> đăng nhập </Link>
            </i>
            để chia sẻ công thức
          </p>
        </div>
      )}
    </>
  );
}

export default Share;
