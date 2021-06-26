import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanel from "../components/ProductPanel";
import { ItemProps } from '../types/types';
import NavigationControl from "./NavigationControl";
import { CONSTANT } from "../constants/constants";

export default function ProductPanelCarousel() {
    const [carData, setCarData] = useState<ItemProps[]>([]);
    const [containerWidth, setContainerWidth] = useState();
    const [navigation, setNavigation] = useState();
    const [isForward, setIsForward] = useState(false);
    const [isBackward, setIsBackward] = useState(false);
    let [counter, setCounter] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);

    const movePanel = (direction: number) => { // direction value determines panel direction
        direction === 0 ? setCounter(counter--) : setCounter(counter++) ;
        checkNavigation();
        // 0: backwards, 1: forwards
        const panelDirection = direction ? (navigation - containerWidth) : (navigation + containerWidth)
        // totalGroups
        setNavigation(panelDirection);
    }

    const checkNavigation = () => { // checks if navigation should be disabled = needs refactoring


        if (counter <= 0) {
            setIsBackward(false)
        } else {
            setIsBackward(true)
        }
        if (counter >= totalGroups) {
            setIsForward(false)
        } else {
            setIsForward(true)
        }
    }

    const calculateGroupTotal = () => {
        // TODO: total to calculate when navigation has hit a boundary
        // const total = Math.ceil(carData.length / CONSTANT.groupedItems);
        setTotalGroups(1);
        checkNavigation();
    }

    const ref = useRef(null);

    const positionStyle = () => { // creates the scroll effect
        return {
            left: navigation + 'px',
            position: 'relative' as 'relative'
        }
    };

    const setCurrentWidth = () => { // used to calculate how much the carousel should scroll
        // @ts-ignore
        let currentWidth = ref.current ? ref.current.offsetWidth : 0;
        setNavigation(0);
        setContainerWidth(currentWidth);
        calculateGroupTotal();
    }

    window.addEventListener('resize', setCurrentWidth);

    useEffect(() => { // calls api
        fetch(CONSTANT.url)
            .then(response => response.json())
            .then(data => setCarData(data))
    }, []);

    useEffect(() => { // sets current element width
        setCurrentWidth();
    }, [ref.current]);

    useEffect(() => { // Calculates how many item groups exist for navigation puroses
        calculateGroupTotal();
    }, [carData]);

  return (
      <Block>
        <div ref={ref} className="productPanelWrapper">
            <Block>
                <div style={positionStyle()} className="productPanelContainer">
                  {carData &&
                      carData.map((item:ItemProps) => {
                          return (<>
                              <ProductPanel
                                  id={item.id}
                                  bodyType={item.bodyType}
                                  modelName={item.modelName}
                                  modelType={item.modelType}
                                  imageUrl={item.imageUrl}
                              />
                          </>)
                      })
                  }
                </div>
            </Block>
            <NavigationControl fnc={movePanel} forward={!isForward} backward={!isBackward} />
        </div>
      </Block>
  );
}