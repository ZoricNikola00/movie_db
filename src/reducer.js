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
}