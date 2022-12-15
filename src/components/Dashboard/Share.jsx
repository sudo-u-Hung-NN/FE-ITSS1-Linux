import React, { useEffect, useState } from 'react';
import '../../CSS/share.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { AiFillWarning } from 'react-icons/ai'
import { RiAddCircleFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import { getAllIngredients } from '../Api/ingredient.api';

function Share(props) {
    const user = useSelector(state => state.auth.login.currentUser);
    const creator = user?.id;
    const token = localStorage.getItem('access_token');
    const [inputCounts, setInputCounts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [formula, setFormula] = useState('');
    const [note, setNote] = useState('');
    const [price, setPrice] = useState(0);
    const [vote, setVote] = useState(0);
    const [views, setViews] = useState(0);
    const [ingredient, setIngredient] = useState();
    const [listIngreDropBox, setListIngreDropBox] = useState([]);
    const [listIngreForAdd, setListIngreForAdd] = useState([]);


    const mockup_ingredients = listIngreDropBox.map((item) => ({ value: item.id, label: item.name }));
    // const navigate = useNavigate();

    const recipe = {
        name: name,
        description: description,
        image: JSON.stringify(image),
        formula: formula,
        note: note,
        creator: creator,
        price: price,
        vote: vote,
        views: views
    }




    const handleCreateRecipe = () => {
        const baseUrl = 'http://localhost:3000/recipe';
        axios.post(baseUrl, recipe)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                toast.error('Sharing failed');
            })
    }

    const handleChangeImage = (e) => {
        console.log('handleChangeImage');
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log('image: ', file);
        setImage(file);
    };


    const handleChangeForm = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'formula':
                setFormula(e.target.value);
                break;
            case 'note':
                setNote(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            default:
                console.log("handleChange...");
        }
    };

    useEffect(() => {
        const recipe = {
            name: name,
            description: description,
            image: image?.preview,
            formula: formula,
            note: note,
            creator: creator,
            price: price,
            views: views
        }

        console.log(recipe);
    });

    // const handleCreateRecipeRawMaterial = (body) => {
    //     const baseUrl = 'http://localhost:3000/recipematerial';
    //     axios.post(baseUrl, body)
    //         .then(response => {
    //             console.log(response.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const deleteInput = (index) => {
        const newInputCounts = [...inputCounts]
        for (var i = 0; i < newInputCounts.length; i++) {

            if (newInputCounts[i] === index) {
                newInputCounts.splice(i, 1);
            }

        }
        setInputCounts(newInputCounts);
    }

    console.log(ingredient)

    useEffect(() => {
        getAllIngredients()
            .then(response => setListIngreDropBox(response.data))
            .catch(err => { console.error(err) });
    }, [])

    return (

        <>
            {
                token ? <>
                    <form onSubmit={handleCreateRecipe} className='form-container-input'>
                        <h2>Share Your Recipes 🍔</h2>
                        <div className="share-container">
                            <div className="recipe-form-1">
                                <div className="add-image">
                                    {
                                        image ?
                                            <>
                                                <img src={image.preview} alt=""
                                                    style={{
                                                        width: '400px',
                                                        height: '400px',
                                                        borderRadius: '10px',
                                                    }}
                                                />
                                            </> :
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
                                    }
                                </div>
                                <div className="add-text">
                                    <div className="recipe-name-add">
                                        <p className="recipe-name-add-item">Recipe name </p>
                                        <input type="text"
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
                                        <input type="number"
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
                                            <div className='ingredient-add-item-name'>
                                                <label>Name:</label>
                                                <Select
                                                    placeholder='Search...'
                                                    options={mockup_ingredients}
                                                    onChange={(e) => { setIngredient({ id: e.value, name: e.label }) }} // Handle here
                                                />
                                                {/* <GrClose size={15} className='delete-item-ingredient-add-item' onClick={() => deleteInput(item)} /> */}
                                            </div>
                                            {
                                                ingredient &&
                                                <div className='ingredient-add-item-amount'>
                                                    <label>Amount:</label>
                                                    <input type="number" onChange={(e) => {
                                                        setIngredient({ ...ingredient, amount: e.target.value })
                                                    }} />
                                                </div>
                                            }

                                            <button className='btn-add'
                                                onClick={() => setListIngreForAdd([...listIngreForAdd, ingredient])}
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {/* <button type="button" onClick={addInput}> */}
                                        <RiAddCircleFill size={26} className='btn-add-ingredient' />
                                        {/* </button> */}

                                        <table className='list-ingre-for-add'>
                                            {listIngreForAdd.map((ingredient, index) => 
                                                <tr key={index}>
                                                    <td>Name: {ingredient.name}</td>
                                                    <td>Amount: {ingredient.amount}</td>
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='other-input'>
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
                                    >
                                    </textarea>
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
                                    >
                                    </textarea>
                                    <label>Note</label>
                                </div>
                            </div>

                            <button type="submit" className="button-27">
                                Share
                            </button>

                        </div>
                    </form>
                </>
                    :
                    <div className='login-after-share'>
                        <AiFillWarning fontSize={"120px"} color="#FD6929" />
                        <p>You must
                            <span><i><Link to='/login'> Login </Link></i></span>
                            before sharing your recipes
                        </p>
                    </div>
            }
        </>
    );
}

export default Share;