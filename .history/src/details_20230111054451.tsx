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
    name: string;
    url: string;
    // description: string;
    date_display: string;
}

const ItemDetails: React.FC = () => {

    const { itemId } = useParams();
    const api = axios.create({ baseURL: 'https://api.artic.edu/api/v1/' });
    const [item, setItem] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            setIsLoading(true);
            try{
                const response = await api.get(`artworks/${itemId}`);
                const itemDetail = response.data.data.map((image: Image) => {
                    return {
                      id: image.id,
                      title: image.title,
                      url: `http://www.artic.edu/iiif/2/${image.id}/full/843,/0/default.jpg`,
                      date_display: image.date_display,
                      
                    }
                });
                setItem(itemDetail);
                setIsLoading(false);
            }catch (error) {
                console.error(error);
            }
        }
        fetchItem();
    }, [itemId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!item) {
        return <div>Item not found</div>
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <img src={item.url} height = "1000" alt={item.name}/>
        </div>
    );
}

export default ItemDetails;

// interface Image {
//     id: number;
//     image_id: string;
//     title: string;
//     url: string;
//     _score: number;
// }

// class Detail extends React.Component {
// 	constructor(props: {}) {
// 	    super(props);
// 	    this.state = {
// 	      id:this.props.match.params.id,
//           name: "",
//           sprite: "",  // aka, image
//           type: "",
//           height: 0,
//           weight: 0,
//           change:this.props.match.params.id,
//           error:false,
// 	    };

//     	const baseUrl = 'https://api.artic.edu/api/v1/artworks/';
//     	var url = `${baseUrl}${this.state.id}`;

//     	this.nextHandler = this.nextHandler.bind(this);
//     	this.prevHandler = this.prevHandler.bind(this);
    	  
//     	// GET some data back!
        
//     	axios.get(url).then((response) => {
//     		console.log(this.state.id);
//     	   	this.setState({
//                 name: response.data["name"],
//                 sprite: response.data["sprites"]["front_default"],
//                 type: response.data["types"][0]["type"]["name"],
//                 height: response.data["height"],
//                 weight: response.data["weight"],
//                 });
//     	   	console.log(url);

//     	}).catch((error) => {
//     	    console.log(error);
//             console.log("invalid id");
//             var new_id = String(Number(this.state.id)+1);
//             this.setState({error:true});
//             // this.props.router.push(/char/+new_id);
//             // this.nextHandler();
//     	});
    	
//     }



// 	nextHandler() {
// 		console.log("next");
// 		var new_id = String(Number(this.state.id)+1);
//         this.setState({
//             id:new_id,
//             error: false
//         });
//         var url = `${this.baseUrl}${new_id}`;

//         // GET some data back!
//         axios.get(url).then((response) => {
//             this.setState({
//                 name: response.data["name"],
//                 sprite: response.data["sprites"]["front_default"],
//                 type: response.data["types"][0]["type"]["name"],
//                 height: response.data["height"],
//                 weight: response.data["weight"],
//             });

//         }).catch((error) => {
//             console.log("invalid id");
//             console.log(error);
//             this.setState({error:true});
//         });

// 	}

// 	prevHandler() {
//         console.log("prev clicked");

// 		var new_id = String(Number(this.state.id)-1);
//         this.setState({
//             id:new_id,
//             error: false
//         });
//         var url = `${this.baseUrl}${new_id}`;

//         // GET some data back!
//         axios.get(url).then((response) => {
//             this.setState({
//                 name: response.data["name"],
//                 sprite: response.data["sprites"]["front_default"],
//                 type: response.data["types"][0]["type"]["name"],
//                 height: response.data["height"],
//                 weight: response.data["weight"],
//             });
//         }).catch((error) => {
//             console.log("invalid id");
//             console.log(error);
//             this.setState({error:true});
//         });
// 	}


// 	render() {
//         var prev_id = String(Number(this.state.id)-1);
//         var next_id = String(Number(this.state.id)+1);
//         console.log("render  "+this.props.id);

//         if (this.state.error === true){
//             return (
//                 <div>
//                     <div className="navbar" id="navbar">
//                         {/* <Image src="../../../assets/pokemon.jpg"  className='center'/> */}
//                         <Image src="https://logos-download.com/wp-content/uploads/2016/07/Pok%C3%A9mon_Go_logo.png" className='center'/>
//                     </div>
//                     <div className="menu">
//                         <Link to="/">Search</Link>
//                         <Link to="/gallery">Gallery</Link>
//                     </div>
//                     <Segment className="char-card">
//                         <Link to={'/detail/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
//                         <Link to={'/detail/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
//                         {/* fail to use the link below, because of handler need to [bind] */}
//                         {/* <Link to={'/detail/'+ prev_id} onClick={this.clickHandler(-1)}><span className="prev" id="prev">&#10094;</span></Link>
//                         <Link to={'/detail/'+ next_id} onClick={this.clickHandler(+1)}><span className="next" id="next">&#10095;</span></Link> */}
//                         <h1>Invalid character ID, please click the next or prev.</h1>
//                     </Segment>
//                 </div>
//             );

//         }
//         else {
//             return (
//                 <div>
//                     <div className="navbar" id="navbar">
//                         {/* <Image src="../../../assets/pokemon.jpg"  className='center'/> */}
//                         <Image src="https://logos-download.com/wp-content/uploads/2016/07/Pok%C3%A9mon_Go_logo.png" className='center'/>
//                     </div>
//                     <div className="menu">
//                          <Link to="/">Search</Link>
//                         <Link to="/gallery">Gallery</Link>
//                     </div>
//                     <Segment className="char-card">
//                         <Image src={this.state.sprite} size='medium' centered />
//                         <Link to={'/detail/'+ prev_id} onClick={this.prevHandler}><span className="prev" id="prev">&#10094;</span></Link>
//                         <Link to={'/detail/'+ next_id} onClick={this.nextHandler}><span className="next" id="next">&#10095;</span></Link>
//                         <h1>{this.state.name}</h1>
//                         <Label  className="label">
//                             ID: {this.state.id}
//                         </Label>
//                         <div>Type: {this.state.type}</div>
//                         <div>Height: {this.state.height}</div>
//                         <div>Weight: {this.state.weight}</div>
//                     </Segment>

//                 </div>
//             );
//         }

//   	}
// }


// export default Detail