import * as React from 'react';
import axios from 'axios';

interface Image {
  id: number;
  image_id: string;
  title: string;
  url: string;
  width: number;
//   date_start: string;
  _score: number;
}

interface State {
  searchTerm: string;
  searchResults: Image[];
  sortBy: 'title' | 'score';
}

const api = axios.create({ baseURL: 'https://api.artic.edu/api/v1/' });

class ListView extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      sortBy: 'title'
    };
  }

  handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortBy: event.target.value as 'title' | 'score' });
  }

  handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({searchTerm: event.target.value});

    try {
        const searchResponse = await api.get(`artworks/search?q=${this.state.searchTerm}&&fields=id,title,image_id&&limit=50`);
        const searchResults = searchResponse.data.data.map((image: Image) => {
          return {
            id: image.id,
            title: image.title,
            image_id: image.image_id,
            url: `http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`,
            // date_start: artworkData.date_start,
            _score: image._score
          }
        });
        if (this.state.sortBy === 'title'){
            searchResults.sort((a: Image, b:Image) => (a.title > b.title) ? 1 : -1);
        }
        else if (this.state.sortBy === 'score'){
            searchResults.sort((a: Image, b:Image) => (a._score > b._score) ? 1 : -1);
        }
        this.setState({ searchResults });
      } catch (error) {
        console.log(error);
      }
    // make the api call
    // try {
    //     const response = await api.get(`artworks/search?q=${this.state.searchTerm}&&fields=id,title,image_id&&limit=50`);
    //     const tempResults = response.data.data.map((image: Image) => {
    //       return {
    //         id: image.id,
    //         title: image.title,
    //         url: `http://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`
    //       }
    //     });
    //     this.setState({ searchResults: tempResults });
    // } catch (error) {
    //     console.log(error);
    // }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        <div>
          <label>
            Sort by:
            <select value={this.state.sortBy} onChange={this.handleSortChange}>
              <option value="title">Title (Alphabetical Order) </option>
              <option value="date_start">score (a score assigned by ArtIC)</option>
            </select>
          </label>
        </div>
        <div>
          {this.state.searchResults.map((result, index) => (
            <div key={result.id}>
              <h2>{result.title}</h2>
              <img src={result.url} height = "200" alt={result.title}/>
              {this.state.sortBy === 'score' && <p>score: {result._score}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

}

export default ListView;



// export default function ListView(){
    // interface Image{
    //     id: number
    //     image_id: string
    //     title: string
    //     _score: number
    // }
    // const [imagesUrl, setImagesUrl] = useState<string[]>([]);
    // const [title, setTitle] = useState<string []>([]);

    // const api = axios.create({baseURL: 'https://api.artic.edu/api/v1/'})

    // api.get('artworks/search?q=monet&&fields=id,title,image_id&&limit=50')
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
    //     )

//     return(
//         <div>
//             <div> 
//                 Here is the Gallery Panel! 
//             </div>
//             {
//                 imagesUrl.length ? imagesUrl.map(
//                     (url:string) => {
//                         return (
//                         <img src = {url} height = "200"></img>
//                         )
//                     }
//                 ) : <></>
//             }
//             {/* {
//                 title.length ? title.map(
//                     (name:string) => {
//                         return (
//                         <div>{name}</div>
//                         )
//                     }
//                 ) : <></>
//             } */}
//         </div>
//     )
// }