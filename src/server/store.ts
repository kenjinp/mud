import { ActionMessage, User, Camera } from "../model";
import { createUser, createCamera } from "./userManager";

const actions = {
  users: {
    CREATE: "CREATE_USER",
    UPDATE: "UPDATE_USER",
    DELETE: "DELETE_USER"
  },
  cameras: {
    CREATE: "CREATE_CAM",
    UPDATE: "UPDATE_CAM",
    DELETE: "DELETE_CAM"
  }
};

export const createUserAction = () => {
  return {
    type: actions.users.CREATE,
    payload: createUser()
  };
};

export const updateUserAction = (user: User) => {
  return {
    type: actions.users.UPDATE,
    payload: user
  };
};

export const deleteUserAction = (uuid: string) => {
  return {
    type: actions.users.DELETE,
    payload: {
      uuid
    }
  };
};

export const createCameraAction = (user: User) => {
  return {
    type: actions.cameras.CREATE,
    payload: createCamera(user.uuid)
  };
};

export const updateCameraAction = (camera: Camera) => {
  return {
    type: actions.cameras.UPDATE,
    payload: camera
  };
};

export const deleteCamearAction = (uuid: string) => {
  return {
    type: actions.cameras.DELETE,
    payload: {
      uuid
    }
  };
};

const stateReducer = (key, state = {}, actionMessage: ActionMessage) => {
  const { uuid, ...payload } = actionMessage.payload;
  switch (actionMessage.type) {
    case actions[key].CREATE:
      return {
        [uuid]: payload,
        ...state
      };
    case actions[key].UPDATE:
      return {
        [uuid]: payload,
        ...state
      };
    case actions[key].DELETE:
      // @ts-ignore
      const { [uuid as string]: _, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

export const createStore = () => {
  let state = {
    users: {},
    cameras: {}
  };

  const store = {
    dispatch(actionMessage: ActionMessage) {
      // trigger stuff, reducers, whatever

      console.log("actionMEssage", actionMessage);

      state = {
        users: stateReducer("users", state.users, actionMessage),
        cameras: stateReducer("cameras", state.cameras, actionMessage)
      };
    },
    getState() {
      return state;
    }
  };

  return store;
};
