import { getData } from "../../../data/service";

const ActionCreator = {
  getWords: () => (dispatch: any): void => {
    for (let groupIndex = 0; groupIndex < 6; groupIndex++) {
      for (let pageIndex = 0; pageIndex < 30; pageIndex++) {
        getData(groupIndex, pageIndex).then((data: Object[]) => {
          dispatch({
            type: `SET_WORDS`,
            payload: data,
          });
        });
      }
    }
  },
};

export { ActionCreator };
