import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductsCards from '../ProductsCards/ProductsCards.jsx';
import { addFilter, removeFilter, setOrder } from "../../redux/actions/index";
import './HomePage.scss'
import trash from '../../images/trash.png'

function HomePage() {
    const dispatch = useDispatch()
    let products = useSelector(state => state.products)
    // let categories = useSelector(state => state.categories)
    let filters = useSelector(state => state.filters)
    let orderedBy = useSelector(state => state.orderBy)

    JSON.parse(localStorage.getItem('filter'));

    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filters));
    }, [filters]);

    if (filters.length) {
        products = products
            .filter(product => {
                let productCategories = product.categories.map(cat => cat.name)
                return filters.reduce((prevFilter, nextFilter) => {
                    return prevFilter && productCategories.includes(nextFilter)
                }, true)
            })
        /* el primer filtrado, solo filtra si encuentra la categoria,
        en el segundo se fija que esten todas las categorias seleccionadas
        hace un map de los nombres de las categorias de cada producto
        y luego con el reduce devuelve true si todas las categorias del filtro estan
        en las categorias del producto, sino devuelve false */
    }
    
    var categoriesInProducts = products.map((p) => p.categories.map((c) => c.name))
    let categoriesDisplayed = []
    categoriesInProducts.map((e) => categoriesDisplayed = [...new Set([...categoriesDisplayed, ...e])]);
    // console.log(categoriesDisplayed.sort())

    //sort functionsf
    if (orderedBy) {
        switch (orderedBy) {
            case 'Name-Asc':
                products = [...products.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        > p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    return 0;
                })]

                break;
            case "Name-Des":
                products = [...products.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") >
                        p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    return 0;
                })]

                break;
            case 'Price-Asc':
                products = [...products.sort((p1, p2) => {
                    return p1.price - p2.price;
                })]

                break;
            case 'Price-Des':
                products = [...products.sort((p1, p2) => {
                    return p2.price - p1.price;
                })]

                break;
            default://sort by rating? display favoritos si hay?
                break;
        }
    }

    function onSelectChange(e) {
        dispatch(setOrder(e.target.value))
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(products.length / postPerPage)


    let numberOfPages = [];
    for (let i = 1; i <= howManyPages; i++) {
        numberOfPages.push(i);
    }

    // useEffect(() => {
    //     localStorage.setItem('currentPage', JSON.stringify(currentPage));
    //     // if (JSON.parse(localStorage.getItem('currentPage')) !== 1) {
    //     //     setCurrentPage(JSON.parse(localStorage.getItem('currentPage')))
    //     // };
    // }, [currentPage]);


    //filter functions
    function onClickFilter(e) {
        if (!filters.includes(e.target.id)) {
            dispatch(addFilter(e.target.id))
        }
        setCurrentPage(1)
    }

    function onClickFieldset(e) {
        dispatch(removeFilter(e.target.id))
        setCurrentPage(1)
    }



    return (
        <div className='totalHomeContainer'>
            <div className='paginationContainer'>
                <button
                    className={`${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)}
                >
                    Prev
                </button>
                <button>{currentPage}</button>
                <button
                    className={`${currentPage === numberOfPages.length ? 'disabled' : ''}`}
                    onClick={() => setCurrentPage(prev => prev >= numberOfPages.length ? prev : prev + 1)}
                >
                    Next
                </button>

            </div>
            <div className='homeContainer'>
                <ProductsCards allProducts={currentPosts} />
                <div className="filter-container">
                    {
                        filters.length ? <><h6>Filtros Activos</h6><fieldset>{filters.map(filter => <div className='activeFilterContainer' id={filter} onClick={onClickFieldset}>{filter} <img src={trash} alt='X' /></div>)}</fieldset></> : <></>
                    }
                    <div>
                    <h2>Encontrá lo que buscas...</h2>
                    <ul className='ulElement'>{categoriesDisplayed.sort().map(cat => {
                        if(!filters.includes(cat))
                        return (
                            <li className='liElement' key={cat} id={cat} onClick={(e) => onClickFilter(e)}>►{cat}</li>
                        )
                    })}</ul>
                    </div>
                    <select name='order-by' onChange={onSelectChange}>
                        <option>Ordenar por...</option>
                        <option value='Name-Asc'>Letras: A-Z</option>
                        <option value='Name-Des'>Letras: Z-A</option>
                        <option value='Price-Asc'>Más baratos</option>
                        <option value='Price-Des'>Más caros</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
