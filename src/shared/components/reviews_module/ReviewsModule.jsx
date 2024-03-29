import React, { useState, useEffect, useMemo, useRef } from 'react';
import { initialState, helpers } from './helper_functions/reviews_module';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import SubmitReview from './SubmitReview.jsx';
import ReviewsList from './ReviewsList.jsx';
import '../../styles/reviews-styles.css';
// import { handleInteraction } from '../../interactionHandler.js'

function ReviewsModule({ product_id, product_name, reviewsData, metaData }) {
  const [reviewsDisplayed, setReviewsDisplayed] = useState(reviewsData);
  const [currentFilters, setCurrentFilters] = useState(initialState.filters);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [characteristics, setCharacteristics] = useState({});
  const [displayedCount, setDisplayedCount] = useState(2);
  const [sort, setSort] = useState('relevance');

  const reviews = useRef(reviewsData);
  const reviewCount = useRef(reviewsData.length);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const count = 300;
    const params = {
      product_id,
      sort,
      count,
    };
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      helpers.getReviews(params, currentFilters, (reviewData) => {
        reviews.current = reviewData;
        reviewCount.current = reviewData.length;
        helpers.filterReviews(
          reviews,
          currentFilters,
          displayedCount,
          setReviewsDisplayed
        );
      });
    }
  }, [sort]);

  const filteredReviews = useMemo(() => {
    helpers.filterReviews(
      reviews,
      currentFilters,
      displayedCount,
      setReviewsDisplayed
    );
  }, [currentFilters, displayedCount]);

  return (
    <div id="reviews-body">
      <div id="reviews-module">
        <h3 fromelement="Ratings/Reviews"> RATINGS AND REVIEWS </h3>
        <RatingsBreakdown
          product_id={product_id}
          setCharacteristics={setCharacteristics}
          characteristics={characteristics}
          setCurrentFilters={setCurrentFilters}
          currentFilters={currentFilters}
          metaData={metaData}
        />
        {reviewsDisplayed.length === 0 ? null : (
          <ReviewsList
            reviews={reviewsDisplayed}
            setSortType={setSort}
            reviewCount={reviewCount.current}
          />
        )}
        <SubmitReview
          showReviewModal={showReviewModal}
          setShowReviewModal={setShowReviewModal}
          product_name={product_name}
          product_id={product_id}
          characteristics={characteristics}
        />
        <div id="main-buttons">
          <button
            id="add-review"
            fromelement="Ratings/Reviews"
            className="reviews-btn add-reviews"
            onClick={() => setShowReviewModal((prevState) => !prevState)}
          >
            ADD A REVIEW +
          </button>
          <button
            id="more-reviews"
            fromelement="Ratings/Reviews"
            className="reviews-btn more-reviews"
            onClick={() =>
              helpers.handleCountShown(
                displayedCount,
                reviewCount,
                setDisplayedCount
              )
            }
          >
            MORE REVIEWS
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsModule;
