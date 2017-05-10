import * as t from './actionTypes'

const initialState = {
  editOrder: null,
  items: [],
  selected: [],
  hasMore: false,
  totalCount: 0,
  isUpdating: false,
  loadingItems: false,
  errorLoadingItems: null,

  filter: {
    search: '',
    closed: null,
    cancelled: null,
    delivered: null,
    paid: null,
    hold: null,
    draft: false

    // status_id: null,
    // customer_id: null,
    // payment_method_id: null,
    // shipping_method_id: null,
    // grand_total_min: null,
    // grand_total_max: null,
    // date_created_min: null,
    // date_created_max: null,
    // date_completed_min: null,
    // date_completed_max: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case t.ORDER_EDIT_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetchingEdit: true
    //   })
    // case t.ORDER_EDIT_RECEIVE:
    //   return Object.assign({}, state, {
    //     isFetchingEdit: false,
    //     editItem: action.item
    //   })
    // case t.ORDER_EDIT_ERASE:
    //   return Object.assign({}, state, {
    //     isFetchingEdit: false,
    //     editItem: null
    //   })
    // case t.ORDER_EDIT_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetchingEdit: true,
    //     errorFetchEdit: action.error
    //   })
    case t.ORDERS_REQUEST:
      return Object.assign({}, state, {
        loadingItems: true
      })
    case t.ORDERS_RECEIVE:
      return Object.assign({}, state, {
        loadingItems: false,
        hasMore: action.has_more,
        totalCount: action.total_count,
        items: action.data
      })
    case t.ORDERS_FAILURE:
      return Object.assign({}, state, {
        loadingItems: false,
        errorLoadingItems: action.error
      })
    case t.ORDERS_SELECT:
      return Object.assign({}, state, {
        selected: [...state.selected, action.orderId]
      })
    case t.ORDERS_DESELECT:
      return Object.assign({}, state, {
        selected: state.selected.filter(id => id !== action.orderId)
      })
    case t.ORDERS_DESELECT_ALL:
      return Object.assign({}, state, {
        selected: []
      })
    case t.ORDERS_SELECT_ALL:
      let selected = state.items.map(item => item.id);
      return Object.assign({}, state, {
        selected: selected
      })
    case t.ORDERS_SET_FILTER:
      const newFilter = Object.assign({}, state.filter, action.filter)
      return Object.assign({}, state, {
        filter: newFilter
      })
    case t.ORDERS_MORE_REQUEST:
      return Object.assign({}, state, {
        loadingItems: true
      })
    case t.ORDERS_MORE_RECEIVE:
      return Object.assign({}, state, {
        loadingItems: false,
        hasMore: action.has_more,
        totalCount: action.total_count,
        items: [...state.items, ...action.data]
      })
    case t.ORDER_DETAIL_REQUEST:
      return Object.assign({}, state, {
      })
    case t.ORDER_DETAIL_RECEIVE:
      return Object.assign({}, state, {
        editOrder: action.item
      })
    // case t.ORDER_UPDATE_REQUEST:
    // case t.ORDER_UPDATE_SUCCESS:
    // case t.ORDER_UPDATE_FAILURE:
    case t.ORDERS_BULK_UPDATE_REQUEST:
    case t.ORDERS_BULK_UPDATE_SUCCESS:
    case t.ORDERS_BULK_UPDATE_FAILURE:
    case t.ORDER_SET_CATEGORY_SUCCESS:
    case t.ORDER_DELETE_SUCCESS:
    default:
      return state
  }
}