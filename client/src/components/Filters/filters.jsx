import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter, setProductsToDisplay } from "../../redux/actions/index";
import './filters.scss'
import trash from '../../images/trash.png'

export default function Filters(){
    let displayedProducts = useSelector(state=>state.products)
    let categories = useSelector(state=>state.categories)
    let filters = useSelector(state=>state.filters)
    let dispatch = useDispatch()

    //filters = ['Gorros', 'Conjuntos', 'Calza']
    
        //console.log('antes de filtrar',displayedProducts)
        if(filters.length){
            displayedProducts=displayedProducts
            .filter(product=>product.categories
                .filter(cat=>filters.includes(cat.name)).length>0)
            
        }
        //console.log('despues de filtrar',displayedProducts)


    function onClickFilter(e){
        if(!filters.includes(e.target.id)){
            dispatch(addFilter(e.target.id))
            dispatch(setProductsToDisplay(displayedProducts))
        }
    }
    
    function onClickFieldset(e){
        dispatch(removeFilter(e.target.id))
    }

    //console.log(filters)
    return(
        <div className="filterContainer">
            {
                filters.length?<><fieldset>{filters.map(filter=><div className="activeFilterContainer" id={filter} onClick={onClickFieldset}>{filter} <img className="trash" src={trash} alt='X'/></div>)}</fieldset></>:<></>
            }
            <ul className="ulElement">{categories.map(cat=>{
                return(
                <li className="liElement" id={cat} onClick={(e)=>onClickFilter(e)}>{cat}</li>
                )
            })}</ul>
        </div>
    )
}