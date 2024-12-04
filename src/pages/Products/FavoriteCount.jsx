import { useSelector } from "react-redux"

const FavoriteCount = () => {
    const favorites=useSelector((state)=>state.favorites);
    const count=favorites.length;
  return (
    <div>
      {
        count>0 && (
            <span className="text-sm text-white bg-pink-500 rounded-full px-1">
                {count}
            </span>
        )
      }
    </div>
  )
}

export default FavoriteCount
