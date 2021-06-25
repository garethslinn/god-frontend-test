import React, { ReactElement } from 'react';

type ItemProps = {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl: string;
};

const ProductPanel = ({id, bodyType, modelName, modelType, imageUrl}: ItemProps): ReactElement => {
    return (
        <div key={id} className="productPanel">
            <h3 className="productPanel__bodyType">{bodyType}</h3>
            <h4 className="productPanel__modelName">{modelName}<span>{modelType}</span></h4>
            <img alt={`image of ` + modelName}  className="productPanel__image" src={imageUrl} />
            <div className="productPanel__linkContainer">
                <a href={`/learn/${id}`}>Learn <i className="icon icon-link-chevron">&nbsp;</i></a>
                <a href={`/shop/${id}`}>Shop <i className="icon icon-link-chevron">&nbsp;</i></a>
            </div>
        </div>
    );

}

export default ProductPanel;