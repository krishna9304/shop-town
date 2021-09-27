const ReviewCard = ({ review }) => {
  return (
    <div className="w-full border border-blue-700 bg-blue-100">
      <div className="flex p-2 gap-2 w-full">
        <div className="bg-black rounded-full w-9 h-8">
          <img
            className="w-full h-full rounded-full"
            src={review.photo}
            alt="review"
          />
        </div>
        <div className="bg-blue-300 w-full flex items-center px-2 font-bold text-xs">
          {review.reviewedBy}
        </div>
      </div>
      <div className="p-2">{review.text}</div>
    </div>
  );
};

export default ReviewCard;
