import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import './filters.scss';
import '../../Pages/HomePage/HomePage.scss';
import trash from '../../images/trash.png';
import { useTranslation } from "react-i18next";

export default function Filters({ onClickFilter, onClickFieldset, products }) {
    let filters = useSelector(state => state.filters);
    const { t } = useTranslation();
    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filters));
    }, [filters]);

    var categoriesInProducts = products.map((p) => p.categories.map((c) => c.name));
    let categoriesDisplayed = [];
    categoriesInProducts.map((e) => categoriesDisplayed = [...new Set([...categoriesDisplayed, ...e])]);

    return (
        <>
            <div>
                {
                    filters.length
                        ?
                        <div className="activeContainer">
                            <h6>{t('filters.activeFilters')}</h6>
                            <fieldset>
                                {filters.map(filter =>
                                    <div className='activeFilterContainer' key={filter} >
                                       <div>{filter}</div> <img src={trash} alt='X'  id={filter} onClick={(e) => onClickFieldset(e)}/>
                                    </div>
                                )}
                            </fieldset>
                        </div>
                        : <></>
                }
            </div>
            <div>
                <h2 className="menu-title">{t('filters.lookingFor')}</h2>
                <ul className='ulElement'>
                    {
                        categoriesDisplayed.sort().map(cat => {
                            if (!filters.includes(cat)) {
                                return (
                                    <li className='liElement' key={cat} id={cat} onClick={(e) => onClickFilter(e)}>
                                        ►{cat}
                                    </li>
                                )
                            } else return null 
                        })
                    }
                </ul>
            </div>

        </>
    );
};
