import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { Block, Button, View, SelectInput } from 'vcc-ui';
import ProductPanel from "../components/ProductPanel";
import { ItemProps } from '../types/types';
import NavigationControl from "./NavigationControl";
import { CONSTANT } from "../constants/constants";

export default function ProductPanelCarousel() {
    const [carData, setCarData] = useState<ItemProps[]>([]);
    const [savedData, setSavedData] = useState<ItemProps[]>([]);
    const [containerWidth, setContainerWidth] = useState();
    const [navigation, setNavigation] = useState();
    const [isForward, setIsForward] = useState(false);
    const [isBackward, setIsBackward] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    let [counter, setCounter] = useState(0);
    const [totalGroups, setTotalGroups] = useState(0);
    const [filterValue, setFilterValue] = useState('');

    const movePanel = (direction: number) => { // direction value determines panel direction
        direction === 0 ? setCounter(counter--) : setCounter(counter++) ;
        checkNavigation();
        // 0: backwards, 1: forwards
        const panelDirection = direction ? (navigation - containerWidth) : (navigation + containerWidth)
        // totalGroups
        setNavigation(panelDirection);
    }

    const checkNavigation = () => { // checks if navigation should be disabled
        counter <= 0 ? setIsBackward(false) : setIsBackward(true);
        counter >= totalGroups ? setIsForward(false) : setIsForward(true);
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
            .then(data => {
                setCarData(data);
                setSavedData(data);
            })
    }, []);

    useEffect(() => { // sets current element width
        setCurrentWidth();
    }, [ref.current]);

    useEffect(() => { // Calculates how many item groups exist for navigation puroses
        calculateGroupTotal();
    }, [carData]);

    useEffect(() => { // Call for cars to be filtered by value
        filterCars();
    }, [filterValue]);

    const filterCars = () => {
        if (filterValue !== '') {
            setIsFilter(true);
            console.log('isFilter', isFilter)
        }

        const filteredCars = carData.filter(item => item.bodyType === filterValue);
        setCarData(filteredCars);
    }

    const resetCars = () => {
        setCarData(savedData);
        setIsFilter(false);
    }

  return (
      <Block>
        <div ref={ref} className="productPanelWrapper">
            <label htmlFor="filer">Filter by body type</label>
            <SelectInput disabled={isFilter} value={filterValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFilterValue(e.target.value)}>
                <option value="suv">SUV</option>
                <option value="estate">ESTATE</option>
                <option value="sedan">SEDAN</option>
            </SelectInput>
            <Button intent="secondary" onClick={() => resetCars ()}>Reset</Button>
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
            {!isFilter && <NavigationControl fnc={movePanel} forward={!isForward} backward={!isBackward} />}

        </div>
      </Block>
  );
}