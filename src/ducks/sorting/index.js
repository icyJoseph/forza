// action types
export const TOGGLE_SORTING = "ui sort by goals";

// actions
export const toggleSort = () => ({
  type: TOGGLE_SORTING
});

// redux
export const mapSortingToProps = ({ sorting }) => ({ sorting });

// reducer
function sorting(state = false, action) {
  switch (action.type) {
    case TOGGLE_SORTING:
      return !state;
    default:
      return state;
  }
}

export default sorting;
