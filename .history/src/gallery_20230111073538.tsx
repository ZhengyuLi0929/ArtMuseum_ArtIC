import axios from 'axios';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function GalleryView(){
    interface Image{
        id: number
        image_id: string
        title: string
        _score: number
    }
    const [ID, setID] = useState<number[]>([]);
    const [title, setTitle] = useState<string []>([]);

    const api = axios.create({baseURL: 'https://api.artic.edu/api/v1/'});


    // initialize GalleryView with some random images
    // by calling handleArtists with 'monet'
    // this is similar to componentDidMount in class component
    // https://reactjs.org/docs/hooks-effect.html
    // https://reactjs.org/docs/hooks-reference.html#useeffect
    useEffect(() => {
        handleArtists({currentTarget: {value: 'monet'}} as React.MouseEvent<HTMLButtonElement>)
    }, [])
    
    // write handleArtists that search for the artist name
    // and set the imagesUrl and title
    const handleArtists = (event: React.MouseEvent<HTMLButtonElement>) => {
        const artistName = event.currentTarget.value;
        api.get(`artworks/search?q=${artistName}&&fields=id,title,image_id&&limit=50`)
            .then((res) => {
                const tempID : number [] = []
                const tempTitle: string [] = []
                if (res.data) {
                    res.data.data.map
                    ((image: Image) =>{tempID.push(image.id)})
                    res.data.data.map((image:Image) => {tempTitle.push(`${image.title}`)})
                    setID(tempID)
                    setTitle(tempTitle)
                }
            }
        );
    }

    return(
        <div>
            <div> 
                Here is the Gallery Panel! 
            </div>
            <button value = "monet" onClick = {handleArtists}>Monet</button>
            <button value = "picasso" onClick = {handleArtists}>Picasso</button>
            <button value = "rembrandt" onClick = {handleArtists}>Rembrandt</button>
            <button value = "van gogh" onClick = {handleArtists}>Van Gogh</button>
            <button value = "durer" onClick = {handleArtists}>Durer</button>
            <button value = "gauguin" onClick = {handleArtists}>Gauguin</button>
            <button value = "da vinci" onClick = {handleArtists}>Da Vinci</button>
            <button value = "canaletto" onClick = {handleArtists}>Canaletto</button>
            <div>
            {
                ID.length ? ID.map(
                    (id:number) => {
                        // turn id to string
                        // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                        const idString = id.toString();
                        return (
                            <Link to = {`/items/${idString}`}>
                                <img src = {`http://www.artic.edu/iiif/2/${idString}/full/843,/0/default.jpg`} height = "200"></img>
                            </Link>
                        )
                    }
                ) : <></>
            }
            </div>
            
        </div>
    );
}