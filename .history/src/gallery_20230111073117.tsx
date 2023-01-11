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
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);
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
                const tempImage : string [] = []
                const tempTitle: string [] = []
                if (res.data) {
                    res.data.data.map
                    ((image: Image) =>{tempImage.push(`http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`)})
                    res.data.data.map((image:Image) => {tempTitle.push(`${image.title}`)})
                    setImagesUrl(tempImage)
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
                imagesUrl.length ? imagesUrl.map(
                    (url:string) => {
                        // return image with source being its url, and height 200.
                        // also, when you click on the image, it should go to the items/:id page
                        // where :id is the id of the image
                        // you can get the id by using the imagesUrl.indexOf(url) to get the index of the url
                        // and then use that index to get the id from title
                        // you can use the Link component from react-router-dom
                        // https://reactrouter.com/web/api/Link
                        // https://reactrouter.com/web/guides/quick-start
                        // https://reactrouter.com/web/api/Link/to-object
                        return (
                            <Link to = {`/items/${title[imagesUrl.indexOf(url)]}`}>
                                <img src = {url} height = "200"></img>
                            </Link>
                        )
                    }
                ) : <></>
            }
            </div>
            
        </div>
    );
}