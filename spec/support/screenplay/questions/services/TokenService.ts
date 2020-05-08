import {Question, Transform} from '@serenity-js/core';

export const TokenService = (response: Question<any>) =>
    Question.about(`Token del usuario`, actor => {
            return Transform.the(response,
                body => body.replace('Auth_token: ', '')).answeredBy(actor);
        }
    );
