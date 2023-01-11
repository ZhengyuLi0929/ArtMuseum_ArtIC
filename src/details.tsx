// import axios from 'axios';
// import {useState} from 'react';

// export default function DetailsView(){
//     interface Image{
//         id: number
//         image_id: string
//         title: string
//         _score: number
//     }
//     const [imagesUrl, setImagesUrl] = useState<string[]>([]);

//     const api = axios.create ({baseURL: 'https://api.artic.edu/api/v1/'})

//     api.get('artworks/search?')

//     return(
//         <div> Here is the Gallery Panel! </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import {Image, Input,  Container, Button, List, Segment, Label} from "semantic-ui-react";
import { Link, useParams } from 'react-router-dom';
import 'normalize.css';
import axios from 'axios'

interface Image {
    id: number;
    title: string;
    place_of_origin: string;
    url: string;
    // description: string;
    date_display: string;
    artist_display: string;
    inscriptions: string;
}

const ItemDetails: React.FC = () => {

    const { itemId } = useParams();
    const api = axios.create({ baseURL: 'https://api.artic.edu/api/v1/' });
    const [item, setItem] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // var [itemId, setItemId] = useState(Number(itemId));
    const [currentItemId, setCurrentItemId] = useState(Number(useParams().itemId));

    useEffect(() => {
        const fetchItem = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`artworks/${currentItemId}`);
                const image = response.data.data;
                const itemDetail = {
                      id: image.id,
                      title: image.title,
                      place_of_origin: image.place_of_origin,
                      url: `http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
                      date_display: image.date_display,
                      artist_display: image.artist_display,
                      inscriptions: image.inscriptions,
                };
                setItem(itemDetail);
                setIsLoading(false);
            }catch (error) {
                console.error(error);
            }
        }
        fetchItem();
    }, [currentItemId])

    const handleNext = () => {
        setCurrentItemId(currentItemId+1);
    }
    const handlePrev = () => {
        setCurrentItemId(currentItemId-1);
    }


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!item) {
        return <div>Item not found</div>
    }

    return (
        <div>
            <h1>{item.title}</h1>
            <img src={item.url} height = "500" alt={item.title}/>
            <h2>Item ID: {item.id}</h2>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <h2>{item.place_of_origin}</h2>
            <h2>Item production date: {item.date_display}</h2>
            <h2>Artist: {item.artist_display}</h2>
            <h2>Inscriptions: {item.inscriptions}</h2>
        </div>
    );
}

export default ItemDetails;