import {Question} from '@serenity-js/core';
import {Text} from '@serenity-js/protractor';
import {TargetElement} from '@serenity-js/protractor/lib/screenplay/questions/targets';

export const TextoElemento = (target: TargetElement) =>
    Question.about(`Texto del elemento ${target}`, actor => {
            return Text.of(target).answeredBy(actor);
        }
    );

