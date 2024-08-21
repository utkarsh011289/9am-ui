import { all } from "redux-saga/effects";

import studentSaga from "./studentsaga";

function* rootSaga() {
    return yield all([studentSaga()])
}

export default rootSaga;