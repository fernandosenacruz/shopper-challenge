import { Rating } from '@mui/material';

const StarRating = ({
  review,
}: {
  review: {
    rating: number;
    comment: string;
  };
}) => {
  return (
    <div>
      <Rating
        name="driver-rating"
        value={review.rating}
        precision={0.5}
        readOnly
      />
      <p
        title={review.comment}
        style={{
          fontSize: 'x-small',
          height: '2rem',
          overflow: 'auto',
          textAlign: 'justify',
        }}
      >
        Avaliação: {review.comment}
      </p>
    </div>
  );
};

export default StarRating;
