export const NOTIFICATION_ACTION_TYPE = {
  LOAD: "LOAD",
  PUSH: "PUSH",
  INFINITE_SCROLL: "INFINITE_SCROLL",
  READ: "READ",
  UPDATE_BADGE: "UPDATE_BADGE",
};

export const initialNotificationState = {
  data: [],
  badge: 0,
  limit: 10,
  offset: 0,
};

function notificationReducer(state, action) {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPE.PUSH: {
      const newBadge = state.badge + 1;
      const newOffset = state.offset ? state.offset + 1 : 0;
      const { data } = action.payload;
      const result = {
        ...state,
        offset: newOffset,
      };
      if (data.content.entity_type !== "CHAT_SEND_MESSAGE") {
        result.badge = newBadge;
        result.data = [data, ...state.data];
      }
      return result;
    }
    case NOTIFICATION_ACTION_TYPE.READ: {
      const { id } = action.payload;
      let updated = false;
      const newData = state.data.map((item) => {
        if (item.id === id && !item.has_been_read) {
          updated = true;
          return { ...item, has_been_read: true };
        }
        return item;
      });
      const newBadge = updated ? state.badge - 1 : state.badge;

      return {
        ...state,
        data: newData,
        badge: newBadge,
      };
    }
    case NOTIFICATION_ACTION_TYPE.INFINITE_SCROLL: {
      const { badge = 0, data = [], limit, offset } = action.payload;
      return {
        ...state,
        data: [...state.data, ...data],
        badge,
        limit: limit || state.limit,
        offset: offset || state.offset,
      };
    }
    case NOTIFICATION_ACTION_TYPE.LOAD: {
      const { badge = 0, data = [], limit, offset } = action.payload;
      return {
        ...state,
        data,
        badge,
        limit: limit || state.limit,
        offset: offset || state.offset,
      };
    }
    case NOTIFICATION_ACTION_TYPE.UPDATE_BADGE: {
      const { badge = 0 } = action.payload;
      return {
        ...state,
        badge,
      };
    }
    default:
      return state;
  }
}

export default notificationReducer;
