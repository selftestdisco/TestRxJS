import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_USER } from './actionTypes';
import { getDataSuccess, getUserFailed } from './actions';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const fetchUser = (action$) => {
    return action$
        .ofType(FETCH_USER).pipe(
            switchMap(() => {
                return ajax.getJSON('https://jsonplaceholder.typicode.com/posts').pipe(
                    map(user => getDataSuccess(user)),
                    catchError(error => Observable.of(getUserFailed()))
                )
            }));
}

export default combineEpics(
    fetchUser
);