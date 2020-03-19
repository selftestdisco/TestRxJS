import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_USER, FETCH_GIT_USER, UPLOAD_GIT_USER } from './actionTypes';
import { getDataSuccess, getUserFailed, getGitDataSuccess, addedGitUser, uploadFailed} from './actions';
import { ajax } from 'rxjs/ajax';
import { Observable,of } from 'rxjs';
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

export const fetchGitUser = (action$) => {
    return action$
        .ofType(FETCH_GIT_USER).pipe(
            switchMap(() => {
                return ajax.getJSON('https://api.github.com/users').pipe(
                    map(users => getGitDataSuccess(users)),
                    catchError(error => Observable.of(getUserFailed()))
                )
            })
        );
}

const uploadGitUser = (action$) => {
    return action$
        .ofType(UPLOAD_GIT_USER)
        .pipe(
            switchMap(action => {
                return ajax({
                    url: 'https://jsonplaceholder.typicode.com/posts',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(action.data)
                }).pipe(
                    map(response => addedGitUser(response)),
                    catchError(error => {
                      return of(uploadFailed());
                    })
                );
            })
        )

}
export default combineEpics(
    fetchUser,
    fetchGitUser,
    uploadGitUser
);