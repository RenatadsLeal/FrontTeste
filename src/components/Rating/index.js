import './style.css';
import { useState } from "react";

const Rating = () => {


    const [rating, setRating] = useState(4);
    const [hover, setHover] = useState();

    return (
        <>
            <div className='ratingButton'>
                {[...Array(5)].map((star, index) => {
                    index += 1;

                    return (
                        <div
                            // type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                        // onClick={() => setRating(index)}
                        // onMouseEnter={() => setHover(index)}
                        // onMouseLeave={() => setHover(rating)}
                        >
                            <div className="star">&#9733;</div>
                        </div>
                    );
                })}
            </div>

        </>
    )

}

export default Rating;