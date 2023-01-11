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

    const api = axios.create({baseURL: 'https://api.artic.edu/api/v1/'})

    api.get('artworks/search?q=monet&&fields=id,title,image_id&&limit=50')
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
        )

    return(
        <div>
            <div> 
                Here is the Gallery Panel! 
            </div>
            {
                imagesUrl.length ? imagesUrl.map(
                    (url:string) => {
                        return (
                        <img src = {url} height = "200"></img>
                        )
                    }
                ) : <></>
            }
            {
                title.length ? title.map(
                    (name:string) => {
                        return (
                        <div>{name}</div>
                        )
                    }
                ) : <></>
            }
        </div>
    )
}