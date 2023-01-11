import axios from 'axios';
import {useState} from 'react';

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


    // api.get('artworks/search?q=paintings&&fields=id,title,image_id&&limit=50')
    //     .then((res) => {
    //         const tempImage : string [] = []
    //         const tempTitle: string [] = []
    //         if (res.data) {
    //             res.data.data.map
    //             ((image: Image) =>{tempImage.push(`http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`)})
    //             res.data.data.map((image:Image) => {tempTitle.push(`${image.title}`)})
    //             setImagesUrl(tempImage)
    //             setTitle(tempTitle)
    //         }
    //     }
    // );
    
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
                        return (
                        <img src = {url} height = "200"></img>
                        )
                    }
                ) : <></>
            }
            </div>
            
        </div>
    );
}