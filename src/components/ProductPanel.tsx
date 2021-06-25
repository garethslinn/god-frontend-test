import React, { ReactElement } from 'react';

type ItemProps = {
    id: string;
    modelName: string;
    bodyType: string;
    modelType: string;
    imageUrl?: string;
};

const ProductPanel = ({id, bodyType, modelName, modelType}: ItemProps): ReactElement => {
    return (
        <div key={id} className="productPanel">
            <h3 className="productPanel__bodyType">{bodyType}</h3>
            <h4 className="productPanel__modelName">{modelName}<span>{modelType}</span></h4>
        </div>
    );

}

export default ProductPanel;