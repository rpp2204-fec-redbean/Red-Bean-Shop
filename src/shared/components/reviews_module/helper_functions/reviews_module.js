import axios from 'axios';

const initialState = {
  review: [
    {
      review_id: 12345,
      rating: '',
      summary: '',
      recommend: '',
      response: null,
      body: '',
      date: '',
      reviewer_name: '',
      helpfulness: '',
      photos: [],
    },
  ],

  filters: { 5: false, 4: false, 3: false, 2: false, 1: false },
};

const helpers = {
  handleCountShown: (displayedCount, reviewCount, setDisplayedCount) => {
    if (displayedCount >= reviewCount.current) {
      //add the next line, if broken, remove
      const document = this;
      const element = document.getElementById('more-reviews');
      element.remove();
    }
    setDisplayedCount((prevState) => prevState + 2);
  },

  getReviews: (params, currentFilters, handleReviewData) => {
    const options = { params };

    axios
      .get('/reviews', options)
      .then((response) => {
        handleReviewData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching reviews: ', error);
      });
  },

  filterReviews: (reviews, currentFilters, displayedCount, setReviewsShown) => {
    const filteredReviews = [];

    const filtersIndx = Object.values(currentFilters).indexOf(true);
    if (filtersIndx >= 0) {
      for (let i = 0; i < reviews.current.length; i++) {
        if (currentFilters[i].rating) {
          filteredReviews.push(reviews.current[i]);
        }
      }

      setReviewsShown(filteredReviews);
      return;
    }

    const reviewsToDisplay = reviews.current.slice(0, displayedCount);
    setReviewsShown(reviewsToDisplay);
  },
};

export { initialState, helpers };
