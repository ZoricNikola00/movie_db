export const reducer=(state,action)=>{
    if(action.type==='TOGGLE'){
        if(action.which==='favorite'){
          if(state.favorites.some(x=>parseInt(x.id)===parseInt(action.movie.id))){
              return  {...state, favorites:state.favorites.filter(x=>parseInt(action.movie.id)!==parseInt(x.id))}
          }
            const movie={...state, favorites:[...state.favorites,{  
                id:action.movie.id,
                title:action.movie.title,
                img:action.movie.img,
                media:action.movie.media
            }]}
            return state.favorites.length>0 ? movie:{...state, favorites:[{
                id:action.movie.id,
                title:action.movie.title,
                img:action.movie.img,
                media:action.movie.media
            }]}
        }
        if(action.which==='watchlist'){
            if(state.watchlist.some(x=>parseInt(x.id)===parseInt(action.movie.id))){
                return  {...state, watchlist:state.watchlist.filter(x=>parseInt(action.movie.id)!==parseInt(x.id))}
            }
              const movie={...state, watchlist:[...state.watchlist,{  
                  id:action.movie.id,
                  title:action.movie.title,
                  img:action.movie.img,
                  media:action.movie.media
              }]}
              return state.watchlist.length>0 ? movie:{...state, watchlist:[{
                  id:action.movie.id,
                  title:action.movie.title,
                  img:action.movie.img,
                  media:action.movie.media
              }]}
        }
    }
    if(action.type==='RATE'){
        if(state.rated.some(x=>parseInt(x.id)===parseInt(action.ratedShow.id))){
            return  {...state, rated:state.rated.map(x=>parseInt(action.ratedShow.id)===parseInt(x.id)?({...x,rating:action.ratedShow.rating}):x)}
        }
        const ratedEl={...state,rated:[...state.rated,{
            id:action.ratedShow.id,
            title:action.ratedShow.title,
            img:action.ratedShow.img,
            media:action.ratedShow.media,
            rating:action.ratedShow.rating
        }]}
        return state.rated.length>0? ratedEl:{...state, rated:[{
            id:action.ratedShow.id,
            title:action.ratedShow.title,
            img:action.ratedShow.img,
            media:action.ratedShow.media,
            rating:action.ratedShow.rating
        }]}
    }
    if(action.type==='REMOVE'){
        if(action.which==='favorite'){
            return {...state, favorites:state.favorites.filter(x=>action.id!==x.id)}
            }
        if(action.which==='watchlist'){
            return {...state, watchlist:state.watchlist.filter(x=>action.id!==x.id)}
        }
        if(action.which==='rated'){
            return {...state, rated:state.rated.filter(x=>action.id!==x.id)}
        }   
    }

}

