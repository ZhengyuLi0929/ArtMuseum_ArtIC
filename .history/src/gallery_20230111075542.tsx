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
    const [image, setImage] = useState<Image []>([]);

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
                const tempID : string [] = []
                const tempTitle: string [] = []
                if (res.data) {
                    // res.data.data.map
                    // ((image: Image) =>{tempID.push(image.image_id)})
                    // res.data.data.map((image:Image) => {tempTitle.push(`${image.title}`)})
                    // setID(tempID)
                    // setTitle(tempTitle)

                    // set image state
                    setImage(res.data.data)
                }
            }
        );
    }

    return(
        <div>
            <div> 
                Gallery Panel Allows You to Search for Different Artists With A Simple Click.
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
                image.length ? image.map(
                    (image:Image) => {
                        // turn id to string
                        // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
                        // const idString = id.toString();
                        console.log(image.id, image.image_id);
                        return (
                            <Link to = {`/items/${image.id}`}>
                                <img src = {`http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`} height = "200"></img>
                            </Link>
                        )
                    }
                ) : <></>
            }
            </div>
            
        </div>
    );
}